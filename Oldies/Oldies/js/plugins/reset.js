document.addEventListener("keydown", (e)=>{
    if(e.code === "KeyR" && SceneManager._scene instanceof Scene_Map) {

        for(const child of SceneManager._scene._windowLayer.children) {
           if(child instanceof Window_Message) {
                child.terminateMessage()
                child.contents.clear()
                child.onEndOfText()
                child._textState = null;
                child.pause = false;
           }
        }
        $gameMap._interpreter.terminate()
		
    }
    
})