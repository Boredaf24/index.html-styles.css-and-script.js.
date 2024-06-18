<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scratch and Reveal</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <canvas id="scratchCanvas" width="300" height="300"></canvas>
    </div>
    <script src="script.js"></script>
</body>
</html>

body, html {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
}

.container {
    position: relative;
    width: 300px;
    height: 300px;
}

canvas {
    border-radius: 50%;
    cursor: crosshair;
}

window.addEventListener('load', function() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');

    const images = [
        'images/sex_position_1.jpg', 
        'images/sex_position_2.jpg', 
        'images/sex_position_3.jpg'
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const img = new Image();
    img.src = randomImage;
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        scratchLayer();
    };

    function scratchLayer() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-out';
        
        canvas.addEventListener('mousedown', scratch);
        canvas.addEventListener('touchstart', scratch);
    }

    function scratch(event) {
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const offsetX = rect.left;
        const offsetY = rect.top;
        const moveHandler = function(e) {
            const x = (e.clientX || e.touches[0].clientX) - offsetX;
            const y = (e.clientY || e.touches[0].clientY) - offsetY;
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2, false);
            ctx.fill();
        };
        const stopHandler = function() {
            canvas.removeEventListener('mousemove', moveHandler);
            canvas.removeEventListener('mouseup', stopHandler);
            canvas.removeEventListener('touchmove', moveHandler);
            canvas.removeEventListener('touchend', stopHandler);
        };

        canvas.addEventListener('mousemove', moveHandler);
        canvas.addEventListener('mouseup', stopHandler);
        canvas.addEventListener('touchmove', moveHandler);
        canvas.addEventListener('touchend', stopHandler);
    }
});

