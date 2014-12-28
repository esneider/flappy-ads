var game = {
    fps: 60,
    gravity: 9.8,
    stage: null,
    bird: {
        y: 0.5,
        velocity: 0,
        radius: 35,
        color: 'Crimson',
        shape: null,
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

    // createjs.Tween.get(circle).to({});
    // createjs.Tween.get(circle, {loop: true})
        // .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
        // .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
        // .to({alpha: 0, y: 125}, 100)
        // .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
        // .to({x: 100}, 800, createjs.Ease.getPowInOut(2));

    // Handle events
    game.stage.addEventListener("stagemousedown", handleClick);
    game.stage.addEventListener('tick', handleTick);

    // Enable touch gestures
    createjs.Touch.enable(game.stage, true);

    // Start animation
    createjs.Ticker.setFPS(game.fps);
    createjs.Ticker.addEventListener('tick', game.stage);
}

function handleClick() {
    console.log("you clicked");
}

function handleTick() {
    // createjs.Tween.
    // console.log('hey');
}
