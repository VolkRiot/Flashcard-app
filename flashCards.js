function BasicCard(front, back){
  if(!(this instanceof BasicCard)){
    return new BasicCard(front, back);
  }
  this.front = front;
  this.back = back;

}

function ClozeCard(text, cloze){
  if(!(this instanceof ClozeCard)){
    return new ClozeCard(text, cloze);
  }
  this.fullText = text;
  this.cloze = cloze;
  this.initCard();
}

ClozeCard.prototype.initCard = function(){
  var re = new RegExp(this.cloze);
  if(this.fullText.search(re) == -1){
    throw new Error("Sorry but it looks like '" + this.cloze + "' is not in '" + this.fullText + "'");
  }

  this.partial = this.fullText.replace(re, '_'.repeat(this.cloze.length));

  var fs = require('fs');
  fs.appendFile('cards.txt', [this.fullText, this.partial, this.cloze] + "\n", function (err) {
  if (err) throw err;
  });

}

var firstPresident = BasicCard("Who was the first president of the United States?", "George Washington");

"Who was the first president of the United States?"
console.log(firstPresident.front);

// "George Washington"
console.log(firstPresident.back);

var firstPresidentCloze = ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze);

// " ... was the first president of the United States.
console.log(firstPresidentCloze.partial);

// George Washington was the first president of the United States.
console.log(firstPresidentCloze.fullText);

// Should throw or log an error because 'oops' doesn't appear in 'This doesn't work'"
//var brokenCloze = ClozeCard("This doesn't work", "oops");
