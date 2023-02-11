import React, { useState, useEffect } from "react";
import Category from "./category";
import Product from "./product";
import "./style.css"
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <div className="container">
      <Product/>
      <Category/>
    </div>
  );
}

export default App;
