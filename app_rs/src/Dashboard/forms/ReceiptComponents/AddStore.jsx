/**
 * @fileoverview The component that lets the user add a new store to the file
 */
import {invoke} from "@tauri-apps/api";
import {useRef} from "react";
import {updateButtons} from "./StoreDropdown";
import { setUserData } from '../../../stateController/userData';
import { useSelector, useDispatch } from 'react-redux';

function AddStore( { setters, dateRef } ) {
  const nameRef = useRef(null)
  const locationRef = useRef(null)
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.data);

  return (
    <div className="add-store"> 
      <div>
        <span>Name:</span>
        <input type="text" ref={nameRef} placeholder="required" />
      </div>
      <div>
        <span>Location:</span>
        <input type="text" ref={locationRef} placeholder="optional" />
      </div>
      <button
        className="form-button"
        onClick={() =>{
          handleSubmit(
            userData,
            nameRef.current.value,
            locationRef.current.value,
            setters,
            dispatch
          );
          dateRef.current.focus();
          nameRef.current.value = "";
          locationRef.current.value = "";
      }}> Add </button>
    </div>
  )
}

async function handleSubmit(userData, name, location, setters, dispatch) {
  if (name.length === 0) {
    return;
  }

  userData
    = await invoke(
      "append_store",
      {
        dataMap: userData,
        name,
        location
      });
  dispatch(setUserData(userData));
  updateButtons(userData).then((list) => {
    setters.setRenderedButtons(list);
    setters.setStoreValue(name);
  });
}

export default AddStore;
