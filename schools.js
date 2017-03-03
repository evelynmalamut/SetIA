/**
 * Created by h205p2 on 2/6/17.
 */

//Set rules: https://www.quantamagazine.org/20160531-set-proof-stuns-mathematicians/

function Card (number,color,shading,shape,index,highlight) {
    this.number = number;
    this.color = color;
    this.shading = shading;
    this.shape = shape;
    this.image = function() {
            if (this.number == 1) {
                return "<img src='images/" + this.color + this.shading + this.shape + ".png'>"

            }
            if (this.number == 2) {
                return "<img src='images/" + this.color + this.shading + this.shape + ".png'>" +
                "<img src='images/" + this.color + this.shading + this.shape + ".png'>"


            }
            if (this.number == 3) {
                return "<img src='images/" + this.color + this.shading + this.shape + ".png'>" +
                    "<img src='images/" + this.color + this.shading + this.shape + ".png'>" +
                    "<img src='images/" + this.color + this.shading + this.shape + ".png'>"
            }
    };
    this.index = index;
    this.highlight = false;
    this.toggleHighlight = function() {
        if(this.highlight == false) {
            this.highlight = true;
        }
        else {
            this.highlight = false;
        }
    }
}

var numbers = [1,2,3];
var colors = ["red","green","purple"];
var shadings = ["solid","striped","outlined"];
var shapes = ["oval","diamond","squiggle"];

var playingCards = [];
var deck = [];

$(document).ready(function newCards() {
    for (var i = 0; i < numbers.length; i++) {
        for (var j = 0; j < colors.length; j++) {
            for (var k = 0; k < shadings.length; k++) {
                for (var l = 0; l < shapes.length; l++) {
                    var newCard = new Card(numbers[i], colors[j], shadings[k], shapes[l]);
                    deck.push(newCard);
                }
            }
        }
    }
});

$(document).ready(function displayCards() {
    for (var i = 0; i < 12; i++) {
        var chosenCard = deck[Math.floor(Math.random() * deck.length)];
        var chosenCardIndex = deck.indexOf(chosenCard);
        playingCards.push(chosenCard);
        chosenCard.index = i;
        document.getElementById(i).innerHTML = chosenCard.image();
        deck.splice(chosenCardIndex, 1);
    }
});


function add3More () {
    for (var i = 0; i < 3; i++) {
        var chosenCard = deck[Math.floor(Math.random() * deck.length)];
        var chosenCardIndex = deck.indexOf(chosenCard);
        playingCards.push(chosenCard);
        chosenCard.index = i + 12;
        var row = document.getElementById(i + "Row");
        var newCell = row.insertCell(-1);
        newCell.innerHTML = deck[chosenCardIndex].image();
        $(newCell).addClass('cardCell');
        var assignedId = i + 12;
        newCell.id = assignedId.toString();
        deck.splice(chosenCardIndex, 1);
    }
    $("#3CardButton").hide('fast');
}

//$(document).ready(
function checkSet_pt1() {
            for (var i = 0; i < playingCards.length - 2; i++) {
                for (var j = i + 1; j < playingCards.length - 1; j++) {
                    for (var k = j + 1; k < playingCards.length; k++) {
                        checkSet_pt2(playingCards[i],playingCards[j],playingCards[k]);
                    }
                }
            }
        }

function checkSet_pt2(a,b,c) {
        if (!((a.number == b.number) && (b.number == c.number) ||
        (a.number !== b.number) && (b.number !== c.number) && (a.number !== c.number))) {
            return false
        }
        if (!((a.color == b.color) && (b.color == c.color) ||
        (a.color !== b.color) && (b.color !== c.color) && (a.color !== c.color))) {
            return false
        }
        if (!((a.shading == b.shading) && (b.shading == c.shading) ||
        (a.shading !== b.shading) && (b.shading !== c.shading) && (a.shading !== c.shading))) {
            return false
        }
        if (!((a.shape == b.shape) && (b.shape == c.shape) ||
        (a.shape !== b.shape) && (b.shape !== c.shape) && (a.shape !== c.shape))) {
            return false
        }
        console.log("Set!");
        console.log(a.index);
        console.log(b.index);
        console.log(c.index);
        console.log(a);
        console.log(b);
        console.log(c);
        setCardsIndices.push([a.index,b.index,c.index]);
        setCardsIndices[setCardsIndices.length-1].sort(function(a, b){return a-b});
        return true
}

var setCardsIndices = [];
var userCards = [];

//$(document).ready(
function checkClickedSetpt1() {
    $(".cardCell").click(function () {
        var id = parseInt(this.id);
        $(this).toggleClass('highlight');
        var selectedCard = findCardById(id);
        selectedCard.toggleHighlight();
        console.log(selectedCard.index);
    });
}


function findCardById(id) {
    for (var i = 0; i < playingCards.length; i++) {
        if(id == playingCards[i].index) {
            return playingCards[i];
        }
    }
    return false
}

function checkClickedSetpt2() {
    for (var j = 0; j < playingCards.length; j++) {
        if (playingCards[j].highlight == true) {
            console.log(playingCards[j].index);
            userCards.push(playingCards[j].index)
        }
    }
    userCards.sort(function(a, b){return a-b});
    var userCardsString = userCards.join();
    for (var i= 0; i < setCardsIndices.length; i++) {
        if (setCardsIndices[i].join() == userCardsString) {
            console.log("That's a set!");
            //put in function to replace card (need to set index of cards in set to index of replacement card and remove set card from playing cards)
            for (var k = 0; k < 3; k++) {
                var replacementCard = deck[Math.floor(Math.random() * deck.length)];
                var replacementCardDeckIndex = deck.indexOf(replacementCard);
                playingCards.push(replacementCard);
                playingCards.push(replacementCard);
                replacementCard.index = setCardsIndices[i];
                document.getElementById(i).innerHTML = replacementCard.image();
                deck.splice(replacementCardDeckIndex, 1);
            }
            return true
        }
    }
    console.log("nope!")
}


//get rid of cards if it's a set


//figure out how to do without buttons
