import React, { Fragment, useRef } from "react";

import axios from "axios";
import classes from "./ModalDescription.module.scss";
import { BiSolidDetail } from "react-icons/bi";
import Textarea from "../../UI/Textarea";
import Button from "../../UI/Button";

const ModalDescription = ({ selectedCard, setSelectedCard }) => {
  const textareaRef = useRef();

  const saveDescriptionHandler = () => {
    const newDescription = textareaRef.current.value;
    if (newDescription.trim().length !== 0) {
      axios
        .patch(`${process.env.REACT_APP_BASE_URL}/cards/${selectedCard._id}`, {
          description: newDescription,
        })
        .then((res) => {
          setSelectedCard({ ...selectedCard, description: newDescription });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      <div className={classes["modal__content__description"]}>
        <BiSolidDetail
          className={`${classes["modal__content__description__icon"]} ${classes["modal__content__description__icon--detail"]}`}
        />
        <h4>Description</h4>
      </div>
      {selectedCard.description ? (
        <p className={classes["modal__content__description__text"]}>
          {selectedCard.description}
        </p>
      ) : (
        <div className={classes["modal__content__description__textarea"]}>
          <Textarea
            autoFocus={false}
            className={"textarea--full"}
            ref={textareaRef}
            text="Enter your description here..."
          />
          <div>
            <Button onClick={saveDescriptionHandler}>Add</Button>
            <a href="/#" onClick={() => console.log("Cancel link clicked!")}>
              Cancel
            </a>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalDescription;
