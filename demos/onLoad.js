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
let avg = dialogParentHeight+dialogParentWidth/2;
