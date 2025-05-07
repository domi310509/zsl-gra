
function show_players(first=0){
for(let i=0;i<4;i++){
    document.getElementById("player"+i).innerHTML = ("Imie:" + players[first].name +"<br>Rok:"+ players[first].year+"<br>Ilość quizów zrobionych:"+ 
    players[first].quizesDone +"<br>W jakim pokoju jest:"+ players[first].currentRoom);
    first++
    if(first==4){
        first=0;
    }    
}    
}