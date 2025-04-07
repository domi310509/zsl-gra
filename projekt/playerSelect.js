function startCharacterSelection() {
  document.getElementById("creators-modal").remove();
  document.getElementById("menu").remove();

  document.getElementById("character-select").style.visibility = "visible";
}
  const container = document.getElementById("character-container");
  const addBtn = document.getElementById("addCharacter");
  let characterCount = 2;

  addBtn.addEventListener("click", () => {
    if (characterCount >= 4) return;
    characterCount++;

    const newSlot = document.createElement("div");
    newSlot.classList.add("character-slot");
    newSlot.innerHTML = `
                    <label>Postać ${characterCount}:</label>
                    <select>
                        <option>Programista</option>
                        <option>Informatyk</option>
                        <option>Robotyk</option>
                        <option>Fotograf</option>
                    </select>
                `;
    container.appendChild(newSlot);

    if (characterCount === 4) {
      addBtn.disabled = true;
      addBtn.innerText = "Osiągnięto limit postaci";
    }
  });
