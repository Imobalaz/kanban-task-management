import classes from "./Container.module.css";
import Empty from "./Empty";
import Column from "./Column";
import { useContext, useEffect } from "react";
import AppContext from "../../context/context-api";
import { useLocation, useHistory } from "react-router-dom";

const Container = (props) => {
  const ctx = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();

  const { boards } = ctx.data;

  const queryParam = new URLSearchParams(location.search);
  const queriedBoard = queryParam.get("board");

  useEffect(() => {
    if (!queriedBoard && boards.length !== 0) {
      history.replace(
        `?board=${boards[0].name.toLowerCase().replace(" ", "-")}`
      );
    }
  }, [boards, history, queriedBoard]);
  const dark = ctx.isDark ? classes.dark : "";
  const noSidenav = !ctx.sidenavIsActive ? classes.no_sidenav : "";
  const containerClickHandler = () => {
    ctx.setBoardDropdownIsActive(false);
  };

  if (boards.length === 0) {
    return (
      <div
        className={`${classes.container} ${dark} ${noSidenav}`}
        onClick={containerClickHandler}
      ></div>
    );
  }

  const [filteredBoard] = boards.filter(
    (board) => board.name.toLowerCase().replace(" ", "-") === queriedBoard
  );

  if (filteredBoard) {
    ctx.setNeededBoard(filteredBoard)
  }
  const neededBoard = ctx.neededBoard;

  ctx.setBoardName(neededBoard.name);

  if (!neededBoard.columns || neededBoard.columns.length === 0) {
    return (
      <div
        className={`${classes.container} ${dark} ${noSidenav}`}
        onClick={containerClickHandler}
      >
        <Empty />
      </div>
    );
  }

  const boardColumns = neededBoard.columns;

  const columns = boardColumns.map((column) => (
    <Column key={column.name} column={column} />
  ));

  const editBoardHandler = () => {
    ctx.setBoardDropdownIsActive(false);
    ctx.activateOverlay();
    ctx.setOverlayType("edit board");
  };

  return (
    <div
      className={`${classes.container} ${dark} ${noSidenav}`}
      onClick={containerClickHandler}
    >
      {columns}

      <div
        className={`${classes.add_column} ${dark}`}
        onClick={editBoardHandler}
      >
        + New Column
      </div>
    </div>
  );
};

export default Container;
