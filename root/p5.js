// Quantum Relative Motion Simulation (p5.js)
let trainX;
let speed;
let running = false;
let A, M, B;
let showInfo = true;

function setup() {
  createCanvas(1100, 600);
  trainX = 250;
  speed = 2;
  A = 150;
  M = 400;
  B = 650;
  createControlUI();
}

function draw() {
  background(10);
  drawGroundFrame();
  drawTrainFrame();
  if (running) trainX += speed;
  drawSimTime();
}

function drawGroundFrame() {
  fill(255);
  text("Ground Frame (Observer M Stationary)", 10, 20);
  stroke(255);
  line(0, 100, width, 100);
  drawMarker(A, 100, 'A');
  drawMarker(M, 100, 'M');
  drawMarker(B, 100, 'B');
  drawTrain(trainX, 80);
}

function drawTrainFrame() {
  fill(255);
  text("Train Frame (Observer M' Stationary)", 10, 300);
  stroke(255);
  line(0, 380, width, 380);
  drawTrain(width / 2, 360); // Train stationary in its own frame
  drawMarker(A + (width / 2 - trainX), 380, 'A');
  drawMarker(M + (width / 2 - trainX), 380, "M'");
  drawMarker(B + (width / 2 - trainX), 380, 'B');
}

function drawTrain(x, y) {
  fill(180);
  rect(x - 100, y - 20, 200, 40, 5);
  fill(50);
  rect(x - 90, y - 10, 20, 20);
  rect(x + 70, y - 10, 20, 20);
  fill(255, 0, 0);
  ellipse(x, y, 8, 8);
  fill(255);
  textAlign(CENTER);
  text("M'", x, y - 25);
}

function drawMarker(x, y, label) {
  fill(255, 255, 0);
  ellipse(x, y, 10);
  fill(255);
  textAlign(CENTER);
  text(label, x, y + 15);
}

function drawSimTime() {
  if (!showInfo) return;
  fill(255);
  textAlign(RIGHT);
  text("Sim Time: " + nf(frameCount / 20, 1, 2) + " s", width - 20, 20);
  text("State: light_propagating_m_prime_observed_rear", width - 20, 40);
}

function createControlUI() {
  let runBtn = createButton("Run ▶");
  runBtn.position(10, height + 10);
  runBtn.mousePressed(() => running = true);

  let pauseBtn = createButton("Pause ||");
  pauseBtn.position(80, height + 10);
  pauseBtn.mousePressed(() => running = false);

  let resetBtn = createButton("Reset ⟳");
  resetBtn.position(160, height + 10);
  resetBtn.mousePressed(() => trainX = 250);

  let showInfoCheckbox = createCheckbox("Show Info", true);
  showInfoCheckbox.position(240, height + 10);
  showInfoCheckbox.changed(() => showInfo = showInfoCheckbox.checked());

  let speedSliderLabel = createDiv("Speed:");
  speedSliderLabel.position(10, height + 40);
  let speedSlider = createSlider(0, 10, 2, 0.1);
  speedSlider.position(60, height + 40);
  speedSlider.input(() => speed = speedSlider.value());

  let titleLabel = createDiv("<b style='color:white;'>Ground Frame (Observer M Stationary)</b>");
  titleLabel.position(10, -30);
}
