import { useSelector, useDispatch } from 'react-redux';
import { handleSave, handleLoad } from './handlers';

function WelcomePage() {
  const userName = useSelector(state => state.configuration.name);
  const [name, greeting] = getGreeting(userName);

  const filePath = useSelector(state => state.configuration.filePath);
  const feedback = getFeedback(filePath);
  const dispatch = useDispatch();

  return (
    <>
    <div className='big-logo'>
      <img src="/Logo.svg" alt="First attempt at a logo" />
      <h1> Finance Tracker </h1>
    </div>
    <div className="welcome-message">
      <h1>{name}</h1>
      <p>{greeting} What would you like to do?</p>

      <div className="options">
        <button className="options--button" onClick={() => handleSave(dispatch)}>
          New file
        </button>

        <button className="options--button" onClick={() => handleLoad(dispatch)}>
          Load file
        </button>
      </div>

      {feedback}
    </div>
    </>
  );
}

function getGreeting(userName) {
  let nameExists = userName?.length > 0;
  let name = "Hello ", greeting = "Welcome ";
  if (nameExists) {
    name += userName
    greeting += "back!"
  } else {
    name += "there";
    greeting += "to the personal finance tracker app!"
  }

  return [name, greeting];
}

function getFeedback(filePath) {
  let feedback;
  if (filePath.length > 0) {
    let fileName = filePath.split('/');
    // TODO: Add support for non-unix
    fileName = fileName[fileName.length - 1];
    feedback = (<p> Loading file <strong>{fileName}</strong></p>)
  }
  return feedback;
}

export default WelcomePage;

