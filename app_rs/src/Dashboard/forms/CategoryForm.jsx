import {useRef} from 'react';
// import { invoke } from '@tauri-apps/api/tauri';

function CategoryForm ( { setFormShown } ) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleSubmit () {
    console.log(nameRef.current.value, descriptionRef.current.value)
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
