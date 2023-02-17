import {Clock} from "react-feather";
import {useSelector} from "react-redux";

import {selectedSections} from "../../stateController/dashboard";

function LeftBar() {
  let activeState = useSelector(state => state.dashboard.currSelectedSection);
  return (
    <div className="left-bar">
      <Clock color={chooseColor(selectedSections.history, activeState)} />
    </div>
  );
}

function chooseColor(assignedState, activeState) {
  return assignedState === activeState ? "white" : "grey";
}

export default LeftBar;
