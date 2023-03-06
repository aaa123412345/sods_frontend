import "./Menu.css";
function Menu({setMenuOpen,StartNewGame,setHTPOpen }) {

    
    return (
      <div className="modalBackground">
        <div className="modalContainer">
        <div className="title">
            <h1 >Main Menu</h1>
          </div>
          <div className="body">
          <button id="htp" onClick={()=>{setMenuOpen(false);setHTPOpen(true);}}>How To Play</button>
            <div>Choose Difficulties:</div>
            <button id="easy" onClick={()=>{StartNewGame(15); setMenuOpen(false);}}>Easy</button>
            <button id="normal" onClick={()=>{StartNewGame(19); setMenuOpen(false);}}>Normal</button>
            <button id="hard" onClick={()=>{StartNewGame(50); setMenuOpen(false);}}>Hard</button>
          </div>
          
        </div>
      </div>
    );
  }
  
  export default Menu;