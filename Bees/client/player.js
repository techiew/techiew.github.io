
class Player
{

    constructor(startPos)
    {
        this.pos = startPos;
        this.speed = 20;
        this.angle = createVector(0, 0, 0);
        this.forward = createVector(0, 0, -1);
        this.up = createVector(0, 1, 0);
        this.right = createVector(1, 0, 0);
        this.horizontalAngle = PI;
        this.verticalAngle = 0;
        this.sideTilt = 0;
        this.backTilt = 0;
        this.wingAngle = 0;
        this.wingFlapDir = 1;
        this.cBox = new CBox(50, 50, 50);
        this.selectedTool = tools.straw;
        this.interactTarget = -1;
        this.lastToolUseTime = 0;
    }

    update()
    {
        checkPlayerInteraction(this.pos);
        this.cBox.update(this.pos);

        this.wingAngle += this.sideTilt + this.backTilt + (0.35 * this.wingFlapDir);

        if(this.wingAngle > 1.5)
        {
            this.wingAngle = 1.5;
            this.wingFlapDir = -1;
        }
        else if(this.wingAngle < 0)
        {
            this.wingAngle = 0;
            this.wingFlapDir = 1;
        }

    }

    draw()
    {
        push();
        ambientMaterial(255);
        noStroke();
        translate(player.pos);
        player.angle = createVector(asin(-player.forward.normalize().y), atan2(player.forward.normalize().x, player.forward.normalize().z), PI);
        rotateY(player.angle.y);
        rotateX(player.angle.x + player.backTilt);
        rotateZ(player.angle.z + player.sideTilt);
        scale(25);
        texture(tex_player);
        model(bee);
        pop();

        push();
        ambientMaterial(255);
        noStroke();
        fill(150, 200, 255);
        translate(player.pos);
        rotateY(player.angle.y);
        rotateX(player.angle.x + player.backTilt);
        rotateZ(player.angle.z + player.wingAngle + player.sideTilt);
        translate(createVector(30, 0, 0));
        box(60, 2, 35);
        pop();

        push();
        ambientMaterial(255);
        noStroke();
        fill(150, 200, 255);
        translate(player.pos);
        rotateY(player.angle.y);
        rotateX(player.angle.x + player.backTilt);
        rotateZ(player.angle.z - player.wingAngle + player.sideTilt);
        translate(createVector(-30, 0, 0));
        box(60, 2, 35);
        pop();

        player.selectedTool.draw();
    }

    rotate(x, y)
    {
        this.verticalAngle = y;
        this.horizontalAngle = x;

        this.forward = createVector
        (
            cos(this.verticalAngle) * sin(this.horizontalAngle),
            sin(this.verticalAngle),
            cos(this.verticalAngle) * cos(this.horizontalAngle)
        );

        this.right = createVector
        (
            sin(this.horizontalAngle - (PI / 2)),
            0,
            cos(this.horizontalAngle - (PI / 2))
        );

        this.up = p5.Vector.cross(this.right, this.forward);
    }

    onUseButton()
    {

        if(this.interactTarget != -1)
        {

            if((millis() - this.lastToolUseTime) > player.selectedTool.useSpeed)
            {
                console.log("XD");
                this.interactTarget.onUse(player.selectedTool);
                this.lastToolUseTime = millis();
            }

        }

    }

    onLeftClick()
    {

        if(this.interactTarget != -1)
        {

        }

    }

}
