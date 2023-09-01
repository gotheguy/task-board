import React, { Fragment } from "react";
import { BiX, BiSolidCreditCardFront } from "react-icons/bi";

import classes from "./ModalHeader.module.scss";

const ModalHeader = ({ selectedCard, filteredList, onCloseCallback }) => {
  return (
    <Fragment>
      <header className={classes["modal__header"]}>
        <BiSolidCreditCardFront
          className={`${classes["modal__header__icon"]} ${classes["modal__header__icon--title"]}`}
        />
        <div className={classes["modal__header__title"]}>
          <h3>{selectedCard.title}</h3>
          <p>{`In list "${filteredList.title}"`}</p>
        </div>
        <BiX
          className={`${classes["modal__header__icon"]} ${classes["modal__header__icon--close"]}`}
          onClick={onCloseCallback}
        />
      </header>
    </Fragment>
  );
};

export default ModalHeader;
