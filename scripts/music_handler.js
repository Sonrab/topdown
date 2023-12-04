function CMusicHandler()
{
    this.soundList = new Map();
    this.loadAudioList();
    this.currentSong = this.soundList.get("overworld");
    //this.currentSong.play(); cant use because of dom interaction required
};


CMusicHandler.prototype.changeAudio = function(name)
{
    if(this.currentSong !== this.soundList.get(name)) //if its not the same song playing
    {
        //reset old currentsong
        this.currentSong.pause();
        this.currentSong.currentTime = 0;

        //set new currentsong
        this.currentSong = this.soundList.get(name);
        this.currentSong.play();
    }
};

CMusicHandler.prototype.addSound = function(name, src, volume, loop)
{
    let song = new Audio(src);
    song.volume = volume;
    if(loop)
        song.loop = true;
    this.soundList.set(name, song);
};

CMusicHandler.prototype.loadAudioList = function()
{
    this.addSound("overworld", "sounds/overworld.mp3", 0.00, true);
    this.addSound("underground", "sounds/underground.mp3", 0.05, true);
};

// var soundList = new Array(); //list to store all sounds for volumecontrol

// var world1 = new Audio("sounds/world1.mp3");
// //world1.loop = true;
// world1.volume = 0.075;