class Animation
{
    constructor(parent, name, frames, loop, spritesheet = null)
    {
        this.parent = parent; //refers to the entity which "owns" the animation
        this.name = name;
        this.frames = frames; //array of info about each frame, such as the position of the frame in spritesheet and the duration of the frame
        this.loop = loop; // true false depending on if it should loop
        this.spritesheet = spritesheet; //Stores spritesheet reference which contains frames for this animation
        this.frameCount = this.frames.length;
        this.currentFrame = 0;
        this.animationTimeout = null;
    }

    play()
    {
        this.parent.currentAnimation.stop();
        this.parent.currentAnimation = this;
        this.currentFrame = 0;
        this.animationTimeout = setTimeout(() => {
            this.nextFrame();
        }, this.frames[this.currentFrame].duration);
    }


    stop()
    {
        if(!this.animationTimeout)
            return;
        clearTimeout(this.animationTimeout);
    }

    nextFrame() //starts a timeout for when its time to switch frame
    {
        this.currentFrame++;
        if(!this.loop && this.currentFrame >= this.frameCount) //0 indexbased currentframe, framecount length is not
        {
            this.parent.onAnimationEnd(this.name);
            return;
        }
        else if(this.currentFrame >= this.frameCount)
        {
            this.currentFrame = 0;
        }

        this.animationTimeout = setTimeout(() => {
            this.nextFrame();
        }, this.frames[this.currentFrame].duration);
    }

    getCurrentFrame()
    {
        return this.frames[this.currentFrame];
    }
}




