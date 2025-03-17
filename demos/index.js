/*
let main = getTeacher("debug");
main.loadDialogDOM();
main.quiz(0);
let answer = function(i){
    main.quizHandler(i);
};
*/

function updateStats(players){
    for(let i = 0; i < players.length; i++){
        document.getElementById(`player${i}`).innerHTML = players[i].name + ": " + players[i].year;
    }
}

let players = [new player("abc", 0), new player("def", 0), new player("ghi", 0), new player("jkl", 0)];
currentPlayer = 0;
let map = new mapClass();
map.viewRoom(0);
map.viewPlayer(0);
map.addArrows();
updateStats(players);