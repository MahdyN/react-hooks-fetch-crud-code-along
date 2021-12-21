import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  const [newItem, setnewItem] = useState({      // We make a new state variable to encompass both the states of the name and category form
                                            name:"",
                                            category:"Produce"
                                                    })

  useEffect(() => { // side-effect is made to GET fetch a list of our items from the server and sets the current state of items to that returned data array to be displayed in our list
    fetch("http://localhost:3000/items")
    .then((response) => response.json())
    .then((listItems) => {
      setItems(listItems)
    })
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleFormChange(event) {  // Whenever these inputs are changed, they will both call this function and based on which target name is changed it will update the state of the object and its value
      setnewItem({
        ...newItem,
        [event.target.name] : event.target.value
      })
  }

  function handleFormSubmit(event) {    // Whenever a form is submitted in ItemForm, the current state of newItem will be spread into a new object with a new key-value pair for isincart, we then use a POST fetch to send this new object to the database, the server will respond with the same item key value pairs but now there is an id based on which item in the database it is, we use this reponse to update our items state to reflect the changes in both our database and in our list
    event.preventDefault();
    const newListItem = {
                          ...newItem,
                          isInCart : false
                                  }
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newListItem)
    })
    .then((response) => response.json())
    .then((newDataItem) => {
      setItems([
        ...items,
        newDataItem
      ])
    })

    setnewItem({
        name:"",
        category:"Produce"
      })
  }

  function handleAddToCart(id, isInCart) {         // Everytime the Add to Cart button is clicked this PATCH request is performed to flip the boolean in isincart and update the list item in the database, we then need to update state for items in our component to reflect this change as the server responds with the updated item object 
    fetch(`http://localhost:3000/items/${id}` , {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(
        {
          isInCart: !isInCart
        }
      )
    })
    .then((response) => response.json())
    .then((updatedItem) => {
      const updatedList = items.map((item) =>{
        if(item.id === updatedItem.id) {
          return updatedItem
        }
        else return item
      })
      setItems(updatedList)
    })
    
  }

  function handleDelete(id) {                          // everytime the delete button is clicked this DELETE request will get rid of the item with the id we passed into the URL, no response is returned but we still 
    fetch(`http://localhost:3000/items/${id}` , {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then(() => {
      const updatedList = items.filter((item) =>{return item.id !== id})
      setItems(updatedList)
    })
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm newItem = {newItem} handleFormChange={handleFormChange} handleFormSubmit={handleFormSubmit} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleAddToCart={handleAddToCart} handleDelete ={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
