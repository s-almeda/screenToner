//<!--Javascript to display uploaded image-->

var loadFile = function(event) {
	document.getElementById("fInput");
  //Make new SimpleImage from file input
  image = new SimpleImage(fInput);
  //Get canvas
  var canvas = document.getElementById("can");
  //Draw image on canvas
  image.drawTo(canvas);
};

function makeGray() {
  //change all pixels of image to gray
  for (var pixel of image.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  //display new image
  var canvas = document.getElementById("can");
  image.drawTo(canvas);
}