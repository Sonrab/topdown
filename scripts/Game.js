class Game
{
    constructor()
    {
        this.musicPlayer = new MusicHandler();
        this.userInterface;
        this.loop;
        this.isPaused = false;
        this.targetFPS = 40;
    }

    setup()
    {
        upgradeList = new UpgradeList();
        loadMaps();
        
        tileHandler = new TileHandler(); //create tilehandler object
        
        renderer = new Renderer();
        player = new Player(); // Create player object
        userInterface = new UserInterface();
        mapHandler = new MapHandler(maps.get("start"), {x : 11, y : 21}); //create maphandler object
        updateEnd = performance.now();
        requestAnimationFrame(renderer.renderScreen);
    }

    start()
    {
        this.loop = setInterval(run, (1000/this.targetFPS));
    }

    pause()
    {
        this.isPaused = true;
        blackScreen.classList.toggle('show-blackscreen');
        clearInterval(this.loop);
    }

    unpause()
    {
        this.isPaused = false;
        blackScreen.classList.toggle('show-blackscreen');
        this.start();
    }
}