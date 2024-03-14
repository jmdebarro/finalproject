import React from "react";
import style from "./table.module.css";

function TableItem(props) {
  const info = props.itemData;
  return (
    <div className={style.item_box}>
      <div className={style.image}>
        <img
          src={`data:image/jpeg;base64,${info.image}`}
          alt="Base64 Image"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={style.info}>
        <div className={style.description}>
          {info.description}
        </div>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

function TableBody(props) {
  const rows = props.itemData.map((row, index) => {
    return (
      <tr key={index}>
        <td>
          <TableItem itemData={row} />
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableBody itemData={props.itemData} />
    </table>
  );
}

export default Table;
