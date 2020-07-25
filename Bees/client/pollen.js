
var pollens = [];

class Pollen
{

    constructor(pos, size, magnet)
    {
        this.pos = pos;
        this.size = size;
        this.magnet = magnet;
        this.speed = 0;
    }

    update()
    {

        if(this.pos.dist(this.magnet.pos) < 100)
        {
            delete this;
        }
        else
        {
            let dirToMagnet = p5.Vector.sub(this.pos, this.magnet.pos).normalize();
            //this.pos.add(p5.Vector.mult(dirToMagnet, this.speed));
            //this.speed += 0.1;
        }

    }

    draw()
    {
        push();
        ambientMaterial(255);
        translate(p5.Vector.add(this.pos, createVector(0, -100, 0)));
        texture(tex_pollen);
        plane(this.size);
        pop();
    }

}

function addPollen(pollen)
{
    pollens.push(pollen);
}

function drawPollens()
{

    for(let p of pollens)
    {
        p.draw();
    }

}

function updatePollens()
{

    for(let p of pollens)
    {
        p.update();
    }

}
