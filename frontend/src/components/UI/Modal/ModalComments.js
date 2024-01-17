import React, { Fragment, useState, useRef } from "react";
import { PiChatsCircleBold } from "react-icons/pi";
import { useCard } from "../../../hooks/useCard";
import classes from "./ModalComments.module.scss";
import Avatar from "../../Layout/Avatar";
import Textarea from "../../UI/Textarea";

const ModalComments = ({ selectedCard }) => {
  const [hoveredComment, setHoveredComment] = useState(null);
  const { updateComment, deleteComment, isLoading, error } = useCard();
  const textareaRef = useRef(null);

  const handleMouseAction = (id = null) => {
    setHoveredComment(id);
  };

  const updateHandler = (index, comment) => {
    // updateComment(selectedCard._id, index, comment);
  };

  const deleteHandler = (index) => {
    deleteComment(selectedCard._id, index);
  };

  return (
    <Fragment>
      <div className={classes["modal__content__comments"]}>
        <PiChatsCircleBold
          className={classes["modal__content__comments__icon--messagedots"]}
        />
        <h4>Comments</h4>
        <span className={classes["modal__content__comments__count"]}>
          {selectedCard.comments.length}
        </span>
      </div>
      <div className={classes["modal__content__comments__list"]}>
        <Textarea
          autoFocus={false}
          className={"textarea--full-height"}
          ref={textareaRef}
          text="Post a new comment..."
        />
        {selectedCard.comments.length > 0 ? (
          selectedCard.comments.map((item, index) => {
            return (
              <div
                key={index}
                className={classes["modal__content__comments__list__item"]}
              >
                <Avatar userId={item?.commenter} size={23} fontSize={0.7} />
                <span
                  className={classes["modal__content__comments__list__text"]}
                  onMouseEnter={() => handleMouseAction(index)}
                  onMouseLeave={handleMouseAction}
                >
                  {item.text}
                  {hoveredComment === index && (
                    <span
                      className={
                        classes["modal__content__comments__list__actions"]
                      }
                    >
                      <a
                        href="/#"
                        className={
                          classes["modal__content__comments__list__action"]
                        }
                        onClick={() => updateHandler(index, item)}
                      >
                        Edit
                      </a>
                      <a
                        href="/#"
                        className={
                          classes["modal__content__comments__list__action"]
                        }
                        onClick={() => deleteHandler(index)}
                      >
                        Delete
                      </a>
                    </span>
                  )}
                </span>
              </div>
            );
          })
        ) : (
          <p className={classes["modal__content__comments__list__default"]}>
            No comments yet, maybe add a new one?
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default ModalComments;
