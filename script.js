// Lógica do Contador
function updateCounter() {
  const weddingDate = new Date('2021-11-20T00:00:00');
  const now = new Date();
  let diff = now - weddingDate;

  // Cálculo simplificado para anos, meses e dias
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

// Lógica do Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function changeSlide(direction) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

// Auto-play do slider (cada 5 segundos)
setInterval(() => changeSlide(1), 5000);

setInterval(updateCounter, 1000);
updateCounter();

function createHeart() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  const heart = document.createElement('div');
  heart.classList.add('heart');

  const types = ['❤', '✨', '♥', '🌸'];
  heart.innerText = types[Math.floor(Math.random() * types.length)];

  // Posição horizontal aleatória
  heart.style.left = Math.random() * 95 + 'vw';

  // TRUQUE PARA LONG PAGE: Faz o coração aparecer perto de onde o usuário está scrollado
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const startPos = scrollY - 50; // Começa um pouco acima do que você vê

  heart.style.top = startPos + 'px';

  // Cores variadas para garantir visibilidade
  const colors = ['#C5A059', '#E6BE8A', '#8B4513', '#ffebc4'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];

  heart.style.fontSize = Math.random() * 15 + 12 + 'px';

  // Duração da queda
  const duration = Math.random() * 3 + 4;
  heart.style.animationDuration = duration + 's';

  // Faz ele cair uma distância proporcional à tela
  heart.animate(
    [
      { transform: `translateY(0) rotate(0deg)`, opacity: 0 },
      {
        transform: `translateY(${windowHeight * 0.8}px) rotate(360deg)`,
        opacity: 0.8,
      },
      { transform: `translateY(${windowHeight}px) rotate(720deg)`, opacity: 0 },
    ],
    {
      duration: duration * 1000,
      easing: 'linear',
    },
  );

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(createHeart, 400);
