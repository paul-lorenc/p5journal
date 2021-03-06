class Node {
  constructor(x, y, r = NODE_RADIUS) {
    this.id = "";
    this.x = x;
    this.y = y;
    this.r = r;
    this.over = true;
    this.selected = false;
    this.engaged = false;
    this.color;
    this.drawing = [];
  }

  update(px, py) {
    this.x = this.x + px;
    this.y = this.y + py;
  }

  zoom(sX, sY) {
    this.x = sX * this.x;
    this.y = sY * this.y;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  intersects(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < NODE_RADIUS + this.r) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    let stroken = 255;
    push();
    stroke(stroken);
    noFill();
    if (this.over) {
      push();
      imageMode(CENTER);
      image(onHoverTexture, this.x, this.y);
      onHoverTexture.resize(200, 200);
      pop();
    }
    if (this.selected) {
      if (this.isGoal) {
        rectMode(CENTER);
        square(this.x, this.y, 2 * this.r);
      } else {
        ellipse(this.x, this.y, 2 * this.r);
      }
    }
    if (this.engaged) {
      rectMode(CENTER);
      for (let i = 1; i < 5; i++) {
        stroke(stroken);
        stroken = stroken - 30;
        square(this.x, this.y, this.r + 40 * 2 - (i * this.r) / 10);
      }
    }
    pop();
  }
}
