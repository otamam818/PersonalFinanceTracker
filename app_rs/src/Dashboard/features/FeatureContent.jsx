import History from "./History";
import AddingArea from "../AddingArea";

import { useSelector } from 'react-redux';
import {loadStates} from "../../stateController/userData";
import {selectedSections} from "../../stateController/dashboard";

function FeatureContent() {
  return (
    <>
      <CurrentContent />
      <AddingArea />
    </>
  )
}

function CurrentContent() {
  const loadState = useSelector(state => state.userData.loadState);
  switch (loadState) {
    case loadStates.isLoading: return <LoadingAnimation />
    case loadStates.hasLoaded:
      // At this point, the important thing to consider is the user's
      // currently-chosen section
      return <SelectedSection />
  }
}

function SelectedSection() {
  const currSelectedSection
    = useSelector(state => state.dashboard.currSelectedSection);
  switch (currSelectedSection) {
    case selectedSections.history: return <History />
    default: return <div>404 not found </div>
  }
}

export default FeatureContent;

