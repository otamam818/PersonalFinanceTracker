import {useState} from "react";
import "./App.scss";
import WelcomePage from "./WelcomePage/index";

function App() {
  let [currConfig, setConfig] = useState({ loadPath : "", name : "Oisho" });
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
    case "loadFile" : return <div>Hello loadFile</div>;
    default: return (<div>404, not found</div>)
  }
}

export default App;
