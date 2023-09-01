import React from "react";

import classes from "./Backdrop.module.scss";

const Backdrop = (props) => {
  const onCloseHandler = () => {
    props.onClose();
  };

  return <div className={classes.backdrop} onClick={onCloseHandler}></div>;
};

export default Backdrop;
