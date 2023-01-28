import { useSelector } from 'react-redux';

import WelcomePage from "./WelcomePage/index";
import Dashboard from "./Dashboard/index";
import "./App.scss";

function App() {
  const componentChoice
    = useSelector(state => state.configuration.bodyComponent);

  return (
    <div className="main-body">
      {chooseCurrComponent(componentChoice)}
    </div>
  );
}

function chooseCurrComponent(componentChoice) {
  switch (componentChoice) {
    case "welcome" : return <WelcomePage/>;
    case "loadFile" : return <Dashboard />;
    default: return (<div>404, not found</div>)
  }
}

export default App;
