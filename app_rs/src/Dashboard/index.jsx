import {useEffect, useState} from "react";
import AddingArea from "./AddingArea";
import "./style.scss";
import { allEmpty } from "./dataHandler";
import { invoke } from '@tauri-apps/api/tauri';

function Dashboard ( configs ) {
  // let currConfig = configs.currConfig;
  let [currData, setCurrData] = useState("loading");
  let [chosenForm, setChosenForm] = useState(null);
  let [formShown, setFormShown] = useState(false);

  let currConfig = configs.currConfig

  if (currConfig.userData) {
    let userData = currConfig.userData;
    if (allEmpty(userData)) {
      currData = "empty";
    }
  }

  let renderedContent = [];
  if (currData === "loading") {
    renderedContent.push(<LoadingAnimation />);
  } else if (currData === "empty") {
    renderedContent.push(<EmptyContent />);
  } else {
    // TODO: Handle case where data is rendered
  }
  renderedContent.push(<AddingArea
    setChosenForm={setChosenForm}
    setFormShown={setFormShown}
    currConfig={currConfig}
  />);

  useEffect(() => {
    async function newData () {
      return await invoke("get_mappable", { dataFile: currConfig.userData})
    }

    newData()
      .then((data) => {
        console.log(setCurrData, data);
        currConfig.userData = data;
        currConfig.setConfig(currConfig);
        setCurrData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [configs, setCurrData]);

  return (
    <>
    <div className="dashboard">
      <nav>
        <img src="/Logo.svg" alt="First attempt at a logo" />
        <span>Tracker App</span>
      </nav>
      <main>
        <div className="left-bar"></div>
        <div className="content">
          {renderedContent}
        </div>
      </main>
    </div>
    <div
      className={"pop-up " + (formShown ? "shown" : "hidden")}
      onClick={() => {
        setFormShown(false);
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

export default Dashboard;
