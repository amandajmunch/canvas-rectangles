const canvas = document.getElementById("canvas");
const c = canvas.getContext('2d');
const xhr = new XMLHttpRequest();

let data = null;
let collection = [];

xhr.open('GET', 'https://creative.dev.krg.io/codetest/?rectangles=10', true)

xhr.onreadystatechange = function(){
  if(xhr.readyState === 4){
    if(xhr.status >= 200 && xhr.status < 300){
      data = JSON.parse(xhr.responseText);
      dataLoaded();
    } else {
      return;
    }
  }
};

xhr.send();

function dataLoaded(a,b){
  for(let i = 0; i < data.length; i++){
    let info = data[i];
    collection.push(new Rectangle(info.x, info.y, info.w, info.h, info.vx, info.color));
    }
    setInterval(animate, 50);
}

function animate(){
  c.clearRect(0, 0, canvas.width, canvas.height);
  function sortNums (a,b) {
    return ((b.w + b.h) - (a.w + a.h) );
  };
  collection.sort(sortNums);

  for(let i = 0; i < collection.length; i++){
      let rect = collection[i];
      collection[6].color = "#000";
      rect.move();
      rect.draw();
    }
}

class Rectangle {
  constructor(x, y, w, h, vx, color) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.vx = vx;
      this.color = color;
    }

  move(){
    if (this.x > 760 || this.x < 0){
      this.vx = -this.vx;
    }
      this.x+= this.vx;
  }

  draw() {
    c.fillRect(this.x, this.y, this.w, this.h);
    c.fillStyle = "" + this.color + "";
  }
}
