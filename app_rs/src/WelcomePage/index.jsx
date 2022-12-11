import { open, save } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api/tauri';

function WelcomePage(configs) {
  let nameExists = configs.currConfig.name.length > 0;

  let name = "Hello ", greeting = "Welcome ";
  if (nameExists) {
    name += configs.currConfig.name
    greeting += "back!"
  } else {
    name += "there";
    greeting += "to the personal finance tracker app!"
  }

  let feedback;
  if (configs.currConfig.loadPath.length > 0) {
    let fileName = configs.currConfig.loadPath.split('/');
    fileName = fileName[fileName.length - 1];
    feedback = (<p> Loading file <strong>{fileName}</strong></p>)
  }

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
        <button className="create" onClick={() => handleSave(configs)}>
          Create a new finance-tracker file
        </button>

        <button className="load" onClick={() => handleLoad(configs)}>
          Load an existing finance-tracker file
        </button>
      </div>

      <p><strong>Note</strong> A finance-tracker file is the file that will keep track of all your finances</p>
      {feedback}
    </div>
    </>
  );
}

async function handleLoad (configs) {
  configs.currConfig.loadPath = await open({
    multiple: false,
    filters: [{
      name: 'TOML File',
      extensions: ['toml']
    }]
  });

  configs.currConfig.userData = await invoke(
    "load_file",
    { path: configs.currConfig.loadPath }
  );

  configs.currConfig.setComponent("loadFile");
  configs.currConfig.setConfig(configs.currConfig);
}

async function handleSave(configs){
  console.log(configs);
  let chosenName = await save({
    title: "Choose path and filename",
    filters: [{
      name: "TOML file",
      extensions: ['toml']
    }]
  });

  if (!chosenName.endsWith(".toml")) {
    chosenName += ".toml";
  }

  configs.currConfig.loadPath = chosenName;
  await invoke("make_file", {location: chosenName});
  configs.currConfig.userData = await invoke(
    "load_file",
    { path: configs.currConfig.loadPath }
  );
  configs.currConfig.setComponent("loadFile");
  configs.currConfig.setConfig(configs.currConfig);
  console.log(configs.currConfig);
}

export default WelcomePage;

