import {useRef} from 'react';
import { invoke } from '@tauri-apps/api/tauri';

function CategoryForm ( { setFormShown, currConfig } ) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleSubmit () {
    let name = nameRef.current.value;
    let description = descriptionRef.current.value;
    console.log(currConfig);
    async function updateConfig() {
      return await invoke(
        "append_category",
        {
          dataMap: currConfig.userData,
          name,
          description
        }
      );
    }

    updateConfig()
      .then((data) => {
        currConfig.setConfig({ ...currConfig, userData: data });
        // Close the CategoryForm
        nameRef.current.value = "";
        descriptionRef.current.value = "";
        setFormShown(false);
        // TODO: Give a message that the value has been added
        // TODO: Close the CategoryForm
        // TODO: Close the CategoryForm
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
        <button onClick={() => handleSubmit()}> Submit </button>
        <button onClick={() => setFormShown(false)}> Cancel </button>
      </div>
    </form>
  )
}

export default CategoryForm;
