import React, { Fragment } from "react";

import classes from "./Logo.module.scss";
import { BiSolidLeaf } from "react-icons/bi";

const Logo = (props) => {
  return (
    <Fragment>
      <div className={classes["logo-wrapper"]}>
        <BiSolidLeaf className={classes["logo-wrapper__logo"]} />
      </div>
    </Fragment>
  );
};

export default Logo;
