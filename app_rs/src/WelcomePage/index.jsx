import { open } from '@tauri-apps/api/dialog';

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
    <div className="welcome-message">
      <h1>{name}</h1>
      <p>{greeting} What would you like to do?</p>

      <div className="options">
        <button className="create">
          Create a new finance-tracker file
        </button>

        <button className="load" onClick={() => handleLoad(configs)}>
          Load an existing finance-tracker file
        </button>
      </div>

      <p><strong>Note</strong> A finance-tracker file is the file that will keep track of all your finances</p>
      {feedback}
    </div>
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
  configs.currConfig.setComponent("loadFile");
  configs.currConfig.setConfig(configs.currConfig);
}

export default WelcomePage;

