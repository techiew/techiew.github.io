
var interactables = [];

class ISphere
{

    constructor(parent, iRadius)
    {
        this.parent = parent;
        this.iRadius = iRadius;
        this.inRange = false;
        this.pos = createVector(0, 0, 0);
    }

    update(pos)
    {
        this.pos = pos;
    }

    draw()
    {
        push();
        stroke(0, 0, 0, 255);
        strokeWeight(1);

        if(this.inRange)
        {
            fill(255, 255, 0, 50);
        }
        else
        {
            fill(255, 255, 255, 50);
        }

        translate(this.pos);
        sphere(this.iRadius);
        pop();
    }

    onUse(tool)
    {
        this.parent.onUse(tool);
    }

}

function addInteractable(iSphere)
{
    interactables.push(iSphere);
}

function checkPlayerInteraction(playerPos)
{
    player.interactTarget = -1;

    for(let i of interactables)
    {

        if(i.pos.dist(playerPos) <= i.iRadius)
        {
            i.inRange = true;
            player.interactTarget = i;
        }
        else
        {
            i.inRange = false;
        }

    }

}

function drawInteractables()
{

    for(let i of interactables)
    {
        i.draw();
    }

}
