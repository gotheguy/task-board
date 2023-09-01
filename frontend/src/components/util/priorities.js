import { TbChevronsUp, TbMenu, TbChevronsDown } from "react-icons/tb";

const priorityLevels = [
  { level: "HIGH", icon: <TbChevronsUp /> },
  { level: "MEDIUM", icon: <TbMenu /> },
  { level: "LOW", icon: <TbChevronsDown /> },
  { level: "NONE" },
];

export default priorityLevels;
