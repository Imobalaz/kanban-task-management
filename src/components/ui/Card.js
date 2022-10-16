import classes from "./Card.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import Overlay from "../layout/Overlay";
import ViewTask from "../modals/forms/ViewTask";
import AddNewBoard from "../modals/forms/AddNewBoard";
import AppContext from "../../context/context-api";
import EditBoard from "../modals/forms/EditBoard";
import DeleteBoard from "../modals/DeleteBoard";
import AddNewTask from "../modals/forms/AddNewTask";
import EditTask from "../modals/forms/EditTask";
import DeleteTask from "../modals/DeleteTask";

const Card = (props) => {
  const ctx = useContext(AppContext);
  const overlayState = ctx.overlayIsActive;

  let cardContent;

  switch (ctx.overlayType) {
    case "view task":
      cardContent = <ViewTask />;
      break;

    case "add board":
      cardContent = <AddNewBoard />;
      break;

    case "edit board":
      cardContent = <EditBoard />;
      break;

    case "delete board": 
      cardContent = <DeleteBoard />
      break

    case "add task":
      cardContent = <AddNewTask />
      break
    
    case "edit task":
      cardContent = <EditTask />
      break;

    case "delete task":
      cardContent = <DeleteTask />
      break;

    default:
      break;
  }

  const style = `${classes.container} ${overlayState ? "" : classes.hide}`;
  const dark = ctx.isDark ? classes.dark : '';

  return ReactDOM.createPortal(
    <BrowserRouter>
    <div className={style}>
      {overlayState && <Overlay />}
      {overlayState && (
        <div className={`${classes.subcontainer} ${dark}`}>{cardContent}</div>
      )}
    </div>
    </BrowserRouter>,
    document.body
  );
};

export default Card;
