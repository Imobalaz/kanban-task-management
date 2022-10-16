import classes from "./TopNav.module.css";
import Button from "../ui/Button";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../../context/context-api";

const TopNav = () => {
  const ctx = useContext(AppContext);
  const location = useLocation();

  const editBoardHandler = () => {
    ctx.setBoardDropdownIsActive(false)
    ctx.activateOverlay();
    ctx.setOverlayType("edit board");
  }

  const deleteBoardHandler = () => {
    ctx.setBoardDropdownIsActive(false)
    ctx.activateOverlay()
    ctx.setOverlayType('delete board');
  }

  const dark = ctx.isDark ? classes.dark : "";
  const noSidenav = !ctx.sidenavIsActive ? classes.no_sidenav : "";

  const [boardsIsEmpty, setBoardsIsEmpty] = useState(true);
  const { boards } = ctx.data;

  const queryParam = new URLSearchParams(location.search);
  const queriedBoard = queryParam.get("board");

  const [filteredBoard] = boards.filter(
    (board) => board.name.toLowerCase().replace(" ", "-") === queriedBoard
  );

  const neededBoard = filteredBoard ? filteredBoard : boards[0];

  const spanClickHandler = () => {
    ctx.setBoardDropdownIsActive(prev => !prev)
  }

  const addNewTaskHandler = () => {
    ctx.activateOverlay();  
    ctx.setOverlayType("add task");
  }

  useEffect(() => {
    if (
      boards.length === 0 ||
      !neededBoard.columns ||
      neededBoard.columns.length === 0
    ) {
      setBoardsIsEmpty(true);
    } else {
      setBoardsIsEmpty(false);  
    }
  }, [neededBoard, boards.length]);
  return (
    <div className={`${classes.container} ${noSidenav} ${dark}`}>
      <div className={`${classes.subcontainer} ${dark}`} >
        <p>{ctx.boardName}</p>
        <div className={classes.subcontainer_action}>
          <Button isDisabled={boardsIsEmpty} onClick={addNewTaskHandler}>+ Add New Task</Button>
          <span className={classes.span} onClick={spanClickHandler}>
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

      {ctx.boardDropdownIsActive && <div className={classes.dropdown}>
        <p onClick={editBoardHandler}>Edit Board</p>
        <p className={classes.delete_board} onClick={deleteBoardHandler}>Delete Board</p>
      </div>}
    </div>
  );
};

export default TopNav;
