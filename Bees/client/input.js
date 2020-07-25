
var moveMouseX = 0;
var moveMouseY = 0;
var cursorLocked = false;

//Handle inputs from keyboard & mouse
function checkInputs()
{
    player.backTilt = 0;
    player.sideTilt = 0;
    let w, a, s, d, space, ctrl;
    let nextPos = player.pos.copy();
    let collisionModifier;

    if(keyIsDown(87)) //W
    {
        w = true;
        nextPos.add(player.forward.normalize().mult(player.speed));
    }
    else if(keyIsDown(83)) //S
    {
        s = true;
        nextPos.sub(player.forward.normalize().mult(player.speed));
    }

    if(keyIsDown(65)) //A
    {
        a = true;
        nextPos.sub(player.right.normalize().mult(player.speed));
    }
    else if(keyIsDown(68)) //D
    {
        d = true;
        nextPos.add(player.right.normalize().mult(player.speed));
    }

    if(keyIsDown(32))
    {
        space = true;
        nextPos.sub(player.up.normalize().mult(player.speed));
    }
    else if(keyIsDown(67)) //ctrl er 17
    {
        ctrl = true;
        nextPos.add(player.up.normalize().mult(player.speed));
    }

    if(w)
    {
        player.backTilt = -0.1;
    }

    if(a)
    {
        player.sideTilt = 0.2;
    }

    if(s)
    {
        player.backTilt = 0.3;
    }

    if(d)
    {
        player.sideTilt = -0.2;
    }

    if(keyIsDown(69)) //E
    {
        player.onUseButton();
    }

    if(!checkPlayerCollision(player.pos, nextPos, player.cBox, collisionModifier))
    {
        player.pos = nextPos;
    }

    playerCamera.rotate(moveMouseX, moveMouseY);
    moveMouseX = 0;
    moveMouseY = 0;
}

function mouseClicked()
{

    if(!cursorLocked)
    {
        document.getElementById("defaultCanvas0").requestPointerLock();
    }

}

function mousePressed()
{

    if(mouseButton === RIGHT)
    {
        centerPlayerViewToCamera();
    }

}

function mouseDragged()
{

    if(mouseButton === RIGHT)
    {
        centerPlayerViewToCamera();
    }

}

function centerPlayerViewToCamera()
{
    player.forward.set(playerCamera.forward);
    player.right.set(playerCamera.right);
    player.up.set(playerCamera.up);
}

function mouseWheel(event)
{
    playerCamera.zoomLevel += (event.delta * 10);
}

function moveCallback(e)
{
    if(!cursorLocked) return;
    moveMouseX = e.movementX;
    moveMouseY = e.movementY;
}

function changeCallback()
{

    if(!cursorLocked)
    {
        cursorLocked = true;
    }
    else
    {
        cursorLocked = false;
    }

}
