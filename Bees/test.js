
var angle = 0;

function setup()
{
    createCanvas(400, 300, WEBGL);
}

function draw()
{
    ambientLight(100);
    directionalLight(255, 255, 0, 0, 0, -1);
    background(51);

    fill(255, 0, 150);
    rectMode(CENTER);
    rotateX(-mouseY * 0.01);
    rotateY(-mouseX * 0.01);
    //rotateZ(angle * 0.5);
    ambientMaterial(255);
    box(100, 100, 100);

    angle += 0.05;
}
