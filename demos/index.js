let main = getTeacher("debug");
main.loadDialogDOM();
main.quiz(0);
let answer = function(i){
    main.quizHandler(i);
};

//style for image
a = `
position: absolute;
width: 30vw;
height: 30vh;
top: 18vw;
background-size: contain;
background-repeat: no-repeat
`