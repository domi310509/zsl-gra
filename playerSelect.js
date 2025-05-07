class playerSelect{
  loadDOM(){
    document.head.innerHTML += `<style id='playerSelectStyle'>body {
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    height: 100vh;
    overflow: hidden;
  }

#menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

button {
    background-color: #a650f6;
    color: white;
    border: none;
    padding: 15px 30px;
    margin: 10px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 8px;
}

button:hover {
    background-color: #c38ff8;
}

#creators-modal {
    font-size: 30px;
    width: 300px;
    height: 400px;
    display: none;
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.modal-content ul {
    list-style: none;
    padding: 0;
}

#character-select{
    visibility: hidden;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    color: black;
    padding: 30px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    width: 300px;
    font-size: 16px;
}

#character-select h2 {
    margin-bottom: 20px;
}

#character-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.character-slot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    border: 2px solid #a650f6;
}

.character-slot select {
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #a650f6;
    border-radius: 8px;
    font-size: 16px;
}

button#addCharacter{
    background-color: #a650f6;
    color: white;
    padding: 12px 25px;
    margin-top: 20px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
}

button#addCharacter:hover {
    background-color: #c38ff8;
}

button#addCharacter:disabled {
    background-color: #d3b0f7;
    cursor: not-allowed;
}
button#startGame{
    background-color: #a650f6;
    color: white;
    padding: 12px 25px;
    margin-top: 20px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
}</style>`
    document.getElementById('playerSelectMenu').innerHTML = `    <div id="menu"></div>

    <div id="creators-modal"></div>

    <div id="character-select"></div>`
    document.getElementById('character-select').innerHTML = `<h2>Wybierz postacie</h2>
        <div id="character-container">
          <div class="character-slot">
            <label>Gracz 1:</label>
            <select id='1'>
              <option>Programista</option>
              <option>Informatyk</option>
              <option>Robotyk</option>
              <option>Fotograf</option>
            </select>
          </div>
          <div class="character-slot">
            <label>Gracz 2:</label>
            <select id='2'>
              <option>Programista</option>
              <option>Informatyk</option>
              <option>Robotyk</option>
              <option>Fotograf</option>
            </select>
          </div>
          <div class="character-slot">
            <label>Gracz 3:</label>
            <select id='3'>
              <option>Programista</option>
              <option>Informatyk</option>
              <option>Robotyk</option>
              <option>Fotograf</option>
            </select>
          </div>
          <div class="character-slot">
            <label>Gracz 4:</label>
            <select id='4'>
              <option>Programista</option>
              <option>Informatyk</option>
              <option>Robotyk</option>
              <option>Fotograf</option>
            </select>
          </div>
        </div>
        <button id="startGame" onclick="startGame()">Start</button>`;
    document.getElementById('creators-modal').innerHTML = `      <div class="modal-content">
          <h2>Twórcy gry</h2>
          <ul>
            <li>Dominik Adamczyk</li>
            <li>Bolesław Biliński</li>
            <li>Ksawery Czyż</li>
            <li>Wojciech Gostyński</li>
          </ul>
          <button onclick='document.getElementById("creators-modal").style.display = "none";'>Zamknij</button>
        </div>`;
    
    document.getElementById('menu').innerHTML = `      <h1>ZSŁ GRA</h1>
        <button onclick='document.getElementById("creators-modal").remove();document.getElementById("menu").remove();document.getElementById("character-select").style.visibility = "visible";'>Start</button>
        <button onclick='document.getElementById("creators-modal").style.display = "block";'>Twórcy</button>`;
  }
}

function startGame(){
  let persons = []
  for(let i = 1; i<5; i++){
    persons[i-1] = document.getElementById(i).options[document.getElementById(i).selectedIndex].value;
  }
  document.getElementById("playerSelectStyle").remove();
  document.body.innerHTML = `<div class="row">
        <div class="game" id="game_window">
        </div>
        <div class="column">
            <div class="stats" id="player0">
                Statystyki
            </div>
            <div class="map" id="map">
                Mapa
            </div>
        </div>
    </div>
    <div class="row">
        <div class="player" id="player1">
            Gracz 1
        </div>
        <div class="player" id="player2">
            Gracz 2
        </div>
        <div class="player" id="player3">
            Gracz 3
        </div>
    </div>`;
    invokeMap(0);
  console.log(persons)
}
