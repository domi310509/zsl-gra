function endScreen(playerWonId){
    const style = document.createElement('style');
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
  
      .modal-box {
        background: white;
        padding: 20px;
        border-radius: 8px;
        background: #8542b5;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        text-align: center;
        font-size: 40px;
      }
    `;
    document.head.appendChild(style);
  
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box">
        Gracz: ${players[playerWonId].name + " wygrał!"}
      </div>
    `;
    document.body.appendChild(overlay);
}