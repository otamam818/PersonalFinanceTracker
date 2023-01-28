import {useState} from "react";
import { useSelector } from 'react-redux';

import Dashboard from "./Dashboard/index";
import WelcomePage from "./WelcomePage/index";
import "./App.scss";

function App() {
  // NOTE: This wouldn't be needed anymore once ReduxJS has been set up
  let [currConfig, setConfig] = useState({
    loadPath : "",
    name : "Oisho",
    userData : null,
  });

  const componentChoice = useSelector(state => state.configuration.bodyComponent);
  currConfig = {...currConfig, setConfig};

  return (
    <div className="main-body">
      {chooseCurrComponent(componentChoice, currConfig)}
    </div>
  );
}

function chooseCurrComponent(componentChoice, currConfig) {
  switch (componentChoice) {
    case "welcome" : return <WelcomePage/>;
    case "loadFile" : return <Dashboard currConfig={currConfig} />;
    default: return (<div>404, not found</div>)
  }
}

export default App;
