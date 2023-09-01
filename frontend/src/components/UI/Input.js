import React from "react";

import classes from "./Input.module.scss";

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      autoFocus
      style={{ width: props.width, height: props.height }}
      className={classes.input}
      defaultValue={props.value || ""}
      ref={ref}
      placeholder={props.placeholder}
    />
  );
});

export default Input;
