class player{
    constructor(name, type, year){
        this.name = name;
        this.type = type;
        this.year = year;
        this.quizesDone = [];
    }
}

function nextPlayer(){
    console.log("Nastepny gracz")
}

function hasCompletedAllQuizzes(player, allQuizIds) {
    return allQuizIds.every(quizId => player.quizesDone.hasOwnProperty(quizId));
}
