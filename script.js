// --- CONFIGURAÇÕES INICIAIS ---
const weddingDate = new Date('2021-11-20T00:00:00');
const overlay = document.getElementById('welcome-overlay');
const startBtn = document.getElementById('start-button');
const music = document.getElementById('background-music');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
let heartInterval;

// --- LÓGICA DO CONTADOR ---
function updateCounter() {
  const now = new Date();
  let diff = now - weddingDate;

  let years = now.getFullYear() - weddingDate.getFullYear();
  let months = now.getMonth() - weddingDate.getMonth();
  let days = now.getDate() - weddingDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById('years').innerText = years;
  document.getElementById('months').innerText = months;
  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = Math.floor(
    (diff / (1000 * 60 * 60)) % 24,
  );
  document.getElementById('minutes').innerText = Math.floor(
    (diff / (1000 * 60)) % 60,
  );
  document.getElementById('seconds').innerText = Math.floor((diff / 1000) % 60);
}

// --- LÓGICA DO SLIDER ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function changeSlide(direction) {
  if (slides.length === 0) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

// --- LÓGICA DOS CORAÇÕES (OTIMIZADA) ---
function createHeart() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  const heart = document.createElement('div');
  heart.classList.add('heart');

  const types = ['❤', '✨', '♥', '🌸'];
  heart.innerText = types[Math.floor(Math.random() * types.length)];

  // Posição horizontal segura (evita scroll lateral)
  heart.style.left = Math.random() * 90 + 5 + 'vw';

  // Cores da paleta
  const colors = ['#C5A059', '#E6BE8A', '#ffebc4'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.fontSize = Math.random() * 15 + 12 + 'px';

  const duration = Math.random() * 3 + 5;

  // Animação usando translate3d para performance (usa a GPU do celular)
  heart.animate(
    [
      { transform: 'translate3d(0, -10vh, 0) rotate(0deg)', opacity: 0 },
      { opacity: 0.8, offset: 0.2 },
      { transform: 'translate3d(0, 105vh, 0) rotate(360deg)', opacity: 0 },
    ],
    {
      duration: duration * 1000,
      easing: 'linear',
    },
  );

  container.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

// --- EVENTOS E INICIALIZAÇÃO ---

// Inicia o site ao clicar no botão da Splash Screen
startBtn.addEventListener('click', () => {
  overlay.classList.add('welcome-hidden');

  // Tocar música
  music.play().catch((error) => console.log('Erro ao tocar:', error));

  // Mostrar controle de música
  musicBtn.style.display = 'flex';
  musicBtn.classList.add('playing');
  musicIcon.innerText = '🔊';

  // Iniciar corações com verificação de celular
  const isMobile = window.innerWidth <= 768;
  heartInterval = setInterval(createHeart, isMobile ? 600 : 300);
});

// Controle de Pausa/Play
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (music.paused) {
    music.play();
    musicIcon.innerText = '🔊';
    musicBtn.classList.add('playing');
  } else {
    music.pause();
    musicIcon.innerText = '🔈';
    musicBtn.classList.remove('playing');
  }
});

// Timers Globais
setInterval(updateCounter, 1000);
setInterval(() => changeSlide(1), 5000);
updateCounter();
