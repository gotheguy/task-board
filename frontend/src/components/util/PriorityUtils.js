import React from "react";
import sharedStyles from "../../sharedStyles.module.scss";
import {
  TbCircleDotFilled,
  TbChevronsUp,
  TbMenu,
  TbChevronsDown,
} from "react-icons/tb";

class PriorityUtils {
  static data = [
    {
      text: "None",
      icon: (
        <TbCircleDotFilled className={sharedStyles["priority-icon--none"]} />
      ),
    },
    {
      text: "Low",
      icon: <TbChevronsDown className={sharedStyles["priority-icon--low"]} />,
    },
    {
      text: "Medium",
      icon: <TbMenu className={sharedStyles["priority-icon--medium"]} />,
    },
    {
      text: "High",
      icon: <TbChevronsUp className={sharedStyles["priority-icon--high"]} />,
    },
  ];

  static getPriority = (priority) => {
    const selectedPriority = PriorityUtils.data.find(
      (p) => p.text === priority && p.text !== "None"
    );

    return {
      level: selectedPriority?.text ?? "NONE",
      icon: selectedPriority?.icon ?? null,
    };
  };
}

export default PriorityUtils;
