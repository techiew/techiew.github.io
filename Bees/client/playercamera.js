
class PlayerCamera
{

    constructor(sensitivity, startPos, lookAt, dirs)
    {
        this.sensitivity = sensitivity;
        this.pos = startPos;
        this.lookAt = lookAt;
        this.dirs = dirs;
        this.forward = createVector(0, 0, dirs.z);
        this.up = createVector(0, dirs.y, 0);
        this.right = createVector(dirs.x, 0, 0);
        this.horizontalAngle = PI;
        this.verticalAngle = 0;
        this.zoomLevel = 500;
        this.maxZoomLevel = 1000;
        this.minZoomLevel = 125;
    }

    update()
    {
        playerCamera.pos.set(p5.Vector.sub(player.pos, p5.Vector.mult(playerCamera.forward.normalize(), playerCamera.zoomLevel)));
        playerCamera.lookAt.set(player.pos);
        camera(playerCamera.pos.x, playerCamera.pos.y, playerCamera.pos.z, playerCamera.lookAt.x, playerCamera.lookAt.y, playerCamera.lookAt.z, playerCamera.up.x, playerCamera.up.y, playerCamera.up.z);
    }

    rotate(x, y)
    {
        this.verticalAngle += (this.sensitivity * y);
        this.horizontalAngle -= (this.sensitivity * x);

        if(this.verticalAngle >= 1.50)
        {
            this.verticalAngle = 1.50;
        }
        else if(this.verticalAngle <= -1.50)
        {
            this.verticalAngle = -1.50;
        }

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

    get zoomLevel()
    {
        return this._zoomLevel;
    }

    set zoomLevel(newZoom)
    {
        this._zoomLevel = newZoom;

        if(this.zoomLevel > this.maxZoomLevel)
        {
            this.zoomLevel = this.maxZoomLevel;
        }
        else if(this.zoomLevel < this.minZoomLevel)
        {
            this.zoomLevel = this.minZoomLevel;
        }

    }

}
