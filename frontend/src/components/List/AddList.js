import React, { Fragment, useState, useRef } from "react";

import mainClasses from "../../App.module.scss";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AddItemButton from "../UI/CustomUI/AddItemButton";

const AddList = ({ onAddList }) => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef();

  const inputHandler = () => {
    setShowInput(!showInput);
  };

  const addListHandler = () => {
    const listTitle = inputRef.current.value;
    if (listTitle.trim().length !== 0) {
      onAddList(listTitle);
      inputHandler();
    }
  };

  return (
    <Fragment>
      <div className={mainClasses["list-container"]}>
        {!showInput ? (
          <AddItemButton text="Add a list" onClick={inputHandler} />
        ) : (
          <div>
            <Input ref={inputRef} placeholder="Enter a list title..." />
            <div className={mainClasses["add-card-container"]}>
              <Button onClick={addListHandler}>Add</Button>
              <a href="/#" onClick={inputHandler}>
                Cancel
              </a>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AddList;
