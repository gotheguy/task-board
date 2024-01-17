import React, { Fragment } from "react";

import classes from "./Logo.module.scss";
import imageUrl from "../../assets/leaf-icon512.png"; // Replace with the path to your image

const Logo = (props) => {
  return (
    <Fragment>
      <div className={classes["logo-wrapper"]}>
        <img
          className={classes["logo-wrapper__image"]}
          src={imageUrl}
          alt="logo"
        />
        <h1 className={classes["logo-wrapper__text"]}>Taskboard</h1>
      </div>
    </Fragment>
  );
};

export default Logo;
