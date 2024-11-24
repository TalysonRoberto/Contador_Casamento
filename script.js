function updateCounter() {
    const targetDate = new Date("2024-11-29T00:00:00"); // Substitua pela data alvo
    const currentDate = new Date();

    // Diferença em milissegundos
    const diff = targetDate - currentDate;

    if (diff <= 0) {
        // Se a data alvo passou, zera o contador
        document.getElementById("years").textContent = "00";
        document.getElementById("months").textContent = "00";
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    // Conversão das diferenças
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    // Atualização do DOM
    document.getElementById("years").textContent = "00"; // Não estamos calculando anos aqui
    document.getElementById("months").textContent = "00"; // Não estamos calculando meses aqui
    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Atualiza o contador a cada segundo
setInterval(updateCounter, 1000);
