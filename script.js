function updateCounter() {
    const weddingDate = new Date("2021-11-20T00:00:00"); // Data do casamento
    const currentDate = new Date();

    // Diferença total em milissegundos
    let diff = currentDate - weddingDate;

    // Calcular segundos, minutos, horas, dias, meses e anos
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);

    // Ajuste para cálculo de dias, meses e anos
    const currentYear = currentDate.getFullYear();
    const weddingYear = weddingDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const weddingMonth = weddingDate.getMonth();

    let years = currentYear - weddingYear;
    let months = currentMonth - weddingMonth;
    let days = currentDate.getDate() - weddingDate.getDate();

    // Ajuste para meses negativos
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // Ajuste para dias negativos
    if (days < 0) {
        months -= 1;
        const lastMonth = new Date(currentYear, currentMonth, 0).getDate();
        days += lastMonth;
    }

    // Atualizar o DOM
    document.getElementById("years").textContent = years.toString().padStart(2, "0");
    document.getElementById("months").textContent = months.toString().padStart(2, "0");
    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Atualiza o contador a cada segundo
setInterval(updateCounter, 1000);
