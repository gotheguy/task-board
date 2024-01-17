import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";

import mainClasses from "../../App.module.scss";
import classes from "./List.module.scss";

import { CardContext } from "../../context/CardContext";
import { useCard } from "../../hooks/useCard";
import Card from "./Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AddItemButton from "../UI/CustomUI/AddItemButton";
import { FaEllipsisVertical } from "react-icons/fa6";

const List = ({ id, title }) => {
  const { setSelectedCard } = useContext(CardContext);
  const { cards, getCardsByListId, postCard, isLoading, error } = useCard();
  const [showTextarea, setShowTextarea] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    getCardsByListId(id);
  }, []);

  const textareaHandler = () => {
    setShowTextarea(!showTextarea);
  };

  const onSelectHandler = (card) => {
    setSelectedCard({ ...card, isSelected: true });
  };

  const addCardHandler = () => {
    const cardTitle = inputRef.current.value;
    if (cardTitle.trim().length !== 0) {
      postCard(id, cardTitle);
      textareaHandler();
    }
  };

  const items = cards?.map((item) => {
    return (
      <Card
        key={item._id}
        id={item._id}
        item={item}
        onSelectHandler={() => onSelectHandler(item)}
      />
    );
  });

  return (
    <Fragment>
      <div className={mainClasses["list-container"]}>
        <div className={classes["list-header"]}>
          <span
            className={`${classes["list-header__title"]} ${classes["list-header__item"]}`}
          >
            {title}
          </span>
          <span
            className={`${classes["list-header__count"]} ${classes["list-header__item"]}`}
          >
            {items?.length}
          </span>
          <span
            className={`${classes["list-header__icon"]} ${classes["list-header__item"]}`}
          >
            <FaEllipsisVertical />
          </span>
        </div>
        {items}
        {!showTextarea ? (
          <AddItemButton text="Add a card" onClick={textareaHandler} />
        ) : (
          <div>
            <Input
              autoFocus={false}
              ref={inputRef}
              placeholder="Enter a card title..."
            />
            <div className={mainClasses["add-card-container"]}>
              <Button buttonClasses={"default__btn"} onClick={addCardHandler}>
                Add
              </Button>
              <a href="/#" onClick={textareaHandler}>
                Cancel
              </a>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default List;
