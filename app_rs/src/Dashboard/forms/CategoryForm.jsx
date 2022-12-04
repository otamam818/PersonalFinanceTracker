function CategoryForm () {
  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}>
      <label>
        <span>Name</span>
        <input type="text" />
      </label>
      <label>
        <span> Description </span>
        <input type="text" />
      </label>
      <label> 
        <span> Subcategories </span>
        <input type="text" />
      </label>
    </form>
  )
}

export default CategoryForm;
