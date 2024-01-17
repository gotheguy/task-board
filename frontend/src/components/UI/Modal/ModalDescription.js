import React, { Fragment, useRef, useState, useEffect } from "react";

import classes from "./ModalDescription.module.scss";
import { useCard } from "../../../hooks/useCard";
import { PiClipboardBold } from "react-icons/pi";
import Textarea from "../../UI/Textarea";
import Button from "../../UI/Button";

const ModalDescription = ({ selectedCard }) => {
  const textareaRef = useRef(null);
  const { updateCard, isLoading, error } = useCard();
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const startEditingDescription = () => {
    setIsEditingDescription(true);
  };

  const cancelEditingDescription = () => {
    setIsEditingDescription(false);
  };

  const saveDescriptionHandler = () => {
    const newDescription = textareaRef.current.value;
    if (newDescription.trim().length !== 0) {
      updateCard(selectedCard._id, "description", newDescription);
    }
    setIsEditingDescription(false);
  };

  return (
    <Fragment>
      <div className={classes["modal__content__description"]}>
        <PiClipboardBold
          className={`${classes["modal__content__description__icon--detail"]}`}
        />
        <h4>Description</h4>
      </div>
      {isEditingDescription ? (
        <div className={classes["modal__content__description__textarea"]}>
          <Textarea
            autoFocus={true}
            className={"textarea--full-height"}
            ref={textareaRef}
            text="Enter a new description"
            defaultValue={selectedCard.description}
          />
          <div className={classes["modal__content__description__buttons"]}>
            <Button
              buttonClasses={"default__btn"}
              onClick={saveDescriptionHandler}
            >
              Save
            </Button>
            <a
              href="/#"
              className="exclude-blur"
              onClick={cancelEditingDescription}
            >
              Cancel
            </a>
          </div>
        </div>
      ) : (
        <p
          className={classes["modal__content__description__text"]}
          onClick={startEditingDescription}
        >
          {selectedCard.description || "Enter a new description"}
        </p>
      )}
    </Fragment>
  );
};

export default ModalDescription;
