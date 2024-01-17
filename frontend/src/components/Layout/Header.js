import React, { useContext, useEffect, Fragment } from "react";

import { UserContext } from "../../context/UserContext";
import classes from "./Header.module.scss";
import { PiCaretDownBold } from "react-icons/pi";
import Avatar from "./Avatar";

const Header = () => {
  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    console.log(loggedUser);
  }, [loggedUser]);

  return (
    <Fragment>
      <header className={classes.header}>
        <h5 className={classes["header__themes"]}>
          Themes
          <PiCaretDownBold className={classes["header__themes__icon"]} />
        </h5>
        <div className={classes["header__avatar"]}>
          <Avatar
            // imageUrl="https://example.com/your-image-url.jpg"
            // userId={loggedUser?._id}
            userId={"64ee33e46815654d6881f3ac"}
            size={30}
            fontSize={0.8}
          />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
