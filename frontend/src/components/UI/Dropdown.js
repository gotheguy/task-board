import React, { useState } from "react";
import classes from "./Dropdown.module.scss";

function Dropdown({ title, icon, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown}>
      <button className={classes["dropdown__button"]} onClick={toggleDropdown}>
        {selectedOption?.icon || icon} {selectedOption?.text || title}
      </button>
      {isOpen && (
        <ul className={classes["dropdown__content"]}>
          {options.map((option, index) => (
            <li
              key={index}
              className={classes["dropdown__content__option"]}
              onClick={() => handleOptionClick(option)}
            >
              {option.icon}
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
