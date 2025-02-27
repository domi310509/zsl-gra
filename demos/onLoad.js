function getWidthAndHeightOfParent(child){
    if(!(child instanceof Node)){
        throw new Error("Wrong type of argument");
    }
    let parent = child.parentElement;
    return [parent.clientWidth, parent.clientHeight];
}

//style append for dialog
let head = document.head;
let [dialogParentWidth, dialogParentHeight] = getWidthAndHeightOfParent(document.getElementById("game_window"));
// ${stosunekZdjecia * wczesniejObliczonaWartosc * ilePixeliMaParent} x = 1/4
let x = 1/3;
let style = `<style>
        .quiz_section{
            display: flex;
            height: 15vh;
            width: 23vw;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            font-size: calc(4vw + 4vh + 2vmin);
        }

        .dialog{
            width: 100%;
            height: 100%;
        }

        .dialog_text{
            position: absolute;
            align-items: center;
            text-align: center;
            width: ${1.5 * x *dialogParentWidth}px;
            height: ${1 * x * dialogParentHeight}px;
            left: 20vw;
            background-color: pink;
            top: 2vh;
            overflow: hidden;
            font-size: calc(4vw + 4vh + 2vmin);
        }

        .dialog_responses{
            position: absolute;
            width: 50%;
            height: 30vh;
            left: 20vw;
            background-color: blueviolet;
            top: 41vh;
        }

        .dialog_img{
            position: absolute;
            width: 30vh;
            height: 40vh;
            top: 31vh;
            left: 1vw;
            background-color: aquamarine;
        }
    </style>
    `;

head.innerHTML += "\n"+style;