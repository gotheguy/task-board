import React, { Fragment, useState } from "react";
import {
  BiSolidMessageDots,
  BiSolidPencil,
  BiSolidTrashAlt,
} from "react-icons/bi";

import classes from "./ModalComments.module.scss";
// import { useCard } from "../../hooks/useCard";

const ModalComments = ({ selectedCard }) => {
  const [hoveredComment, setHoveredComment] = useState(null);
  // const { updateComment, deleteComment, isLoading, error } = useCard();

  const handleMouseEnter = (id) => {
    setHoveredComment(id);
  };

  const handleMouseLeave = () => {
    setHoveredComment(null);
  };

  return (
    <Fragment>
      <div className={classes["modal__content__comments"]}>
        <BiSolidMessageDots
          className={classes["modal__content__comments__icon--messagedots"]}
        />
        <h4>Comments</h4>
        <span className={classes["modal__content__comments__count"]}>
          {selectedCard.comments.length}
        </span>
      </div>
      <div className={classes["modal__content__comments__list"]}>
        {selectedCard.comments.length > 0 ? (
          selectedCard.comments.map((item, id) => {
            return (
              <Fragment key={id}>
                <p
                  onMouseEnter={() => handleMouseEnter(id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item}
                  {hoveredComment === id && (
                    <span>
                      <BiSolidPencil
                        className={
                          classes["modal__content__comments__list__icon"]
                        }
                      />
                      <BiSolidTrashAlt
                        className={
                          classes["modal__content__comments__list__icon"]
                        }
                      />
                    </span>
                  )}
                </p>
              </Fragment>
            );
          })
        ) : (
          <p>No comments yet, maybe add a new one?</p>
        )}
      </div>
    </Fragment>
  );
};

export default ModalComments;
