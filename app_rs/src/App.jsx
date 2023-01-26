import {useState} from "react";
import "./App.scss";
import Dashboard from "./Dashboard/index";
import WelcomePage from "./WelcomePage/index";

function App() {
  // NOTE: This wouldn't be needed anymore once ReduxJS has been set up
  let [currConfig, setConfig] = useState({
    loadPath : "",
    name : "Oisho",
    userData : null,
  });

  let [componentChoice, setComponent] = useState("welcome");
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
