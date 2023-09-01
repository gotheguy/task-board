import React, { useEffect } from "react";

import classes from "./Avatar.module.scss";
import { useUser } from "../../hooks/useUser";

const Avatar = ({ imageUrl, assignee, size, fontSize }) => {
  const { user, getUserById, isLoading, error } = useUser();

  useEffect(() => {
    getUserById(assignee);
  }, []);

  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: user?.avatar?.colorGradient1 || "defaultColor1",
    backgroundImage: `linear-gradient(to bottom, ${
      user?.avatar?.colorGradient1 || "defaultColor1"
    }, ${user?.avatar?.colorGradient2 || "defaultColor2"})`,
  };

  const initialsStyle = {
    fontSize: `${fontSize}rem`,
  };

  return (
    <div className={classes.avatar} style={avatarStyle}>
      {imageUrl ? (
        <img className={classes["avatar__image"]} src={imageUrl} alt="Avatar" />
      ) : (
        user && (
          <span className={classes["avatar__initials"]} style={initialsStyle}>
            {user?.avatar?.initials}
          </span>
        )
      )}
    </div>
  );
};

export default Avatar;
