import { open, save } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api/tauri';
import { setFilePath, setBodyComponent } from '../stateController/config';
import { setUserData, setLoadState, loadStates } from '../stateController/userData';

export async function handleLoad (dispatch) {
  let filePath = await open({
    multiple: false,
    filters: [{
      name: 'TOML File',
      extensions: ['toml']
    }]
  });
  let userData = await invoke("load_file", { path: filePath });

  // NOTE: This stage should actually only happen once the Dashboard
  //       component is loaded
  userData = await invoke("get_mappable", { dataFile: userData });
  goToDashboard(userData, filePath, dispatch);
}

export async function handleSave(dispatch){
  let filePath = await save({
    title: "Choose path and filename",
    filters: [{
      name: "TOML file",
      extensions: ['toml']
    }]
  });

  if (!filePath.endsWith(".toml")) {
    filePath += ".toml";
  }

  await invoke("make_file", {location: filePath});
  let userData = await invoke("load_file", { path: filePath });

  goToDashboard(userData, filePath, dispatch)
}

function goToDashboard(userData, filePath, dispatch) {
  dispatch(setFilePath(filePath));
  dispatch(setUserData(userData));
  dispatch(setBodyComponent("loadFile"));
  dispatch(setLoadState(loadStates.hasLoaded));
}

