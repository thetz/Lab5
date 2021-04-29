// script.js

var canvas = document.getElementById('user-image');
var context = canvas.getContext('2d');
const img = new Image(); // used to load image from <input> and draw to canvas

imageload();
function imageload(){
  img.src = 'ff.png';
  //When our image has loaded.
  img.onload = function(){
    context.drawImage(img, 0, 0,400,400);
      
  }
}
// canvasWidth=context.canvas.width;
// canvasHeight=context.canvas.height;
console.log(context.canvas.width);
console.log(context.canvas.height);


// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
soundiconchange();
clear();
speak();
populateVoiceList();

function soundiconchange(){
  var out = document.getElementsByTagName("input")[3];
  var i;
  // out.addEventListener('mousedown', e => {
  //   i= out.value;
  //   volume_update(i);
  // });

  out.addEventListener("input", () => {
    i = out.value;
    volume_update(i);
}, false);


}

function volume_update(volume){
  var vol_icon = document.getElementsByTagName("img")[0];
  if(volume == 0){
    vol_icon.src = "./icons/volume-level-0.svg";
  }
  else if (volume < 33) { 
    vol_icon.src = "./icons/volume-level-1.svg";
   }
else if (volume < 66) { 
  vol_icon.src = "./icons/volume-level-2.svg"; 
}
else { 
  vol_icon.src = "./icons/volume-level-3.svg"; 
}
}




function clear(){
  document.getElementsByTagName("button")[1].disabled=false;
  var z=document.getElementsByTagName("button")[1];
  z.addEventListener('click', function () {

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    document.getElementById('text-top').value = "";
    document.getElementById('text-bottom').value = "";
  }, false);
}


function speak(){
  
  document.getElementsByTagName("button")[2].disabled=false;
  var z=document.getElementsByTagName("button")[2];
  z.addEventListener('click', function () {
    var text=document.getElementById('text-top').value + document.getElementById('text-bottom').value;
   console.log(text);
    if(text!== ''){
      var voiceSelect = document.getElementById("voice-selection");
      var synth = window.speechSynthesis;

      var voices = synth.getVoices();
      var utterThis = new SpeechSynthesisUtterance(text);
      var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      for(var i = 0; i < voices.length ; i++) {
        if(voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
      }
      synth.speak(utterThis);
    }

  }, false);
}



function populateVoiceList() {
  var synth = window.speechSynthesis;
  var voices = synth.getVoices();


  var voiceSelect = document.getElementById("voice-selection");
  document.getElementById("voice-selection").disabled = false;
  
  

  voiceSelect.options[0] = null;

  for(var i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

  


