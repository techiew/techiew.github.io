
var pollencount = 0;

// var flowers =
// {
//     "0": "Lilylion",
//
//     textures:
//     {
//         "0": tex_lilylion,
//     }
//
// };

var flowerbeds = [];

class Flower
{

    constructor(pos, type)
    {

    }

}

class Flowerbed
{

    constructor(pos, tileWidth, tileHeight, tileDepth, flowerbedCols, flowerbedMap)
    {
        this.pos = pos;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tileDepth = tileDepth;
        this.flowerbedCols = flowerbedCols;
        this.flowerbedMap = flowerbedMap;
        this.health = 100;
        this.lastInteractTime = 0;
        this.regenerating = true;
        this.empty = false;
        this.iSphere = new ISphere(this, tileWidth * flowerbedCols);
        addInteractable(this.iSphere);
        this.flowers = [];
    }

    draw()
    {
        let row = 0;
        let col = 0;

        for(let i = 0; i < this.flowerbedMap.length; i++)
        {

            if(i % this.flowerbedCols == 0)
            {
                col += 1;
                row = 0;
            }

            let flower = this.flowerbedMap[i];

            push();
            let healthOffset = ((this.tileHeight * 0.9) - ((this.tileHeight * 0.9) * (this.health / 100)));

            translate
            (
                createVector
                (
                    this.pos.x - ((this.flowerbedCols / 2) - row) * this.tileWidth + this.tileWidth / 2,
                    (this.pos.y - (this.tileHeight - healthOffset) / 2),
                    this.pos.z - (((this.flowerbedMap.length / this.flowerbedCols) / 2) - col) * this.tileDepth - this.tileDepth / 2
                )
            );

            ambientMaterial(255);
            texture(flowers[flower]);
            plane(this.tileWidth, this.tileHeight - healthOffset);
            rotateY(HALF_PI);
            plane(this.tileWidth, this.tileHeight - healthOffset);
            pop();

            row += 1;
        }

    }

    update()
    {
        this.iSphere.update(this.pos);

        if(this.health <= 1)
        {
            this.empty = true;
        }
        else
        {
            this.empty = false;
        }

        if((millis() - this.lastInteractTime) >= 10000)
        {
            this.regenerating = true;
        }
        else
        {
            this.lastInteractTime += 1;
        }

        if(!this.regenerating)
        {
            this.lastInteractTime += 1;
        }
        else
        {

            if(this.health < 100)
            {
                this.health += 0.5;
            }

            if(this.health > 100)
            {
                this.health = 100;
            }

            if(this.health < 1)
            {
                this.health = 1;
            }

        }

    }

    onUse(tool)
    {

        if(!this.empty)
        {
            this.regenerating = false;
            this.lastInteractTime = millis();
            this.health -= tool.power;
            addPollen(new Pollen(this.pos.copy(), 32, player));
            pollencount += 1;
        }

    }

}

function addFlowerbed(flowerbed)
{
    flowerbeds.push(flowerbed);
}

function drawFlowerbeds()
{

    for(let f of flowerbeds)
    {
        f.draw();
    }

}

function updateFlowerbeds()
{

    for(let f of flowerbeds)
    {
        f.update();
    }

}
