'use strict';

const convert = require('..');
const Big = require('big.js');
const should = require('should');

describe('Convert', () => {
    it('should default to returning a Number', () => {
        convert(2, 'TNET', 'TNET')
            .should.be.a.Number()
            .and.equal(2);
    });

    it('should return a Number', () => {
        convert(2, 'TNET', 'TNET', 'Number')
            .should.be.a.Number()
            .and.equal(2);
    });

    it('should return a Big number', () => {
        convert(2, 'TNET', 'TNET', 'Big')
            .should.be.an.instanceof(Big)
            .and.eql(new Big(2));
    });

    it('should return a String', () => {
        convert(2100, 'mTNET', 'TNET', 'String')
            .should.be.an.instanceof(String)
            .and.equal('2.1');
    });

    it('should convert an integer', () => {
        convert(123456789012345, 'Satoshi', 'TNET', 'Number')
            .should.be.a.Number()
            .and.equal(1234567.89012345);
    });

    it('should convert a number', () => {
        convert(1234567.89012345, 'TNET', 'Satoshi', 'Number')
            .should.be.a.Number()
            .and.equal(123456789012345);
    });

    it('should convert a string', () => {
        convert('2', 'TNET', 'TNET', 'Number')
            .should.be.a.Number()
            .and.equal(2);
    });

    it('should convert a Big number', () => {
        convert(new Big(2), 'TNET', 'TNET', 'Number')
            .should.be.a.Number()
            .and.equal(2);
    });

    it('should convert a NaN to a Number', () => {
        Number.isNaN(convert(NaN, 'TNET', 'TNET', 'Number')).should.equal(true);
        Number.isNaN(convert(NaN, 'TNET', 'mTNET', 'Number')).should.equal(true);
    });

    it('should convert a NaN to a String', () => {
        convert(NaN, 'TNET', 'TNET', 'String').should.equal('NaN');
        convert(NaN, 'TNET', 'mTNET', 'String').should.equal('NaN');
    });

    it('should not convert a NaN to a Big', () => {
        should.throws(() => convert(NaN, 'TNET', 'TNET', 'Big'));
    });

    it('should handle rounding errors', () => {
        convert(4.6, 'Satoshi', 'TNET', 'Number')
            .should.be.a.Number()
            .and.equal(0.000000046);
        convert(0.000000046, 'TNET', 'Satoshi', 'Number')
            .should.be.a.Number()
            .and.equal(4.6);
    });

    it('should throw when unit is undefined', () => {
        should.throws(() => convert(new Big(2), 'x', 'TNET', 'Number'));
        should.throws(() => convert(new Big(2), 'TNET', 'x', 'Number'));
        should.throws(() => convert(NaN, 'x', 'TNET', 'Number'));
        should.throws(() => convert(NaN, 'TNET', 'x', 'Number'));
    });

    it('should throw when representaion is undefined', () => {
        should.throws(() => convert(2, 'TNET', 'mTNET', 'x'));
        should.throws(() => convert(NaN, 'TNET', 'mTNET', 'x'));
    });

    it('should allow unit aliases', () => {
        convert(4.6, 'Satoshi', 'sat')
            .should.be.a.Number()
            .and.equal(4.6);
        convert(4.6, 'μTNET', 'bit')
            .should.be.a.Number()
            .and.equal(4.6);
    });

});
