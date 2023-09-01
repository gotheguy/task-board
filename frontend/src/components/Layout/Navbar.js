import React, { Fragment } from "react";

import classes from "./Navbar.module.scss";

const Navbar = (props) => {
  return (
    <Fragment>
      <div className={classes.navbar}>{props.children}</div>
    </Fragment>
  );
};

export default Navbar;
