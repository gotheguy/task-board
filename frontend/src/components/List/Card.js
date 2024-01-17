import React, { Fragment } from "react";
import classes from "./Card.module.scss";

import Avatar from "../Layout/Avatar";
import { PiChatCircleBold } from "react-icons/pi";
import PriorityUtils from "../util/PriorityUtils";

const Card = ({ item, onSelectHandler }) => {
  const { icon } = PriorityUtils.getPriority(item.priority);

  return (
    <Fragment>
      <div className={classes.card} onClick={onSelectHandler}>
        <div className={classes["card__header"]}>
          <h3 className={classes["card__header__title"]}>{item.title}</h3>
          <span>{icon}</span>
        </div>
        <div className={classes["card__content"]}>
          <PiChatCircleBold className={classes["card__content__icon"]} />
          <span className={classes["card__content__count"]}>
            {item.comments?.length}
          </span>
          <div className={classes["card__content__avatar"]}>
            <Avatar
              // imageUrl="https://example.com/your-image-url.jpg"
              userId={item.assignee}
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
