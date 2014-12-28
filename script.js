var bird = {
    v: 0,
    y: 0,
};

function init() {

    // Make the canvas fill the screen
    var canvas = document.getElementById('mainCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create the scene
    var stage  = new createjs.Stage('mainCanvas');

    // Create the bird
    bird = new createjs.Shape();
    bird.graphics.beginFill('Crimson').drawCircle(0, 0, 50);
    bird.y = window.innerHeight / 2;
    bird.x = window.innerWidth / 2;
    stage.addChild(bird);

    // createjs.Tween.get(circle).to({});
    // createjs.Tween.get(circle, {loop: true})
        // .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
        // .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
        // .to({alpha: 0, y: 125}, 100)
        // .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
        // .to({x: 100}, 800, createjs.Ease.getPowInOut(2));

    // Handle events
    stage.addEventListener("stagemousedown", handleClick);
    stage.addEventListener('tick', handleTick);

    // Enable touch gestures
    createjs.Touch.enable(stage, true);

    // Start animation
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', stage);
}

function handleClick() {
    console.log("you clicked");
}

function handleTick() {
    // createjs.Tween.
    // console.log('hey');
}
