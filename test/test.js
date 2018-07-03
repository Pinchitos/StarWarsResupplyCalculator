//Declaration of dependencies
var expect = require('chai').expect;
var Starship = require("../models/Starship");

//1a. Arrange mock real data
var testShip1 = new Starship('Y-wing', 80, '1 week');
var testShip2 = new Starship('Millennium Falcon', 75, '2 months');
var testShip3 = new Starship('Rebel Transport', 20, '6 months');

//1b. Arrange mock test data
var testShip4 = new Starship('TestShip4', 1005, '10 days');
var testShip5 = new Starship('TestShip5', 1, '5 years');
var testShip6 = new Starship('TestShip6', 20, '4 months');

//Unit test for the consumableMGLT calculation method for the StarShip object
describe('StarShip.calculateConsumableMGLT()', function () {

    it('It should calculate the total of MGLT the ship can travel without resupply', function () {

        // 2. Act
        var test1 = testShip1.calculateConsumableMGLT();
        var test2 = testShip2.calculateConsumableMGLT();
        var test3 = testShip3.calculateConsumableMGLT();
        var test4 = testShip4.calculateConsumableMGLT();
        var test5 = testShip5.calculateConsumableMGLT();
        var test6 = testShip6.calculateConsumableMGLT();

        // 3. Assert
        expect(test1).to.be.equal(13440);
        expect(test2).to.be.equal(109500);
        expect(test3).to.be.equal(87600);
        expect(test4).to.be.equal(241200);
        expect(test5).to.be.equal(43800);
        expect(test6).to.be.equal(58400);

    });

});

//Unit test for the stops calculation method for the StarShip object
describe('StarShip.calculateStops(InputMGLT)', function () {

    it('It should calculate the number of resupplies comparing with the provided data', function () {

        // 2a. Act
        var test1 = testShip1.calculateStops(1000000);
        var test2 = testShip2.calculateStops(1000000);
        var test3 = testShip3.calculateStops(1000000);

        // 3a. Assert
        expect(test1).to.be.equal(74);
        expect(test2).to.be.equal(9);
        expect(test3).to.be.equal(11);

    });

    it('It should calculate the number of resupplies checking test data', function () {

        //2b. Act
        var test4 = testShip4.calculateStops(1000000);
        var test5 = testShip5.calculateStops(1000000);
        var test6 = testShip6.calculateStops(1000000);

        //3b. Assert
        expect(test4).to.be.equal(4);
        expect(test5).to.be.equal(22);
        expect(test6).to.be.equal(17);

    });

});

//Unit test for the string output method for the StarShip object
describe('StarShip.resultToString(InputMGLT)', function () {

    it('It should paint the information properly comparing with the provided data', function () {

        //2a. Act
        var test1 = testShip1.resultToString(1000000);
        var test2 = testShip2.resultToString(1000000);
        var test3 = testShip3.resultToString(1000000);

        //3a. Assert
        expect(test1).to.be.equal('Y-wing: 74');
        expect(test2).to.be.equal('Millennium Falcon: 9');
        expect(test3).to.be.equal('Rebel Transport: 11');

    });

    it('It should paint the information properly checking test data', function () {
        
        //2b. Act
        var test4 = testShip4.resultToString(1000000);
        var test5 = testShip5.resultToString(1000000);
        var test6 = testShip6.resultToString(1000000);

        //3b. Assert
        expect(test4).to.be.equal('TestShip4: 4');
        expect(test5).to.be.equal('TestShip5: 22');
        expect(test6).to.be.equal('TestShip6: 17');
    });
});