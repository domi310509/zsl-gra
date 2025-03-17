class mapClass{
    constructor(){
        //roomId, [x, y], arrows
        //arrows [[x, y, direction, roomId], ...] (direction: 0 - up, 1 - right, 2 - down, 3 - left)
        self.rooms = [
            ["room0", [20, 20], [[86, 67, 1, 1]]],
            ["room1", [60, 20], [[86, 67, 1, 0]]]
        ];
        self.currentRoom = 0;
        self.playersInRooms = [[0, 1]]; //[playerId, roomId]
    }

    gotoRoom(roomId){
        document.getElementById("room").remove();
        this.viewRoom(roomId);
        for(let i = 0; i < self.playersInRooms.length; i++){
            if(self.playersInRooms[i][1] === roomId){
                this.viewPlayer(self.playersInRooms[i][0]);
            }
        }
        this.addArrows();
    }

    viewRoom(roomId){
        let imgEle = document.createElement("div");
        imgEle.className = self.rooms[roomId][0];
        imgEle.id = "room";
        self.currentRoom = roomId;
        document.getElementById("game_window").appendChild(imgEle);
    }

    viewPlayer(playerId){
        let playerSpriteEle = document.createElement("div");
        playerSpriteEle.className = "player" + playerId;
        let [x, y] = self.rooms[self.currentRoom][1];
        playerSpriteEle.style = `position: absolute; left: ${x}%; top: ${y}%`;
        document.getElementById("room").appendChild(playerSpriteEle);
    }

    addArrows(){
        let arrows = self.rooms[self.currentRoom][2];
        for(let i = 0; i < arrows.length; i++){
            let arrowEle = document.createElement("div");
            arrowEle.className = "arrow";
            let [x, y, direction, roomId] = arrows[i];
            arrowEle.style = `position: absolute; left: calc(70vw * ${x}/100); top: calc(70vh * ${y}/100); transform: rotate(${90 * direction}deg)`;
            arrowEle.onclick = () => {
                this.gotoRoom(roomId);
            };
            document.getElementById("room").appendChild(arrowEle);
        }
    }
}