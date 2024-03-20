import './style.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


function PPage() {
  const location = useLocation();


  
  const addToCart = (item) => {
   // Parse any JSON previously stored in allEntries
   var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
   if(existingEntries == null) existingEntries = [];
   localStorage.setItem("entry", JSON.stringify(item.id));
   // Save allEntries back to local storage
   existingEntries.push(item.id);
   localStorage.setItem("allEntries", JSON.stringify([...new Set(existingEntries)]));
  }

 
  
  return (
    <React.Fragment>
      {/* <label>
        Pick your Quantity:
        <select name="selectedFruit">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </label> */}

      <button type="button" class="buy" onClick={() => addToCart(location.state.pro)}>
        Add To Cart
      </button>
    </React.Fragment>
  );
}

export default PPage;