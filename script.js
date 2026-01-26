const canvas = document.getElementById('avatarCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// 1. Drawing Mechanics
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#333';

    // Get mouse position relative to canvas
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

// 2. Save Logic (Using LocalStorage)
function saveProfile() {
    const user = document.getElementById('usernameInput').value;
    const drawingData = canvas.toDataURL(); // Turns your art into a string of text

    localStorage.setItem('myUsername', user);
    localStorage.setItem('myAvatar', drawingData);

    alert("Profile saved! Even if you refresh, the browser will remember you.");
}

// 3. Clear Canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}// This runs automatically whenever the page loads
window.onload = function() {
    const savedName = localStorage.getItem('myUsername');
    const savedAvatar = localStorage.getItem('myAvatar');

    if (savedName) {
        document.getElementById('usernameInput').value = savedName;
        console.log("Welcome back, " + savedName);
    }

    if (savedAvatar) {
        // Create an image object to draw the saved art back onto the canvas
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        };
        img.src = savedAvatar;
    }
};