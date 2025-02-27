class teacher{
    constructor(teacherName, teacherImageName, imagePosition, numberOfQuestions, questions){
        this.teacherName = teacherName;
        this.teacherImageName = teacherImageName;
        this.imagePosition = imagePosition;
        this.numberOfQuestions = numberOfQuestions;
        this.questions = questions;
        this.currentQuestion = 0;
        this.currentCorrectAnswer;
    }

    loadDialogDOM(){
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
                    <div class="row">
                        <section class="quiz_section" id="answer1" onClick="answer(1)">Opcja 1</section>
                        <section class="quiz_section" id="answer2" onClick="answer(2)">Opcja 2</section>
                    </div>
                    <div class="row">
                        <section class="quiz_section" id="answer3" onClick="answer(3)">Opcja 3</section>
                        <section class="quiz_section" id="answer4" onClick="answer(4)">Opcja 4</section>
                    </div>
            </div>`
        document.getElementById("game_window").appendChild(dialog);
    }

    quiz(i){ //not scaling function
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
        console.log("Poprawna odpowiedź: ", this.currentCorrectAnswer)
    }

    quizHandler(i){
        if(i == this.currentCorrectAnswer){
            console.log("Dobra odpowiedź!!!! (", i, ")")
            this.currentQuestion++;
            if(this.currentQuestion < this.numberOfQuestions){
                this.quiz(this.currentQuestion);
            } else {
                this.quizDone();
            }
        }else{
            console.log("Zła odpowiedź (", i, ")")
        }
    }

    quizDone(){
        console.log("done");
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
    if(teacherName == "debug"){
        return new teacher("Imie nauczyciela", "./pobrane.jpg", [0, 0], 2, [ // name, image file name, pixel position, number of questions
            ["Czy ten kod jest super?", "Tak", ["Nie", "Może", "Niezbyt"]], // question, correct answer, [wrong answers]
            ["Czy ten kod nie jest super?", "Nie",  ["Tak", "Może", "Niezbyt"]] 
        ])
    }
}