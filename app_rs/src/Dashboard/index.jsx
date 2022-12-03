import {useState} from "react";
import AddingArea from "./AddingArea";
import "./style.scss";

function Dashboard ( configs ) {
  // let currConfig = configs.currConfig;
  let [currData, _] = useState("loading");

  if (configs.currConfig.userData) {
    let userData = configs.currConfig.userData;
    if (userData.bought_items.length === 0 &&
        userData.category.length     === 0 &&
        userData.items.length        === 0 &&
        userData.receipts.length     === 0 &&
        userData.stores.length       === 0 ) {
      currData = "empty";
    }
  }

  console.log(configs.currConfig.userData);

  let renderedContent = [];
  if (currData === "loading") {
    renderedContent.push(<LoadingAnimation />);
  } else if (currData === "empty") {
    renderedContent.push(<EmptyContent />);
  } else {
    // TODO: Handle case where data is rendered
  }
  renderedContent.push(<AddingArea />);

  return (
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
