import React, { Fragment, useState, useEffect } from "react";
import classes from "./Card.module.scss";

import Avatar from "../Layout/Avatar";
import { FaComment } from "react-icons/fa6";
import priorityLevels from "../util/priorities";

const Card = ({ item, onSelectHandler }) => {
  const [cardPriority, setCardPriority] = useState({});

  useEffect(() => {
    getPriority();
  }, []);

  const getPriority = (_priority = "NONE") => {
    const selectedPriority = priorityLevels.find(
      (p) => p.level === item.priority
    );
    setCardPriority(selectedPriority);
  };

  return (
    <Fragment>
      <div className={classes.card} onClick={onSelectHandler}>
        <div className={classes["card__header"]}>
          <h3 className={classes["card__header__title"]}>{item.title}</h3>
          <span
            className={`${
              cardPriority?.level
                ? `${
                    classes[
                      "card__header__priority-icon--" +
                        cardPriority.level.toLowerCase()
                    ]
                  }`
                : ""
            }`}
          >
            {cardPriority?.icon}
          </span>
        </div>
        <div className={classes["card__content"]}>
          <FaComment className={classes["card__content__icon"]} />
          <span className={classes["card__content__count"]}>
            {item.comments?.length}
          </span>
          <div className={classes["card__content__avatar"]}>
            <Avatar
              // imageUrl="https://example.com/your-image-url.jpg"
              assignee={item.assignee}
              size={23}
              fontSize={0.7}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
