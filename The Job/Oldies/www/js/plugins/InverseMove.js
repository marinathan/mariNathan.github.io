//=================================================================
//Simple Inversing Move
//Created by : Tobi
//=================================================================

//=================================================================
//Usage :
//Just put this file into your project game and active it on Plugin
//Manager
//=================================================================



/*:
* @param Switch
* @desc This is the value of Switch
* @default 1
*/

var params = PluginManager.parameters('InverseMove');
var switch_id = Number(params['Switch'] || 1);



Game_Player.prototype.moveByInputInversed = function() {
    if (!this.isMoving() && this.canMove()) {
        var direction = this.getInputDirection();

        if(direction == 2){
        		direction = 8;
        } else if(direction == 4){
        		direction = 6;
       	} else if(direction == 6){
       			direction = 4;
       	} else if(direction == 8){
       			direction = 2;
       	}

        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if ($gameTemp.isDestinationValid()){
            var x = $gameTemp.destinationX();
            var y = $gameTemp.destinationY();
            direction = this.findDirectionTo(x, y);
        }
        if (direction > 0) {
            this.executeMove(direction);
        }
    }
};

Game_Player.prototype.update = function(sceneActive) {
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    var wasMoving = this.isMoving();
    this.updateDashing();
    if (sceneActive) {
    	if($gameSwitches.value(switch_id) == true){
    		this.moveByInputInversed();
		} else {
			this.moveByInput();	
		}
        
    }
    Game_Character.prototype.update.call(this);
    this.updateScroll(lastScrolledX, lastScrolledY);
    this.updateVehicle();
    if (!this.isMoving()) {
        this.updateNonmoving(wasMoving);
    }
    this._followers.update();
};

