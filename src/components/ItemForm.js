import React from "react";

function ItemForm({newItem, handleFormChange, handleFormSubmit}) {
  // const [name, setName] = useState("");
  // const [category, setCategory] = useState("Produce");

  return (
    <form className="NewItem" onSubmit = {handleFormSubmit} >
      <label>
        Name:
        <input
          type="text"
          name="name"
          value = {newItem.name}
          onChange = {handleFormChange}
          // value={name}
          // onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value = {newItem.category}
          onChange = {handleFormChange}
          // value={category}
          // onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
