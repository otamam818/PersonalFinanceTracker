function CategoryForm ( { setFormShown } ) {
  console.log(setFormShown);
  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Category </h1>
      <label>
        <span>Name</span>
        <input type="text" />
      </label>
      <label>
        <span> Description </span>
        <textarea rows={5}></textarea>
      </label>
      <label> 
        <span> Subcategories </span>
        <div className="form--box">
        </div>
      </label>

      <div className="button-area">
        <button> Submit </button>
        <button onClick={() => setFormShown(false)}> Cancel </button>
      </div>
    </form>
  )
}

export default CategoryForm;
