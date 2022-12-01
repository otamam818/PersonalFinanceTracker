import {useState} from "react";
import "./style.scss";

function Dashboard ( /* configs */ ) {
  // let currConfig = configs.currConfig;
  let [currData, _] = useState(null);

  let renderedContent = [];
  if (currData === null) {
    renderedContent.push(
      <EmptyContent />
    )
  } else {
    // TODO: Handle case where data is rendered
  }
  renderedContent.push(<AddingArea />);

  return (
    <div className="dashboard">
      <nav>
        <img src="/Logo1.svg" alt="First attempt at a logo" />
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

function AddingArea() {
  return (
    <div>Hello Adding Area</div>
  )
}

export default Dashboard;
