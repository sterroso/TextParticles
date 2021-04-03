/*
 * Simulates text particles animation and physics.
**/

const canvas = document.getElementById("jstp-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let particleArray = [];

const mouse = {
    x: null,
    y: null,
    radius: 50
}

window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(
            x,          // Initial x position.
            y,          // Initial y position.
            radius = 3, // Radius.
            mass = 10,  // Mass.
            r = 0,      // RGB's red part.
            g = 0,      // RGB's green part.
            b = 0,      // RGB's blue part.
            a = 0       // Alpha (opacity).
        ) {
        // Current x position.
        this.x = x;

        // Preserve original x position.
        this.baseX = this.x;

        // Current y position.
        this.y = y;

        // Preserve initial y position.
        this.baseY = this.y;

        // Particle radius.
        this.radius = radius;

        // Particle mass (affects inertia).
        this.mass = mass;

        // Particle density.
        this.density = this.mass / this.size;

        // Particle color and alpha (opacity).
        this.color = {
            red: r,
            green: g,
            blue: b,
            alpha: a
        }
    }

    getHexcolor(withAlpha = false) {
        let base = '#'.concat(this.color.red.toString(16).toUpperCase(), 
            this.color.green.toString(16).toUpperCase(),
            this.color.blue.toString(16).toUpperCase());
        
        if (withAlpha) {
            return base.concat(this.color.alpha.toString(16).toUpperCase());
        }

        return base;
    }

    draw() {
        ctx.fillStyle = this.getHexcolor(true);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            let vectorX = dx / distance;
            let vectorY = dy / distance;
    
            let accel = (mouse.radius - distance) / mouse.radius;
    
            let force = accel * this.mass;
    
            this.x -= vectorX * force;
            this.y -= vectorY * force;
        } else {
            if (this.x !== this.baseX || this.y !== this.baseY) {
                this.x -= (this.x - this.baseX) / 5;
                this.y -= (this.y - this.baseY) / 5;
            }
        }
    }
}

function init() {
    ctx.fillStyle = '#DC143C';
    ctx.font = '30px Verdana';
    ctx.fillText('Sergio', 0, 30);
    
    
    const scanData = ctx.getImageData(0, 0, 110, 50);

    const X_OFFSET = 50;
    const Y_OFFSET = 50;
    const PARTICLE_RADIUS = 3;
    const PARTICLE_SPACER = 1 + 2 * PARTICLE_RADIUS;

    particleArray = [];

    for (var y = 0; y < scanData.height; y++) {
        for (var x = 0; x < scanData.width; x++) {
            var pixelPos = 4 * (y * scanData.width + x);
            var tcAlpha = scanData.data[pixelPos + 3];
            if (tcAlpha !== 0) {
                var posX = x * PARTICLE_SPACER + X_OFFSET;
                var posY = y * PARTICLE_SPACER + Y_OFFSET;
                var tcR = scanData.data[pixelPos];
                var tcG = scanData.data[pixelPos + 1];
                var tcB = scanData.data[pixelPos + 2];
                var mass = 3 + Math.random() * 30;
    
                particleArray.push(new Particle(posX, posY, 
                    PARTICLE_RADIUS, mass, tcR, tcG, tcB, 
                    tcAlpha));
            }
        }
    }
    
}

init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particleArray.forEach(value => {
        value.draw();
        value.update();
    });
    
    requestAnimationFrame(animate);
}

animate();
