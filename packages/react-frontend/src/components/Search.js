import React, { useState } from "react";
import style from "./Search.module.css";
import ItemsTable from "./ItemsTable";

export default function Search() {
  const [selectedFilter, setSelectedFilter] = useState("");
  return (
    <div id="Search">
      <div className={style.container}>
        <div className={style.filterContainer}>
          <h2>Filter by:</h2>
          <button
            className={style.filterButton}
            onClick={() => setSelectedFilter("")}
          >
            All
          </button>
          <button
            className={style.filterButton}
            onClick={() => setSelectedFilter("Technology")}
          >
            Technology
          </button>
          <button
            className={style.filterButton}
            onClick={() => setSelectedFilter("Kitchen")}
          >
            Kitchen
          </button>
          <button
            className={style.filterButton}
            onClick={() => setSelectedFilter("Sports")}
          >
            Sports
          </button>
          <button
            className={style.filterButton}
            onClick={() => setSelectedFilter("Furniture")}
          >
            Furniture
          </button>
          <button
            className={style.filterButton}
            onClick={() => setSelectedFilter("Art")}
          >
            Art
          </button>
        </div>
      </div>
      <ItemsTable selectedFilter={selectedFilter} />
    </div>
  );
}
