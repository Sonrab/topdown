class MusicHandler
{
    constructor()
    {
        this.soundList = new Map();
        this.loadAudioList();
        this.currentSong = this.soundList.get("overworld");
    }

    //this.currentSong.play(); cant use because of dom interaction required
    changeAudio(audioName)
    {
        if(this.currentSong !== this.soundList.get(audioName)) //if its not the same song playing
        {
            //reset old currentsong
            this.currentSong.pause();
            this.currentSong.currentTime = 0;
    
            //set new currentsong
            this.currentSong = this.soundList.get(audioName);
            this.currentSong.play();
        }
    }

    addSound(audioName, src, volume, loop)
    {
        let song = new Audio(src);
        song.volume = volume;
        if(loop)
            song.loop = true;
        this.soundList.set(audioName, song);
    }

    loadAudioList()
    {
        this.addSound("overworld", "sounds/overworld.mp3", 0.05, true);
        this.addSound("underground", "sounds/underground.mp3", 0.05, true);
    }
}