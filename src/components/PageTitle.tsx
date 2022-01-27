import React, { FC } from "react";
import classes from "../styles/modules/title.module.css";

const PageTitle: FC = ({ children }) => {
  return <p className={classes.title}>{children}</p>;
};

export default PageTitle;
