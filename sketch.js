//Define global variables
let oImage;  // Varaible for original image
let mImage;  // Modified image
let xOff;    // X offset for image positioning
let yOff;    // Y offset for image positioning
let picker;  // Color picker for red color replacement
let CELERY;  // New color for yellow replacement
let TANGO;   // New color for blue replacement
let cSimilar = 60;  // Color similarity as detection tolerance

// Set preload function to load image before setup
function preload() {
  oImage = loadImage("./Piet1.jpg");// if you change to ./Piet2.jpg, it will switch to image 2
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  // Resize image to fit window height
  let scaleFactor = windowHeight / oImage.height;//because we can't distort the image and can only resize with image height, I think it's easier just to create a factor
  oImage.resize(oImage.width * scaleFactor, windowHeight);//resize image
  xOff = (width - oImage.width) / 2; // Calculate offsets to center image both horizontally and vertically
  yOff = (height - oImage.height) / 2;

  // Load pixels of the original image
  oImage.loadPixels();

  // Get the original image to a new variable for manipulation
  mImage = oImage.get();

  // Define new colors for yellow and blue replacement
  CELERY = color(164, 193, 77);//a green color
  TANGO = color(223, 113, 0);//an orangel-like color

  // Create color picker for red color replacement
  picker = createColorPicker(color(255, 0, 0));//various from o to 255
  picker.position(50, height - 100);//set the picker in the left downer corner
  picker.style("width", "200px");
}
// Function for color detection (with a tolerance)
function isSimilar(r1, g1, b1, r2, g2, b2, tolerance) {
  // If the difference (absolute value of detected color and target color) is within the tolerance for all three values= the colors are similar
  return abs(r1 - r2) <= tolerance && abs(g1 - g2) <= tolerance && abs(b1 - b2) <= tolerance;//Initally, I didn't have the "return", the color picker doesn't work, then I search online I found that I need to add a return. But I am not 100% sure what does it actually does
}

function draw() {
  background(255);

  let pickedColor = picker.color();

  // Load pixels of both original and manipulated images
  oImage.loadPixels();
  mImage.loadPixels();

  // Loop through all pixels of the original image like a bomb detector or a floor mopping robot
  for (let i = 0; i < oImage.pixels.length; i += 4) {
    let r = oImage.pixels[i];
    let g = oImage.pixels[i + 1];
    let b = oImage.pixels[i + 2];

    // If pixel color is similar to red, replace with user-picked color
    if (isSimilar(r, g, b, 219, 64, 42, cSimilar)) {  
      mImage.pixels[i] = red(pickedColor);
      mImage.pixels[i + 1] = green(pickedColor);
      mImage.pixels[i + 2] = blue(pickedColor);
    } 
    // If pixel color is similar to yellow, replace with CELERY
    else if (isSimilar(r, g, b, 244, 193, 77, cSimilar)) {  
      mImage.pixels[i] = red(CELERY);
      mImage.pixels[i + 1] = green(CELERY);
      mImage.pixels[i + 2] = blue(CELERY);
    } 
    // If pixel color is similar to blue, replace with TANGO
    else if (isSimilar(r, g, b, 0, 59, 112, cSimilar)) {  
      mImage.pixels[i] = red(TANGO);
      mImage.pixels[i + 1] = green(TANGO);
      mImage.pixels[i + 2] = blue(TANGO);
    }
  }
  
  // Update pixels of manipulated image
  mImage.updatePixels();

  // Display the manipulated image at the specified position same as the original one
  image(mImage, xOff, yOff);
}

