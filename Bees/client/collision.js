
var collideables = [];

class CBox
{

    constructor(cWidth, cHeight, cDepth)
    {
        this.cWidth = cWidth;
        this.cHeight = cHeight;
        this.cDepth = cDepth;
        this.isColliding = false;
    }

    update(pos)
    {
        this.pos = pos;
        this.minX = pos.x - this.cWidth * 0.5;
        this.maxX = pos.x + this.cWidth * 0.5;
        this.minY = pos.y - this.cHeight * 0.5;
        this.maxY = pos.y + this.cHeight * 0.5;
        this.minZ = pos.z - this.cDepth * 0.5;
        this.maxZ = pos.z + this.cDepth * 0.5;
    }

    draw()
    {
        push();

        if(this.isColliding)
        {
            fill(255, 255, 0, 20);
            stroke(255, 255, 0, 255);
        }
        else
        {
            fill(255, 0, 0, 20);
            stroke(255, 0, 0, 255);
        }

        strokeWeight(5);
        translate(this.pos);
        box(this.cWidth, this.cHeight, this.cDepth);
        pop();
    }

}

function addCollideable(cBox)
{
    collideables.push(cBox);
}

function checkPlayerCollision(fromPos, toPos, playerCBox, collisionModifier)
{
    let posDiff = p5.Vector.sub(fromPos, toPos);

    let a =
    {
        minX: toPos.x - playerCBox.cWidth * 0.5,
        minY: toPos.y - playerCBox.cHeight * 0.5,
        minZ: toPos.z - playerCBox.cDepth * 0.5,
        maxX: toPos.x + playerCBox.cWidth * 0.5,
        maxY: toPos.y + playerCBox.cHeight * 0.5,
        maxZ: toPos.z + playerCBox.cDepth * 0.5
    };

    for (let b of collideables)
    {
        //drawMovingToBox(toPos, playerCBox.cWidth, playerCBox.cHeight, playerCBox.cDepth);

        if ((a.minX <= b.maxX && a.maxX >= b.minX) &&
        (a.minY <= b.maxY && a.maxY >= b.minY) &&
        (a.minZ <= b.maxZ && a.maxZ >= b.minZ))
        {
            playerCBox.isColliding = true;
            b.isColliding = true;
            return true;
        }

        b.isColliding = false;
    }

    playerCBox.isColliding = false;
    return false;
}

function drawMovingToBox(pos, bWidth, bHeight, bDepth)
{
    push();
    translate(pos);
    fill(255, 0, 0, 0);
    stroke(255, 0, 0, 255);
    strokeWeight(1)
    box(bWidth, bHeight, bDepth);
    pop();
}

function drawCollideables()
{
    player.cBox.draw();

    for (let c of collideables)
    {
        c.draw();
    }

}
