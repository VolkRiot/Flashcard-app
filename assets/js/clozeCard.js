function ClozeCard(text, cloze){
  if(!(this instanceof ClozeCard)){
    return new ClozeCard(text, cloze);
  }
  this.fullText = text;
  this.cloze = cloze;
  this.initCard();
}

ClozeCard.prototype.initCard = function(){
  var re = new RegExp(this.cloze, 'g' );
  if(this.fullText.search(re) == -1){
    throw new Error("Sorry but it looks like '" + this.cloze + "' is not in '" + this.fullText + "'");
  }

  this.partial = this.fullText.replace(re, '_'.repeat(this.cloze.length));

  var fs = require('fs');
  console.log(__dirname);
  fs.appendFile(__dirname + '/../logs/cards.txt', [this.fullText, this.partial, this.cloze] + "\n", function (err) {
    if (err) throw err;
  });

};

module.exports = ClozeCard;
