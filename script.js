var game = {
    fps: 60,
    gravity: -10,
    delta: 0.00015,
    clickVelocityGain: 5,
    stage: null,
    bird: {
        y: 0.5,
        velocity: 0,
        radius: 35,
        color: 'Crimson',
        shape: null,
    },
    background: {
        x: 0,
        velocity: 1,
        acceleration: 0.1,
    },
    obstacles: {
        separation: 100,
    }
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

    // Redraw bird
    var bird = game.bird;
    var time = game.fps * game.delta;

    bird.velocity += game.gravity * time;
    bird.y += bird.velocity * time;

    createjs.Tween.get(bird.shape).to({y: window.innerHeight * (1 - bird.y)}, 0);

    // Redraw obstacles
    var background = game.background;

}
