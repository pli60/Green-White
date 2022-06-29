/* exported setup, draw */
let seed = 12345;

const grassColor = "#36DA2B";
const grass2Color = "#31C727";
const skyColor = "#4A80CE";
const cloudColor = "#E0EDFF";
const cometColor = "#A59D93";
const hillColor = "#46BA3E";
const treeColor = "#358C2F";
const trunkcolor = "#7D5B2F";

function preload() {
    // runs before setup 
    // use if you want to load any large files and want to make sure they load before setup()
}

function setup() {
  createCanvas(800, 600);
  createButton("reroll").mousePressed(() => seed++);
  angleMode(DEGREES);
}

function draw() {
  translate(0,0);
  randomSeed(seed);

  background(20);

  noStroke();

  fill(skyColor);
  rect(0, 0, width, height / 1.5);

  fill(cometColor);
  stroke(165, 157, 147);
  strokeWeight(4);
  strokeJoin(ROUND);
  ellipse(mouseX, 70, 10, 80);
  ellipse(mouseX, 100, 20, 35);

  noStroke();

  fill(cloudColor);
  ellipse(50,150,200,150);
  ellipse(300,150,350,90);
  ellipse(400,150,250,150);
  ellipse(100,200,500,80);
  ellipse(500,200,500,100);

  fill(grassColor);
  rect(0, height / 3 * 2, width, height / 3 * 2);
  fill(grass2Color);
  rect(0, height / 2, width, height / 5);

  // An example of drawing an irregular polygon
  fill(grass2Color);

  beginShape();
  vertex(0, height / 2);
  const steps = 3;
  for (let i = 1; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y = height / 2 - (random() * random() * random() * height) / 8 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  
  translate(width / 2 + 200, height / 2 + 20);
  for (let i = 0; i < 1; i++) {
  branch(100);
  }
}

function branch(len) {
  push();
  if (len > 10) {
    strokeWeight(map(len,10,100,1,40));
    stroke(70,40,20);
    line(0, 0, 0, -len);
    translate(0, -len);
    rotate(random(-20,-30));
    branch(len * random(0.4, 0.6));
    rotate(random(50,60));
    branch(len * random(0.4, 0.6));
  }else{
    noStroke();
    fill(80,120,40, 200);
    ellipse(0,0,150);
  }
  pop();
  
}