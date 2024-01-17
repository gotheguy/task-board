import React, { Fragment } from "react";

import { useCard } from "../../../hooks/useCard";
import classes from "./ModalAside.module.scss";
import Button from "../../UI/Button";
import { PiArrowsLeftRightBold, PiTrashBold } from "react-icons/pi";

const Aside = ({ selectedCard }) => {
  const { deleteCard, isLoading, error } = useCard();

  const actions = [
    {
      label: "Move",
      className: "icon__move",
      icon: <PiArrowsLeftRightBold />,
      action: () => alert("Button 1 clicked"),
    },
    {
      label: "Delete",
      className: "icon__delete",
      icon: <PiTrashBold />,
      action: () => deleteHandler,
    },
  ];

  const deleteHandler = () => {
    deleteCard(selectedCard._id);
  };

  return (
    <Fragment>
      <aside className={classes["modal__aside"]}>
        <h4>Actions</h4>
        <ul>
          {actions.map((item, index) => (
            <li key={index}>
              <Button buttonClasses={"action__btn"} onClick={deleteHandler}>
                <span className={classes[`modal__aside__${item.className}`]}>
                  {item.icon}
                </span>
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </aside>
    </Fragment>
  );
};

export default Aside;
