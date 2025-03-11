/*
let main = getTeacher("debug");
main.loadDialogDOM();
main.quiz(0);
let answer = function(i){
    main.quizHandler(i);
};
*/
let players = [new player("1", 0), new player("2", 0), new player("3", 0), new player("4", 0)];
let map = new mapClass();
map.viewRoom(0);
map.addPlayer(0);