import {useRef} from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { setUserData } from '../../stateController/userData';
import { useSelector, useDispatch } from 'react-redux';
import { clearOverlay } from '../../stateController/dashboard';

function CategoryForm ( { formIsShown } ) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.data);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleSubmit () {
    let name = nameRef.current.value;
    let description = descriptionRef.current.value;
    async function updateConfig() {
      return await invoke(
        "append_category",
        {
          dataMap: userData,
          name,
          description
        }
      );
    }

    updateConfig()
      .then((data) => {
        dispatch(setUserData(data));

        // Clear the CategoryForm
        nameRef.current.value = "";
        descriptionRef.current.value = "";

        // Close the CategoryForm
        formIsShown.set(false);
        // TODO: Give a message that the value has been added
      })
  }

  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Category </h1>
      <label>
        <span>Name</span>
        <input type="text" ref={nameRef}/>
      </label>
      <label>
        <span> Description </span>
        <textarea rows={5} ref={descriptionRef}></textarea>
      </label>
      <label> 
        <span> Subcategories </span>
        <div className="form--box">
        </div>
      </label>

      <div className="button-area">
        <button className="options--button" onClick={() => handleSubmit()}> Submit </button>
        <button className="options--button" onClick={() => dispatch(clearOverlay())}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CategoryForm;
