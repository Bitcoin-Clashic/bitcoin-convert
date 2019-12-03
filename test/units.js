'use strict';

const convert = require('..');
const should = require('should');

describe('Units', () => {
    it('should be array', () => {
        var units = convert.units();
        units.should.be.an.Array();
        units.should.containEql('TNET');
        units.should.containEql('mTNET');
        units.should.containEql('μTNET');
        units.should.containEql('Satoshi');
    });

    describe('extensibility', () => {
        it('should add a new unit', () => {
            convert.units().should.not.containEql('finney');
            convert.addUnit('finney', 0.0000001);
            convert.units().should.containEql('finney');
            // 10 satoshis can be expressed as 1 finney
            convert(20, 'Satoshi', 'finney').should.equal(2);
            convert.removeUnit('finney');
        });

        it('should not add an existing unit with a different conversion factor', () => {
            convert.units().should.containEql('TNET');
            convert.addUnit('TNET', 1);
            should.throws(() => convert.addUnit('TNET', 3));
        });

        it('should remove a new unit', () => {
            convert.units().should.not.containEql('finney');
            convert.addUnit('finney', 0.0000001);
            convert.units().should.containEql('finney');
            convert.removeUnit('finney');
            convert.units().should.not.containEql('finney');
        });

        it('should remove a non-existent unit', () => {
            convert.units().should.not.containEql('x');
            convert.removeUnit('x');
            convert.units().should.not.containEql('x');
        });

        it('should not remove a predefined unit', () => {
            convert.units().should.containEql('TNET');
            should.throws(() => convert.removeUnit('TNET'));
        });

    });

});
