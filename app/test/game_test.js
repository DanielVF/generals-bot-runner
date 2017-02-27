var assert = require('assert');
var should = require('should');

var GeneralsGame = require('../models/generals_game');

describe('Game', function() {
    
    beforeEach(function(){
        this.map = {
                    width: 3,
                    height: 3,
                    size: 9,
                    strengths: [1,0,4,0,0,0,10,0,0],
                    owners: [0,-1,1,-1,-1,-1,0,-1,-1],
                    terrain: [0,0,0,0,0,-1,1,0,0],
                    rows: [[0,1,2],[3,4,5],[6,7,8]],
                    step: 0
                }
        this.game = new GeneralsGame()
    })
    
    
    describe('Growth', function() {
        describe('Plain', function() {
            it("should grow plain squares every 50 steps", function(){
                this.map.strengths[0].should.equal(1)
                this.map.step = 49
                this.game.doStep(this.map, [])
                this.map.strengths[0].should.equal(2)
            })
            
            it("should not grow otherwise", function(){
                this.map.strengths[0].should.equal(1)
                
                this.map.step = 48
                this.game.doStep(this.map, [])
                this.map.strengths[0].should.equal(1)
                
                this.map.step = 50
                this.game.doStep(this.map, [])
                this.map.strengths[0].should.equal(1)
            })
        })
        
        describe('City', function() {
            describe('Player Owned', function() {
                it("should grow every two steps", function(){
                    this.map.step = 0
                    this.game.doStep(this.map, [])
                    this.map.strengths[6].should.equal(10)
                    this.map.step = 1
                    this.game.doStep(this.map, [])
                    this.map.strengths[6].should.equal(11)
                })
            })
            describe('Neutral Owned', function() {
                it("should every grow two steps if below 40", function(){
                    this.map.step = 0
                    this.map.owners[6] = -1
                    this.map.strengths[6] = 39
                    this.game.doStep(this.map, [])
                    this.game.doStep(this.map, [])
                    this.game.doStep(this.map, [])
                    this.game.doStep(this.map, [])
                    this.game.doStep(this.map, [])
                    this.game.doStep(this.map, [])
                    this.game.doStep(this.map, [])
                    this.map.strengths[6].should.equal(40)
                })
            })
            
        })
        describe('General', function() {
            it("should grow every two steps", function(){
                this.map.terrain[6] = 2
                this.map.step = 0
                this.game.doStep(this.map, [])
                this.map.strengths[6].should.equal(10)
                this.map.step = 1
                this.game.doStep(this.map, [])
                this.map.strengths[6].should.equal(11)
            })
        })
    })
    
    describe('Movement', function() {
        it("should capture an empty neutral square", function(){
            // Have the 4 strength square in the upper left capture the adjacent neutral square
            this.game.doStep(this.map, [null, [2,1]])
            this.map.strengths[2].should.equal(1) // One stays behind
            this.map.strengths[1].should.equal(3) // Three go to the captured square
            this.map.owners[1].should.equal(1) // Destination should be captured
        })
        
        it("should not go in mountains", function(){
            this.game.doStep(this.map, [null, [2,5]])
            this.map.strengths[2].should.equal(4) // No strength should leave
            this.map.strengths[5].should.equal(0) // Mountain should not be affected
        })
        
        describe("General Capture", function(){
            beforeEach(function(){
                // Add a general for the loser
                this.map.terrain[0] = 2
                this.map.strengths[0] = 10
                this.map.owners[0] = 1
                // Add a plain square for the loser
                this.map.terrain[3] = 0
                this.map.strengths[3] = 2
                this.map.owners[3] = 1
                // Add a winner capturing square
                this.map.terrain[1] = 0
                this.map.strengths[1] = 20
                this.map.owners[1] = 0
                this.game.doStep(this.map, [[1,0]])
            })
            it("should capture the general square", function(){
                this.map.owners[0].should.equal(0)
            })
            it("should change the general square to city", function(){
                this.map.terrain[0].should.equal(1)
            })
            it("should give ownership of all loser squares to the winner", function(){
                this.map.owners[3].should.equal(0)
            })
        })
    })
})