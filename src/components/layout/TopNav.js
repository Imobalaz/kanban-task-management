import classes from "./TopNav.module.css";
import Button from "../ui/Button";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../../context/context-api";

const TopNav = () => {
  const ctx = useContext(AppContext);
  const location = useLocation();

  const [boardsIsEmpty, setBoardsIsEmpty] = useState(true);
  const { boards } = ctx.data;

  const queryParam = new URLSearchParams(location.search);
  const queriedBoard = queryParam.get("board");

  const [filteredBoard] = boards.filter(
    (board) => board.name.toLowerCase().replace(" ", "-") === queriedBoard
  );

  const neededBoard = filteredBoard ? filteredBoard : boards[0];

  

  useEffect(() => {
    if(boards.length === 0 || !neededBoard.columns || neededBoard.columns.length === 0) {
      setBoardsIsEmpty(true)
      console.log("here");
    } else {
      setBoardsIsEmpty(false)
    }
  }, [neededBoard]);
  return (
    <div className={`${classes.container}`}>
      <div className={classes.subcontainer}>
        <p>Platform Launch</p>
        <div className={classes.subcontainer_action}>
          <Button isDisabled={boardsIsEmpty}>+ Add New Task</Button>
          <span>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
