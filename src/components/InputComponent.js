import React from 'react';

export function InputComponent(props) {
  const {index, value, itemCount, addItem, removeItem, updateValue} = props;

  return(
    <div
      className="item-container"
      data-index={index}
    >
      <input
        type="text"
        value={value}
        onChange={updateValue}
        placeholder="Edit me..."
        className="item"
      />
      <button
        className="add-item"
        onClick={addItem}
      >
        <span className="visually-hidden">Add Item</span>
      </button>
      {itemCount > 1 &&
        <button
          className="remove-item"
          onClick={removeItem}
        >
          <span className="visually-hidden">Remove Item</span>
        </button>
      }
    </div>
  );
}