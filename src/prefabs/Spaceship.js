class Spaceship extends Phaser.GameObjects.Sprite 
{
    constructor(scene,x,y,texture,frame,pointValue)
    {
        super(scene, x , y ,texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.active = true;
        this.multiplayer = false;
        this.keyInput;
    }

    update()
    {
        this.x -= this.moveSpeed;

        if (this.x <= 0 - this.width && this.multiplayer == false)
        {
            this.reset();
        }
        if (this.x <= 0 - this.width && this.multiplayer == true )
        {
            this.active = false;
        }
        this.handleInput();

    }
    reset()
    {
        if (this.multiplayer == false)
        {
            this.x = game.config.width;
        }
        this.active = true;
    }

    handleInput()
    {
        if (this.active==false && this.keyInput != null && this.keyInput.isDown)
        {
            this.reset();
        }
    }
}