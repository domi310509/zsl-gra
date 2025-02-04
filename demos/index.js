function getJsonFileSync(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:8000/${filename}`, false);
    try {
        xhr.send();

        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            return data;
        } else {
            throw new Error('Błąd odpowiedzi z serwera');
        }
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
    }
}

function loadDialog(){
    document.getElementById("game_window");
    let dialog = document.createElement("div");
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