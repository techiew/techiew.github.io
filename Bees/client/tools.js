
var tools =
{

    straw:
    {
        name: "Straw",
        range: 10,
        power: 0.5,
        useSpeed: 100,

        draw()
        {
            push();
            ambientMaterial(255);
            noStroke();
            fill(255, 20, 147);
            translate(p5.Vector.sub(p5.Vector.add(player.pos, p5.Vector.mult(player.forward.normalize(), 50)), p5.Vector.mult(player.up.normalize(), -40)));
            translate(p5.Vector.mult(p5.Vector.mult(player.right.normalize(), 10), getSideTiltModifier()));

            let backMod = getBackTiltModifier();

            if(backMod > 0)
            {
                translate(p5.Vector.mult(p5.Vector.mult(player.up.normalize(), 10), -getBackTiltModifier()));
                translate(p5.Vector.mult(p5.Vector.mult(player.forward.normalize(), 5), getBackTiltModifier()));
            }
            else if(backMod < 0)
            {
                translate(p5.Vector.mult(p5.Vector.mult(player.up.normalize(), 2), -getBackTiltModifier()));
                translate(p5.Vector.mult(p5.Vector.mult(player.forward.normalize(), 2), getBackTiltModifier()));
            }

            rotateY(player.angle.y);
            rotateX(player.angle.x + HALF_PI / 2);
            rotateZ(player.angle.z + player.sideTilt);
            cylinder(5, 60, 24, 1, false, false);
            pop();
        }

    }

}

function getSideTiltModifier()
{

    if(player.sideTilt > 0) return 1;
    else if(player.sideTilt < 0) return -1;
    else return 0;

}

function getBackTiltModifier()
{

    if(player.backTilt > 0) return 1;
    else if(player.backTilt < 0) return -1;
    else return 0;

}
