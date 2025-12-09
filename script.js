const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function random(min,max){return Math.random()*(max-min)+min;}

class Particle {
  constructor(){
    this.x = random(0,canvas.width);
    this.y = random(0,canvas.height);
    this.size = random(2,6);
    this.speedX = random(-0.5,0.5);
    this.speedY = random(-0.5,0.5);
    this.color = `hsla(${Math.random()*360}, 100%, 70%, 0.7)`;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x<0||this.x>canvas.width) this.speedX *= -1;
    if(this.y<0||this.y>canvas.height) this.speedY *= -1;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Initialize particles
for(let i=0;i<150;i++){
  particles.push(new Particle());
}

function animate(){
  ctx.fillStyle = 'rgba(17,17,17,0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();

// Button click effect
const button = document.getElementById('pulseBtn');
button.addEventListener('click', ()=>{
  button.style.transform = 'scale(1.5)';
  setTimeout(()=>{button.style.transform='scale(1)';},200);
});

// Responsive
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
