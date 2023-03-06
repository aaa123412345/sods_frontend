import "./HTP.css";
import rarea from './images/rarea.png';
function HTP({ BTM }) {

    
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          
          <div className="title">
            <h1 >How To Play Candy Crush like Game</h1>
          </div>
          <div className="body">
            <img src={rarea} alt="Replaced Area" ></img>
            <div> Replaced Area from Cross to Rectangle </div>
            <div> Blue: Square being dragged</div>
            <div> Red: Squares that can be Replaced </div>
            <div></div>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                BTM();
              }}
              id="cancelBtn"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default HTP;