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
    checkSet_pt1();
}

function checkSet_pt1() {
            for (var i = 0; i < playingCards.length - 2; i++) {
                for (var j = i + 1; j < playingCards.length - 1; j++) {
                    for (var k = j + 1; k < playingCards.length; k++) {
                        checkSet_pt2(playingCards[i],playingCards[j],playingCards[k]);
                    }
                }
            }
        }

$(document).ready(function() {
    checkSet_pt1()
});

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



function checkClickedSetpt1() {
    $(".cardCell").click(function () {
        var id = parseInt(this.id);
        $(this).toggleClass('highlight');
        var selectedCard = findCardById(id);
        selectedCard.toggleHighlight();
        console.log(selectedCard.index);
    });
    $("#checkSetButton1").hide('fast');
    $("#3CardButton").hide('fast');
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
            userCards.push(playingCards[j].index);
        }
    }
    userCards.sort(function(a, b){return a-b});
    var userCardsString = userCards.join();
    var found = false;
            for (var i = 0; i < setCardsIndices.length; i++) {
                if (setCardsIndices[i].join() == userCardsString) {
                    console.log("That's a set!");
                    found = true;
                    for (var h = 0; h < userCards.length; h++) {
                        $('#' + userCards[h]).addClass('greenlight');
                        $('#' + userCards[h]).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                    }
                    for (var k = 0; k < 3; k++) {
                            if (deck.length < 3) {
                                document.getElementById("checkButton").innerHTML = "Reload";
                                $("#checkButton").click(function() {
                                    location.reload();
                                });
                            }
                            var replacementCard = deck[Math.floor(Math.random() * deck.length)];
                            var replacementCardDeckIndex = deck.indexOf(replacementCard);
                            playingCards.splice(userCards[k], 1);
                            replacementCard.index = userCards[k];
                            replacementCard.highlight = false;
                            playingCards.push(replacementCard);
                            playingCards.sort(compare);
                            document.getElementById(replacementCard.index).innerHTML = replacementCard.image();
                            deck.splice(replacementCardDeckIndex, 1);
                            setCardsIndices = [];
                        }
                    }
                }
    if(!found) {
        for (var m = 0; m < userCards.length; m++) {
            $('#' + userCards[m]).addClass('lowlight');
            $('#' + userCards[m]).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        }
        for (var z = 0; z < playingCards.length; z++) {
                playingCards[z].highlight = false;
            }
        console.log("Nope!");
    }
    checkSet_pt1();
    setTimeout(resetAllHighlights, 550);
    userCards = [];
}

function compare(a,b) {
    if (a.index < b.index)
        return -1;
    if (a.index > b.index)
        return 1;
    return 0;
}

function resetAllHighlights() {
    for(var c = 0; c < playingCards.length; c++) {
        $('#' + c).removeClass('highlight');
        $('#' + c).removeClass('lowlight');
        $('#' + c).removeClass('greenlight');
    }
}