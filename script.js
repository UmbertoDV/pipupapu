const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const sound = document.getElementById("pipupapu-sound");

// Funzione per impostare le dimensioni del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Chiamata iniziale per dimensionare il canvas
resizeCanvas();

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height;
        this.speed = 0.5 + Math.random() * 1; // Ridotta la velocità per fuochi più lenti
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.size = Math.random() * 5 + 5;
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 10) {
                this.exploded = true;
                this.createParticles();
            } else {
                this.x += dx / distance * this.speed;
                this.y += dy / distance * this.speed;
            }
        } else {
            this.particles.forEach(particle => particle.update());
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            this.particles.forEach(particle => particle.draw());
        }
    }

    createParticles() {
        const particleCount = 200;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 7 + 3;
        this.speedX = (Math.random() - 0.5) * 7; // Ridotta la velocità orizzontale
        this.speedY = (Math.random() - 0.5) * 7; // Ridotta la velocità verticale
        this.alpha = 1;
        this.gravity = 0.02; // Gravità ridotta per rallentare la caduta
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.alpha -= 0.005; // Particelle che svaniscono più lentamente
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

const fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.1) { // Frequenza ridotta per meno fuochi
        fireworks.push(new Firework());
    }

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        if (firework.exploded && firework.particles.every(p => p.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// Ridimensiona il canvas quando cambia la dimensione della finestra
window.addEventListener("resize", resizeCanvas);

// Riproduce il suono quando si clicca sulla pagina
document.addEventListener("click", () => {
    sound.play();
});

// Avvia l'animazione
animate();
