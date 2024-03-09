import React from "react";
import style from "./Search.module.css";

export default function Search() {
  return (
    <div className={style.container}>
      <h1>Search Items</h1>
      <div className={style.searchBar}>
        <input type="text" placeholder="Search..." />
        <button className={style.searchButton}>Search</button>
      </div>
      <div className={style.filterContainer}>
        <h2>Filter by:</h2>
        <button className={style.filterButton}>Clothes</button>
        <button className={style.filterButton}>
          Room decor
        </button>
        <button className={style.filterButton}>Storage</button>
        <button className={style.filterButton}>
          Kitchenware
        </button>
        <button className={style.filterButton}>Shoes</button>
        <button className={style.filterButton}>
          Textbooks
        </button>
      </div>
    </div>
  );
}