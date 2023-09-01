import React from "react";

import classes from "./Textarea.module.scss";

const Textarea = React.forwardRef((props, ref) => {
  return (
    <div className={classes["textarea-container"]}>
      {
        <textarea
          autoFocus={props.autoFocus}
          className={`${classes["textarea-container__textarea"]} ${
            classes[props.className]
          }`}
          id={props.id}
          ref={ref}
          placeholder={props.text}
        />
      }
    </div>
  );
});

export default Textarea;
