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
}

function draw() {
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
  fill(hillColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 8 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  const trees = 5*random();
  for (let i = 0; i < trees; i++) {
    drawLtree();
  }

  // An example of recursively drawing an L-tree 
  function drawLtree() {
    let x = width * random();
    let y = height/2 + height/8 * random();
    let s = width/200 + (y - height/2)/2;
    let jitter = (mouseX - width/2) / width * 2 * Math.PI / 180;
    drawLtreeBranch(x, y, s, (-90 * Math.PI / 180) + jitter, 0, 5); // this angle points north (0 is east)
  }  

  function drawLtreeBranch(x, y, s, angle, max_limit, branch_weight) { // s is length of a segment
    stroke(trunkcolor);
    strokeWeight(branch_weight);
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);

    let new_s = s * 0.7;
    let new_max = max_limit + random();
    let new_branch_weight = branch_weight - 1;
    new_branch_weight = max(new_branch_weight, 1);

    if (max_limit < 3) {
        if (random() < 1/3) {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else if (random() > 1/3) {
            drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
            drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        }
        drawLtreeBranch(x2, y2, new_s, angle, new_max, new_branch_weight);
    }
    else {
        if (random() < 1/3) {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
        } else if (random() > 1/3) {
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        } else {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        }
    }

  }

  function drawLeave(x, y, s, angle) {
    fill(treeColor);
    noStroke();
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);
    circle(x2, y2, 3);

  }
}

