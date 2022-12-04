import {useState} from "react";
import "./App.scss";
import Dashboard from "./Dashboard/index";
import WelcomePage from "./WelcomePage/index";

function App() {
  let [currConfig, setConfig] = useState({
    loadPath : "cargo.toml",
    name : "Oisho",
    userData : null,
  });

  // TODO: Change this back to "welcome" when you are done with the component
  let [componentChoice, setComponent] = useState("loadFile");
  currConfig = {...currConfig, setConfig, setComponent};

  return (
    <div className="main-body">
      {chooseCurrComponent(componentChoice, currConfig)}
    </div>
  );
}

function chooseCurrComponent(componentChoice, currConfig) {
  switch (componentChoice) {
    case "welcome" : return <WelcomePage currConfig={currConfig} />;
    case "loadFile" : return <Dashboard currConfig={currConfig} />;
    default: return (<div>404, not found</div>)
  }
}

export default App;
