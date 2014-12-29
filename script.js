var game = {
    fps: 60,
    gravity: -10,
    delta: 0.00015,
    clickVelocityGain: 5,
    x: 0,
    velocity: 1000,
    stage: null,
    bird: {
        y: 0.5,
        velocity: 0,
        radius: 20,
        color: 'Crimson',
        shape: null,
    },
    billboard: {
        path: 'img/billboard.png',
        relSeparation: 1,
        width: 196,
        height: 1166,
        billboardHeight: 455,
        holeHeight: 240,
        x: 0,
        width: 0,
        height: 0,
        image: null,
        shape: null,
    },
};

function randY() {
    var billboard = game.billboard;
    var min = -billboard.billboardHeight;
    var width = billboard.holeHeight - window.innerHeight;
    return min - Math.random() * width;
}

function init() {

    // Make the canvas fill the screen
    var canvas = document.getElementById('mainCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create the scene
    game.stage = new createjs.Stage('mainCanvas');

    // Create background
    var billboard = game.billboard;
    billboard.image = new Image();
    billboard.image.src = billboard.path;
    billboard.shape = new createjs.Bitmap(billboard.image);
    billboard.x = window.innerWidth * billboard.relSeparation;
    billboard.y = randY();
    game.stage.addChild(billboard.shape);

    // Create the bird
    var bird = game.bird;
    bird.shape = new createjs.Shape();
    bird.shape.graphics.beginFill(bird.color).drawCircle(0, 0, bird.radius);
    bird.shape.y = window.innerHeight * bird.y;
    bird.shape.x = window.innerWidth / 2;
    game.stage.addChild(bird.shape);

    // Handle events
    game.stage.addEventListener('stagemousedown', handleClick);
    game.stage.addEventListener('tick', handleTick);

    // Enable touch gestures
    createjs.Touch.enable(game.stage, true);

    // Start animation
    createjs.Ticker.setFPS(game.fps);
    createjs.Ticker.addEventListener('tick', game.stage);
}

function gameOver() {


    document.getElementById('gameOver').style.display = 'block';
}

function handleClick() {

    game.bird.velocity += game.clickVelocityGain;
}

function handleTick() {

    // Advance background
    var time = game.fps * game.delta;
    game.x += game.velocity * time;

    // Redraw bird
    var bird = game.bird;
    bird.velocity += game.gravity * time;
    bird.y += bird.velocity * time;
    createjs.Tween.get(bird.shape).to({y: window.innerHeight * (1 - bird.y)}, 0);

    // Redraw billboard
    var billboard = game.billboard;

    if (billboard.x + billboard.width < game.x) {
        billboard.x += window.innerWidth * billboard.relSeparation;
        billboard.y = randY();
    }

    var billboardX = billboard.x - game.x;
    createjs.Tween.get(billboard.shape).to({x: billboardX, y: billboard.y}, 0);

    // Check for collisions
    if (bird.y * window.innerHeight < - bird.radius / 2 ||
        bird.y * window.innerHeight > window.innerHeight + bird.radius / 2) {

        gameOver();
    }

    if (billboardX                   < (window.innerWidth + bird.radius) / 2 &&
        billboardX + billboard.width > (window.innerWidth - bird.radius) / 2) {

        if ((1 - bird.y) * window.innerHeight + bird.radius / 2 < billboard.y + billboard.billboardHeight ||
            (1 - bird.y) * window.innerHeight - bird.radius / 2 > billboard.y + billboard.billboardHeight + billboard.holeHeight) {

            gameOver();
        }
    }
}
