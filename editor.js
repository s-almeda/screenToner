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

<<<<<<< HEAD
function getPixelAvg(pixel){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
  return avg;
}
function setColors(pixel, value){
  pixel.setRed(value);
  pixel.setGreen(value);
  pixel.setBlue(value);
  return pixel;
}

function makeGray() {
  //change all pixels of image to gray
  for (var pixel of image.values()) {
    var avg = getPixelAvg(pixel);
    pixel = setColors(pixel, avg);
=======
function makeGray() {
  //change all pixels of image to gray
  for (var pixel of image.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
>>>>>>> adc96615a55e36aaa6b9855ca3eb4ef531c6537c
  }
  //display new image
  var canvas = document.getElementById("can");
  image.drawTo(canvas);
<<<<<<< HEAD
}

function findClosestPaletteColor(pixel){
  //var pixelColors = [pixel.getRed(), pixel.getGreen(), pixel.getBlue()];
  var newPixel = pixel;
  var avg = getPixelAvg(pixel);
  if (avg > (255/2)){
    newPixel = setColors(newPixel, 255);
  }
  else{
    newPixel = setColors(newPixel, 0);
  }

  return newPixel;
  
}
function threshold(){
  var imageWidth = image.getWidth();
  var imageHeight = image.getHeight();
  var x, y;
  var canvas = document.getElementById("can");
  for(y= 1; y<imageHeight; y++){//top to bottom
    for(x=1; x<imageWidth; x++){ //left to right

      oldPixel = image.getPixel(x,y);
      oldPixelVal = getPixelAvg(oldPixel);

      newPixel = findClosestPaletteColor(oldPixel);
      newPixelVal = getPixelAvg(oldPixel)

      image.setPixel(x,y, newPixel)
    }
  }
  image.drawTo(canvas);

}

function floydSteinberg(){
  var imageWidth = image.getWidth()-1;
  var imageHeight = image.getHeight()-1;
  var x, y;
  var oldPixel, newPixel, quant_error, rightPixel, bottomLeftPixel, bottomPixel, bottomRightPixel;
  var canvas = document.getElementById("can");
  for(y= 1; y<imageHeight; y++){//top to bottom
    for(x=1; x<imageWidth; x++){

      oldPixel = image.getPixel(x,y);
      oldPixelVal = getPixelAvg(oldPixel);

      newPixel = findClosestPaletteColor(oldPixel);
      newPixelVal = getPixelAvg(oldPixel)

      image.setPixel(x,y, newPixel)

      quant_error = oldPixelVal - newPixelVal;
      //console.log(oldPixelVal, "-", (newPixelVal), "=", quant_error)
    
      rightPixel = image.getPixel(x+1,y);
      bottomLeftPixel = image.getPixel(x-1, y+1);
      bottomPixel = image.getPixel(x, y+1);
      bottomRightPixel = image.getPixel(x+1, y+1);

      //console.log(setColors(rightPixel, getPixelAvg(rightPixel)+ quant_error * 7 / 16))
      image.setPixel(x+1, y, setColors(rightPixel, getPixelAvg(rightPixel)+ quant_error * 7 / 16))
      image.setPixel(x-1, y+1, setColors(bottomLeftPixel, getPixelAvg(bottomLeftPixel)+ quant_error * 3 / 16))
      image.setPixel(x, y+1, setColors(bottomPixel, getPixelAvg(bottomPixel) + quant_error * 5 / 16))
      image.setPixel(x+1, y+1, setColors(bottomRightPixel, getPixelAvg(bottomRightPixel) + quant_error * 1 / 16))

    }
    //display new image
    image.drawTo(canvas);

  }
  

=======
>>>>>>> adc96615a55e36aaa6b9855ca3eb4ef531c6537c
}