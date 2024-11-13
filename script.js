// Seleziona l'elemento HTML per l'immagine sorpresa e il suono
const surpriseImage = document.getElementById('surprise-image');
const pipupapuSound = document.getElementById('pipupapu-sound');
const fireworksContainer = document.getElementById('fireworks-container');

// Riproduce il suono e mostra l'immagine sorpresa al clic
document.body.addEventListener('click', () => {
    pipupapuSound.play();
    surpriseImage.classList.add('spin');
    setTimeout(() => {
        surpriseImage.classList.remove('spin');
    }, 3000);
});

// Funzione per creare un'esplosione di fuochi d'artificio
function createFirework() {
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * (window.innerHeight); // Parte alta dello schermo

    // Numero di particelle per l'esplosione
    const particlesCount = 50;

    // Crea particelle
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Imposta la posizione iniziale
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;

        // Colore casuale per ogni particella
        const hue = Math.random() * 360;
        particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        fireworksContainer.appendChild(particle);

        // Angolo e distanza casuale
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 200 + 100;

        // Calcola la posizione finale
        const finalX = posX + distance * Math.cos(angle);
        const finalY = posY + distance * Math.sin(angle);

        // Animazione delle particelle
        particle.animate([
            {
                transform: 'translate(0, 0)',
                opacity: 1,
            },
            {
                transform: `translate(${finalX - posX}px, ${finalY - posY}px)`,
                opacity: 0,
            },
        ], {
            duration: 2000,
            easing: 'ease-out',
        });

        // Rimuovi la particella dopo l'animazione
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Genera fuochi d'artificio ogni 700 millisecondi
setInterval(createFirework, 300);
setInterval(createFirework, 300);
setInterval(createFirework, 300);
setInterval(createFirework, 300);