var a = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  translate(width / 2, height / 2);
}

function draw() {
  background(69);

  rotateX(a);
  rotateY(a);
  a += 0.01;

  noFill();
  stroke(255);

  box(200);
}