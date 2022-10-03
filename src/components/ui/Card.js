import classes from "./Card.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { useContext } from "react";
import Overlay from "../layout/Overlay";
import ViewTask from "../modals/forms/ViewTask";
import AppContext from "../../context/context-api";

const Card = (props) => {
  const ctx = useContext(AppContext);
  const overlayState = ctx.overlayIsActive;

  let cardContent;

  switch (ctx.overlayType) {
    case "view task":
      cardContent = <ViewTask />;
      break;

    default:
      break;
  }


  const style = `${classes.container} ${overlayState ? "" : classes.hide}`;


const clickHandler = () => {
  console.log("clicked");
}
  return ReactDOM.createPortal(
    <div className={style}>
      {overlayState && <Overlay />}
      {overlayState && <div className={classes.subcontainer}>{cardContent}</div>}
    </div>,
    document.body
  );
};

export default Card;
