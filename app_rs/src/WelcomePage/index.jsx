import { open, save } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api/tauri';
import { useSelector, useDispatch } from 'react-redux';
import { setFilePath, setBodyComponent } from '../stateController/config';
import { setUserData } from '../stateController/userData';

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
        <button className="create" onClick={() => handleSave(dispatch)}>
          Create a new finance-tracker file
        </button>

        <button className="load" onClick={() => handleLoad(dispatch)}>
          Load an existing finance-tracker file
        </button>
      </div>

      <p><strong>Note</strong> A finance-tracker file is the file that will keep track of all your finances</p>
      {feedback}
    </div>
    </>
  );
}

async function handleLoad (dispatch) {
  let filePath = await open({
    multiple: false,
    filters: [{
      name: 'TOML File',
      extensions: ['toml']
    }]
  });
  let userData = await invoke("load_file", { path: filePath });
  goToDashboard(userData, filePath, dispatch);
}

async function handleSave(dispatch){
  let filePath = await save({
    title: "Choose path and filename",
    filters: [{
      name: "TOML file",
      extensions: ['toml']
    }]
  });

  if (!filePath.endsWith(".toml")) {
    filePath += ".toml";
  }

  await invoke("make_file", {location: filePath});
  let userData = await invoke("load_file", { path: filePath });

  goToDashboard(userData, filePath, dispatch)
}

function goToDashboard(userData, filePath, dispatch) {
  dispatch(setFilePath(filePath));
  dispatch(setUserData(userData));
  dispatch(setBodyComponent("loadFile"));
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

