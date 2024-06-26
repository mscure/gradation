function startTimer(endTime, elementId) {
    function updateTimer() {
        const now = new Date();
        const timeLeft = endTime - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById(elementId).textContent = 
            (days >= 0 ? days + '' : '') + "d " +
            (hours < 10 ? '0' : '') + hours + "h " + 
            (minutes < 10 ? '0' : '') + minutes + "m " + 
            (seconds < 10 ? '0' : '') + seconds + "s";

        if (timeLeft < 0) {
            clearInterval(intervalId);
            document.getElementById(elementId).textContent = "00:00:00";
        }
    }

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
}

function getNextTenOClock() {
    const now = new Date();
    let nextTen = new Date();
    nextTen.setHours(22, 0, 0, 0);

    if (now >= nextTen) {
        nextTen.setDate(nextTen.getDate() + 1);
    }

    return nextTen;
}

function getNextFridayTenOClock() {
    const now = new Date();
    const nextFriday = new Date();

    const day = now.getDay();
    const diffToFriday = (day <= 5) ? 5 - day : 12 - day;

    nextFriday.setDate(now.getDate() + diffToFriday);
    nextFriday.setHours(22, 0, 0, 0);

    return nextFriday;
}

window.onload = function () {
    const nextTenEndTime = getNextTenOClock();
    const nextFridayEndTime = getNextFridayTenOClock();

    startTimer(nextTenEndTime, 'timer');
    startTimer(nextFridayEndTime, 'friday-timer');
}