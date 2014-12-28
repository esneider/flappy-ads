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
        radius: 35,
        color: 'Crimson',
        shape: null,
    },
    billboard: {
        relWidth: 0.2,
        ratio: 1.1,
        path: 'img/billboard.jpg',
        relSeparation: 1.5,
        x: 0,
        width: 0,
        height: 0,
        image: null,
        shape: null,
    },
};

function init() {

    // Make the canvas fill the screen
    var canvas = document.getElementById('mainCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create the scene
    game.stage = new createjs.Stage('mainCanvas');

    // Create the bird
    var bird = game.bird;
    bird.shape = new createjs.Shape();
    bird.shape.graphics.beginFill(bird.color).drawCircle(0, 0, bird.radius);
    bird.shape.y = window.innerHeight * bird.y;
    bird.shape.x = window.innerWidth / 2;
    game.stage.addChild(bird.shape);

    // Create obstacles
    var obstacle = game.obstacle;
    obstacle.x = window.innerWidth;
    obstacle.up = new createjs.Shape();
    obstacle.down = new createjs.Shape();

    // Create background
    var billboard = game.billboard;

    billboard.width = window.innerWidth * billboard.relWidth;
    billboard.height = billboard.width / billboard.ratio;
    billboard.image = new Image();
    billboard.image.src = billboard.path;
    // billboard.image.width = width;
    // billboard.image.height = width / billboard.ratio;
    billboard.shape = new createjs.Bitmap(billboard.image);
    // billboard.shape.image.width = width;
    // billboard.shape.image.height = width / billboard.ratio;
    billboard.x = window.innerWidth * (billboard.relSeparation - 0.5);
    billboard.y = window.innerHeight - billboard.height;
    game.stage.addChild(billboard.shape);

    // Handle events
    game.stage.addEventListener('stagemousedown', handleClick);
    game.stage.addEventListener('tick', handleTick);

    // Enable touch gestures
    createjs.Touch.enable(game.stage, true);

    // Start animation
    createjs.Ticker.setFPS(game.fps);
    createjs.Ticker.addEventListener('tick', game.stage);
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
    }

    var billboardX = billboard.x - game.x;
    createjs.Tween.get(billboard.shape).to({x: billboardX, y: billboard.y}, 0);
    console.log(billboardX);
}
