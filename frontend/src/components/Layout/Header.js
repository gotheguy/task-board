import React, { Fragment } from "react";

import classes from "./Header.module.scss";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1 className={classes["header__text"]}>Taskboard</h1>
      </header>
    </Fragment>
  );
};

export default Header;
