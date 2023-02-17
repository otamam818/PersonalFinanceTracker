import OverlayComponent from "./OverlayComponent";
import LeftBar from './LeftBar';
import FeatureContent from "./features/FeatureContent";

import { invoke } from '@tauri-apps/api/tauri';
import { Save } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { clearOverlay } from '../stateController/dashboard';

import "./style.scss";

function Dashboard () {
  const dispatch = useDispatch();
  const overlayChoice
    = useSelector(state => state.dashboard.overlayComponent);

  const userData = useSelector(state => state.userData.data);
  const filePath = useSelector(state => state.configuration.filePath);

  return (
    <>
    <div className="dashboard">
      <nav>
        <div className="left">
          <img src="/Logo.svg" alt="First attempt at a logo" />
          <span>Tracker App</span>
        </div>
        <div className="right">
          <button onClick={() => handleSave(userData, filePath)}>
            <Save color="white" />
          </button>
        </div>
      </nav>
      <main>
        <LeftBar />
        <div className="content">
          <FeatureContent />
        </div>
      </main>
    </div>
    <div
      className={"pop-up " + ((overlayChoice !== null) ? "shown" : "hidden")}
      onClick={() => dispatch(clearOverlay())}
    >
      <OverlayComponent dataInput={overlayChoice} />
    </div>
    </>
  );
}

async function handleSave(dataMap, filePath) {
  await invoke("save_file", {
    dataMap,
    filePath
  });
}

export default Dashboard;
