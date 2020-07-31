'use strict';

const convert = require('..');
const Big = require('big.js');
const should = require('should');

describe('Convert', () => {
    it('should default to returning a Number', () => {
        convert(2, 'BCHC', 'BCHC')
            .should.be.a.Number()
            .and.equal(2);
    });

    it('should return a Number', () => {
        convert(2, 'BCHC', 'BCHC', 'Number')
            .should.be.a.Number()
            .and.equal(2);
    });

    it('should return a Big number', () => {
        convert(2, 'BCHC', 'BCHC', 'Big')
            .should.be.an.instanceof(Big)
            .and.eql(new Big(2));
    });

    it('should return a String', () => {
        convert(2100, 'mBCHC', 'BCHC', 'String')
            .should.be.an.instanceof(String)
            .and.equal('2.1');
    });

    it('should convert an integer', () => {
        convert(123456789012345, 'Satoshi', 'BCHC', 'Number')
            .should.be.a.Number()
            .and.equal(1234567.89012345);
    });

    it('should convert a number', () => {
        convert(1234567.89012345, 'BCHC', 'Satoshi', 'Number')
            .should.be.a.Number()
            .and.equal(123456789012345);
    });

    it('should convert a string', () => {
        convert('2', 'BCHC', 'BCHC', 'Number')
            .should.be.a.Number()
            .and.equal(2);
    });

    it('should convert a Big number', () => {
        convert(new Big(2), 'BCHC', 'BCHC', 'Number')
            .should.be.a.Number()
            .and.equal(2);
    });

    it('should convert a NaN to a Number', () => {
        Number.isNaN(convert(NaN, 'BCHC', 'BCHC', 'Number')).should.equal(true);
        Number.isNaN(convert(NaN, 'BCHC', 'mBCHC', 'Number')).should.equal(true);
    });

    it('should convert a NaN to a String', () => {
        convert(NaN, 'BCHC', 'BCHC', 'String').should.equal('NaN');
        convert(NaN, 'BCHC', 'mBCHC', 'String').should.equal('NaN');
    });

    it('should not convert a NaN to a Big', () => {
        should.throws(() => convert(NaN, 'BCHC', 'BCHC', 'Big'));
    });

    it('should handle rounding errors', () => {
        convert(4.6, 'Satoshi', 'BCHC', 'Number')
            .should.be.a.Number()
            .and.equal(0.000000046);
        convert(0.000000046, 'BCHC', 'Satoshi', 'Number')
            .should.be.a.Number()
            .and.equal(4.6);
    });

    it('should throw when unit is undefined', () => {
        should.throws(() => convert(new Big(2), 'x', 'BCHC', 'Number'));
        should.throws(() => convert(new Big(2), 'BCHC', 'x', 'Number'));
        should.throws(() => convert(NaN, 'x', 'BCHC', 'Number'));
        should.throws(() => convert(NaN, 'BCHC', 'x', 'Number'));
    });

    it('should throw when representaion is undefined', () => {
        should.throws(() => convert(2, 'BCHC', 'mBCHC', 'x'));
        should.throws(() => convert(NaN, 'BCHC', 'mBCHC', 'x'));
    });

    it('should allow unit aliases', () => {
        convert(4.6, 'Satoshi', 'sat')
            .should.be.a.Number()
            .and.equal(4.6);
        convert(4.6, 'μBCHC', 'bit')
            .should.be.a.Number()
            .and.equal(4.6);
    });

});
