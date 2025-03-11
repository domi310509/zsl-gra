class mapClass{
    constructor(){
        self.rooms = [["room0", [20, 20]]];
        self.currentRoom = 0;
    }

    viewRoom(roomId){
        let imgEle = document.createElement("img");
        imgEle.className = self.rooms[roomId][0];
        imgEle.id = "room";
        self.currentRoom = roomId;
        document.getElementById("game_window").appendChild(imgEle);
    }

    addPlayer(playerId){
        let playerSpriteEle = document.createElement("img");
        playerSpriteEle.className = "player" + playerId;
        let [x, y] = self.rooms[self.currentRoom][1];
        console.log(x, y)
        playerSpriteEle.style = `position: absolute; left: ${x}%; top: ${y}%`;
        document.getElementById("room").appendChild(playerSpriteEle);
    }
} //change img to div for map 