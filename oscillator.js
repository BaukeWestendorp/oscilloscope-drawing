class Oscillator {
  constructor(gridSize) {
    this.gridSize = gridSize;
  }

  display(data) {
    function showGrid(gridSize) {
      let g = createGraphics(width, height);
      g.translate(width / 2, height / 2);

      g.stroke(255, 40);

      for (let x = 0; x < width / 2; x += gridSize) {
        g.line(x, -height / 2, x, height / 2);
        g.line(-x, -height / 2, -x, height / 2);
      }

      for (let y = 0; y < height / 2; y += gridSize) {
        g.line(-width / 2, y, width / 2, y);
        g.line(-width / 2, -y, width / 2, -y);
      }

      image(g, -width / 2, -height / 2, width, height);
    }

    function showData(data, gridSize) {
      stroke(0, 255, 0);
      noFill();

      beginShape();
      for (let i = 0; i < data.length; i++) {
        vertex(data[i][0] * gridSize, data[i][1] * gridSize);
      }
      endShape(CLOSE);
    }

    push();

    translate(width / 2, height / 2);

    if (frameCount == 0) {
      background(16, 120);
    } else {
      background(16);
    }

    showData(data, this.gridSize);

    showGrid(this.gridSize);

    pop();
  }
}
