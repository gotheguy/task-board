import React from "react";

import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      className={`${classes.button}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
