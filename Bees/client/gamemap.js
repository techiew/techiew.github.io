
class GameMap
{

    constructor()
    {
        this.mapWidth = 5000;
        this.mapHeight = 5000;
        this.numTiles = 1;
        this.tileWidth = this.mapWidth / this.numTiles;
        this.tileHeight = this.mapHeight / this.numTiles;
        this.addObjects();
    }

    addObjects()
    {
        this.cBox = new CBox(this.mapWidth, 1, this.mapHeight);
        this.cBox.update(createVector(0, 0, 0));
        addCollideable(this.cBox);

        addFlowerbed(new Flowerbed(createVector(500, 0, 500), 64, 64, 64, 3,
        [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ]
        ));

        addFlowerbed(new Flowerbed(createVector(-500, 0, -500), 64, 64, 64, 10,
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
        ));
    }

    draw()
    {
        for(let x = 0; x < this.numTiles; x++)
        {

            for(let z = 0; z < this.numTiles; z++)
            {
                push();
                translate(createVector((this.tileWidth * x) - (this.mapWidth / 2) + this.tileWidth / 2, 0, (this.tileWidth * z) - (this.mapWidth / 2) + this.tileHeight / 2));
                ambientMaterial(255);
                rotateX(HALF_PI);
                texture(tex_grass);
                plane(this.tileWidth, this.tileHeight);
                pop();
            }

        }

        push();
        translate(0, -100, 0);
        rotateX(angle);
        rotateY(angle * 0.2);
        rotateZ(angle * 0.5);
        normalMaterial();
        box(100, 100);
        pop();

        push();
        translate(500, -250, 100);
        ambientMaterial(255);
        fill(100, 0, 0);
        box(500, 500, 500);
        pop();

        drawFlowerbeds();
    }

}
