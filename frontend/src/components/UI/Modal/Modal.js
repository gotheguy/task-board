import React, { Fragment, useContext, useEffect } from "react";

import { CardContext } from "../../../context/CardContext";
import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop";
import ModalHeader from "./ModalHeader";
import ModalDescription from "./ModalDescription";
import ModalComments from "./ModalComments";
import ModalAside from "./ModalAside";
import ModalFooter from "./ModalFooter";
import Dropdown from "../Dropdown";
import { PiLightningBold } from "react-icons/pi";
import PriorityUtils from "../../util/PriorityUtils";

const Modal = ({ filteredList }) => {
  const { selectedCard, setSelectedCard } = useContext(CardContext);

  const onCloseCallback = () => {
    setSelectedCard({ ...selectedCard, isSelected: false });
  };

  const modalClasses = selectedCard.isSelected
    ? `${classes.modal} ${classes["modal--enter"]}`
    : `${classes.modal} ${classes["modal--exit"]}`;

  return (
    <Fragment>
      <Backdrop onClose={onCloseCallback} />
      <div className={modalClasses}>
        <ModalHeader
          selectedCard={selectedCard}
          filteredList={filteredList}
          onCloseCallback={onCloseCallback}
        />
        <div className={classes["modal__container__dropdowns"]}>
          <Dropdown
            title="Priority"
            icon={
              <PiLightningBold className={classes["dropdown__button__icon"]} />
            }
            options={PriorityUtils.data}
          />
        </div>
        <div className={classes["modal__container"]}>
          <div className={classes["modal__container__content"]}>
            <ModalDescription selectedCard={selectedCard} />
            <ModalComments selectedCard={selectedCard} />
          </div>
          <div className={classes["modal__container__aside"]}>
            <ModalAside selectedCard={selectedCard} />
          </div>
        </div>
        <ModalFooter />
      </div>
    </Fragment>
  );
};

export default Modal;
