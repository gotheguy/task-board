import React, { Fragment } from "react";

import classes from "./ModalHeader.module.scss";
import sharedStyles from "../../../sharedStyles.module.scss";
import { BiX } from "react-icons/bi";
import { PiSubtitlesBold } from "react-icons/pi";
import PriorityUtils from "../../util/PriorityUtils";

const ModalHeader = ({ selectedCard, filteredList, onCloseCallback }) => {
  const { level, icon } = PriorityUtils.getPriority(selectedCard.priority);

  return (
    <Fragment>
      <header className={classes["modal__header"]}>
        <div className={classes["modal__header__title"]}>
          <PiSubtitlesBold
            className={`${classes["modal__header__icon--title"]}`}
          />
          <h3>{selectedCard.title}</h3>
          <span
            className={`${
              sharedStyles["priority-icon--" + level.toLowerCase()]
            } ${classes["modal__header__priority"]}`}
          >
            {icon}
          </span>
          <div className={classes["modal__header__action"]}>
            <BiX
              className={`${classes["modal__header__icon--close"]}`}
              onClick={onCloseCallback}
            />
          </div>
        </div>
        <div className={classes["modal__header__subtitle"]}>
          <p>{`In list "${filteredList.title}"`}</p>
        </div>
      </header>
    </Fragment>
  );
};

export default ModalHeader;
