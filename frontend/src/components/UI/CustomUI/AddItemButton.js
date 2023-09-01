import React from "react";

import mainClasses from "../../../App.module.scss";
import classes from "./AddItemButton.module.scss";
import { FaPlus } from "react-icons/fa6";

const AddItemButton = (props) => {
  return (
    <a
      className={`${classes["add-link"]} ${mainClasses.link}`}
      onClick={props.onClick}
    >
      <span className={classes["add-link__icon"]}>
        <FaPlus />
      </span>
      <span className={classes["add-link__text"]}>{props.text}</span>
    </a>
  );
};

export default AddItemButton;
