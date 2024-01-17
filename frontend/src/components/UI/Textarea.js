import React, { useState } from "react";

import classes from "./Textarea.module.scss";

const Textarea = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(true);
    }
  };

  const handleBlur = (e) => {
    const relatedTarget = e.relatedTarget;
    if (!relatedTarget || !relatedTarget.classList.contains("exclude-blur")) {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(false);
      }
    }
  };

  return (
    <div className={classes["textarea-container"]}>
      {
        <textarea
          autoFocus={props.autoFocus}
          className={`${classes["textarea-container__textarea"]} ${
            isFocused
              ? classes[props.className]
              : classes["textarea--default-height"]
          }`}
          id={props.id}
          ref={ref}
          onChange={handleChange}
          placeholder={props.text}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      }
    </div>
  );
});

export default Textarea;
