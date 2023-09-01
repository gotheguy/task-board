import React, { Fragment } from "react";

import classes from "./ModalAside.module.scss";

const Aside = ({ onItemClick }) => {
  const items = [
    { label: "Button 1", action: () => alert("Button 1 clicked") },
    { label: "Button 2", action: () => alert("Button 2 clicked") },
    { label: "Button 3", action: () => alert("Button 3 clicked") },
    // Add more items as needed
  ];

  return (
    <Fragment>
      <aside className={classes["modal__aside"]}>
        <h4>Actions</h4>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <button onClick={() => onItemClick(item)}>{item.label}</button>
            </li>
          ))}
        </ul>
      </aside>
    </Fragment>
  );
};

export default Aside;
