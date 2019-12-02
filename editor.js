//<!--Javascript to display uploaded image-->
//Get canvas
var canvas = document.getElementById("can");
var ctx = canvas.getContext('2d');
var image, originalImage, fInput;


//File Upload Function gets called when image is uploaded
let fileInput = document.getElementById('fInput');
fileInput.addEventListener('change', function(ev) {
  image = new SimpleImage(fileInput); //just to retain SimpleImage functionality for now
   if(ev.target.files) {

    let file = ev.target.files[0];
    var reader  = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      var imageUpload = new Image();

      imageUpload.src = e.target.result;
         
      imageUpload.onload = function(ev) {
        canvas = document.getElementById("can");
        canvas.width = imageUpload.width;
        canvas.height = imageUpload.height;
        ctx = canvas.getContext('2d');
        
        ctx.drawImage(imageUpload,0,0);
          
       }
    }
  }
});

function halftone(){
  imageDataArray = ctx.getImageData(0,0, image.getWidth(), image.getHeight());
  console.log(imageDataArray[0]);

}



function getPixelAvg(pixel){ //averages red, gree, and blue together 
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
  }
  //display new image
  image.drawTo(canvas);
}

function reset(){
  image = new SimpleImage(fileInput);
  image.drawTo(canvas);

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
  
};

function threshold(lightness){
  if (lightness < 0){
    var val = document.getElementById("thresholdRange").value/100;
  }
  else{
    var val = lightness
  }
  
  var imageWidth = image.getWidth();
  var imageHeight = image.getHeight();
  var x, y, avg;

  for(y= 0; y<imageHeight; y++){//top to bottom
    for(x=0; x<imageWidth; x++){ //left to right

      oldPixel = image.getPixel(x,y);
      oldPixelVal = getPixelAvg(oldPixel);

      if (oldPixelVal > (255*val)){
        oldPixel = setColors(oldPixel, 255);
      }
      else{
        oldPixel = setColors(oldPixel, 0);
      }

      image.setPixel(x,y, oldPixel)
    }
  }
  image.drawTo(canvas);

};

function floydSteinberg(){
  var imageWidth = image.getWidth()-1;
  var imageHeight = image.getHeight()-1;
  var x, y;
  var oldPixel, newPixel, quant_error, rightPixel, bottomLeftPixel, bottomPixel, bottomRightPixel;
  
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
  }
  //display new image
  image.drawTo(canvas);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}