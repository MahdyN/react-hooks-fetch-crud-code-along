import React from "react";

function Item({ item, handleAddToCart, handleDelete }) {
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick ={() => handleAddToCart(item.id, item.isInCart) } className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick ={() => handleDelete(item.id)} className="remove">Delete</button>
    </li>
  );
}

export default Item;
