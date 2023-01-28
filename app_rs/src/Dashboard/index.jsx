import {useEffect, useState} from "react";
import AddingArea from "./AddingArea";
import "./style.scss";
// TODO: Migrate this into a function called in the back-end
import { invoke } from '@tauri-apps/api/tauri';
import { makeState } from "../utils";
import { Save } from 'react-feather';
import { useSelector } from 'react-redux';
import {loadStates} from "../stateController/userData";

function Dashboard ( configs ) {
  let [chosenForm, setChosenForm] = useState(null);
  let formIsShown = makeState(false);
  const loadState = useSelector(state => state.userData.loadState);

  let currConfig = configs.currConfig;
  const userData = useSelector(state => state.userData);
  console.log({userData, loadState});

  // NOTE: `renderedContent` shouldn't actually exist like this. Instead it
  //       should be its own component
  // TODO: Make a separate component for `renderedContent`
  // Handle what rendered content to put at the center of the Dashboard
  let renderedContent = [];
  if (loadState === loadStates.isLoading) {
    renderedContent.push(<LoadingAnimation key={"LA"} />);
  } else if (loadState === loadStates.isEmpty) {
    // TODO: This never renders - consider removing?
    renderedContent.push(<EmptyContent key={"EC"} />);
  } else {
    // TODO: Handle case where data is rendered
  }

  renderedContent.push(<AddingArea
    key={"AA"}
    setChosenForm={setChosenForm}
    formIsShown={formIsShown}
    currConfig={currConfig}
  />);

  return (
    <>
    <div className="dashboard">
      <nav>
        <div className="left">
          <img src="/Logo.svg" alt="First attempt at a logo" />
          <span>Tracker App</span>
        </div>
        <div className="right">
          <button onClick={() => handleSave(currConfig)}>
            <Save color="white" />
          </button>
        </div>
      </nav>
      <main>
        <div className="left-bar"></div>
        <div className="content">
          {renderedContent}
        </div>
      </main>
    </div>
    <div
      className={"pop-up " + (formIsShown.get ? "shown" : "hidden")}
      onClick={() => {
        formIsShown.set(false);
        setChosenForm(null);
      }}
    >
      {chosenForm}
    </div>
    </>
  );
}

function EmptyContent() {
  return (
    <div className="empty-content">
      <span className="main-message">Nothing to show here</span>
      <span className="comment">Add an item from the options below</span>
    </div>
  );
}

function LoadingAnimation() {
  return (
    <div className="loading">Loading data...</div>
  )
}

async function handleSave(currConfig) {
  await invoke("save_file", {
    dataMap: currConfig.userData,
    filePath: currConfig.loadPath
  });
}

export default Dashboard;
