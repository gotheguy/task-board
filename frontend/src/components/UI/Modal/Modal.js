import React, { Fragment, useContext } from "react";

import { CardContext } from "../../../context/CardContext";
import classes from "./Modal.module.scss";
import Backdrop from "../Backdrop";
import ModalHeader from "./ModalHeader";
import ModalDescription from "./ModalDescription";
import ModalComments from "./ModalComments";
import ModalAside from "./ModalAside";
import ModalFooter from "./ModalFooter";

const Modal = ({ filteredList }) => {
  const { selectedCard, setSelectedCard } = useContext(CardContext);

  const onCloseCallback = () => {
    setSelectedCard({ ...selectedCard, isSelected: false });
  };

  return (
    <Fragment>
      <Backdrop onClose={onCloseCallback} />
      <div className={classes.modal}>
        <ModalHeader
          selectedCard={selectedCard}
          filteredList={filteredList}
          onCloseCallback={onCloseCallback}
        />
        <div className={classes["modal__container"]}>
          <div className={classes["modal__container__content"]}>
            <ModalDescription
              selectedCard={selectedCard}
              setSelectedCard={selectedCard}
            />
            <ModalComments selectedCard={selectedCard} />
          </div>
          <div className={classes["modal__container__aside"]}>
            <ModalAside />
          </div>
          {/* <ModalFooter /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
