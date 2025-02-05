class teacher{
    constructor(teacher){
        this.teacherJsonName = teacher;
        this.teacherName;
        this.teacherImageName;
        this.imagePosition;
        this.numberOfQuestions;
        this.questions;
        this.init()
    }

    init(){
        teacherJson = getJson(this.teacher);
        this.teacherImageName = teacherJson.teacher.imageName;
        this.imagePosition = teacherJson.teacher.position;
        this.numberOfQuestions = teacherJson.numberOfQuestions;
        this.questions = teacherJson.quiz;
    }


    loadDialog(){
        document.getElementById("game_window");
        let dialog = document.createElement("div");
        dialog.className = pass;
    }

}
//style for image
`
position: absolute;
width: 30vw;
height: 30vh;
top: 18vw;
background-size: contain;
background-repeat: no-repeat
`