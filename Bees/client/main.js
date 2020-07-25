
var frames = 0;
var angle = 0;
const HALF_PI = 3.14159265359 / 2;

//Objects
var player;
var playerCamera;
var gameMap;

//Models
var bee;

//Textures
var tex_player;
var tex_grass;
var tex_pollen;
var tex_lilylion;
var flowers = [];

var testbox;

function preload() //Load bilder osv. her
{
    bee = loadModel("client/assets/models/bee.obj");
    tex_grass = loadImage("client/assets/textures/grass.jpg");
    tex_pollen = loadImage("client/assets/textures/flowers/pollen.png");
    tex_player = loadImage("client/assets/textures/bee.png");
    tex_lilylion = loadImage("client/assets/textures/flowers/lilylion.png");
    flowers.push(tex_lilylion);
}

function setup()
{
    createCanvas(800, 600, WEBGL);
    textureWrap(REPEAT);
    let myCanvas = document.getElementById("defaultCanvas0");
    document.addEventListener("mousemove", moveCallback, false);
    document.addEventListener("pointerlockchange", changeCallback, false);
    document.addEventListener("mozpointerlockchange", changeCallback, false);
    document.addEventListener("webkitpointerlockchange", changeCallback, false);
    player = new Player(createVector(0, -250, 0));
    playerCamera = new PlayerCamera(0.001, createVector(0, 0, (height/2.0) / tan(PI*30.0 / 180.0)), createVector(0, 0, 0), createVector(1, 1, -1));
    gameMap = new GameMap();
    testBox = new CBox(500, 500, 500);
    addCollideable(testBox);
    //setAttributes("premultipliedAlpha", false);
    //setAttributes("alpha", false);
    //perspective(PI/3, width/height, 0.01, 5);
}

function draw()
{

    if(frames == 60)
    {
        console.log(pollencount);
        frames = 0;
    }

    testBox.update(createVector(500, -250, 100));
    background(50);
    ambientLight(150);
    directionalLight(255, 255, 255, 0.8, 1, -1);

    checkInputs();
    player.update();
    playerCamera.update();
    updateFlowerbeds();
    updatePollens();

    gameMap.draw();
    player.draw();
    //drawPollens();
    //drawInteractables();
    //drawCollideables();

    angle += 0.01;
    frames++;
}
