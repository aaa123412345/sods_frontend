import "./Modal.css";
function Modal({ title,titlecolor,score,passingScore,BTM, PA }) {

    const style = {
        color : titlecolor
      };
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          
          <div className="title">
            <h1 style={style}>{title}</h1>
          </div>
          <div className="body">
            <div>Your Score is {score}</div>
            

            <div>The Passing Score is {passingScore}</div>
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
            <button
            onClick={() => {
                PA();
              }}
            >Play Again</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;