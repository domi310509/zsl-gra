class teacher{
    constructor(teacherName, quizId, teacherImageName, imagePosition, numberOfQuestions, questions){
        this.teacherName = teacherName;
        this.quizId = quizId;
        this.teacherImageName = teacherImageName;
        this.imagePosition = imagePosition;
        this.numberOfQuestions = numberOfQuestions;
        this.questions = questions;
        this.currentQuestion = 0;
        this.sum = 0;
    }

    async loadDialogDOM(){
        let dialog = document.createElement("div");
        dialog.className = "dialog";
        
        let dialogImage = document.createElement("img");
        dialogImage.className = "dialog_img";
        dialogImage.src = this.teacherImageName;

        dialog.appendChild(dialogImage);
        dialog.innerHTML += `
            <div class="dialog_text" id="question">
                Pytanie
            </div>
            <div class="dialog_responses">
                    <section class="quiz_section" id="answer1">Opcja 1</section>
                    <section class="quiz_section" id="answer2">Opcja 2</section>
                    <section class="quiz_section" id="answer3">Opcja 3</section>
                    <section class="quiz_section" id="answer4">Opcja 4</section>
            </div>`
        document.getElementById("game_window").appendChild(dialog);
        for (let i = 1; i <= 4; i++) {
            let answerElement = document.getElementById(`answer${i}`);
            answerElement.addEventListener('click', () => this.answer(i));
        }
    }

    answer(id){
        this.quizHandler(id);
    }

    async quiz(i){ //not scaling function
        let question = document.getElementById("question");
        let answer1 = document.getElementById("answer1");
        let answer2 = document.getElementById("answer2");
        let answer3 = document.getElementById("answer3");
        let answer4 = document.getElementById("answer4");

        question.innerText = this.questions[i][0];
        let answers = shuffle(this.questions[i][2].concat(this.questions[i][1]));
        answer1.innerText = answers[0];
        answer2.innerText = answers[1];
        answer3.innerText = answers[2];
        answer4.innerText = answers[3];
        this.currentCorrectAnswer = answers.indexOf(this.questions[i][1]);
        console.log("Poprawna odpowiedź: ", this.currentCorrectAnswer+1);
    }

    async quizHandler(i){
        if(i == this.currentCorrectAnswer+1){
            console.log(`Dobra odpowiedź!!!! (${i})`);
            this.sum++;
        }else{
            console.log(`Zła odpowiedź (${i})`);
        }
        this.currentQuestion++;
        if(this.currentQuestion < this.numberOfQuestions){
            this.quiz(this.currentQuestion);
        } else {
            this.quizDone();
        }
    }

    async quizDone(){
        console.log("done");
        let avg = this.sum/this.numberOfQuestions*100;
        currentPlayer().quizesDone[this.quizId] = avg;
        document.getElementById("question").innerHTML = `Brawo. Zdałeś test na ${avg}%`;
        document.querySelector(".dialog_responses").innerHTML = "";
        await delay(2000);
        document.getElementsByClassName("dialog")[0].remove();
    }
}

function shuffle(array) { // great shuffle algorithm (not mine)
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function getTeacher(teacherName){
    switch (teacherName){
        case "debug": {
            return new teacher("Imie nauczyciela", 1, "images/pobrane.jpg", [0, 0], 2, [ // name, image file name, pixel position, number of questions
                ["Czy ten kod jest super?", "Tak", ["Nie", "Może", "Niezbyt"]], // question, correct answer, [wrong answers]
                ["Czy ten kod nie jest super?", "Nie",  ["Tak", "Może", "Niezbyt"]]
            ]);
        }
        case 0: {
            return new teacher("Śmieć", 1, "images/pobrane.jpg", [0, 0], 2, [
                ["Poprawna odpowiedź to 12", "12", ["11", "10", "2"]],
                ["Poprawna odpowiedź to 23", "23", ["22", "12", "43"]]
            ])
        }
    }
}