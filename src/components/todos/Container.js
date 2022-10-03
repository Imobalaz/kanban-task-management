import classes from "./Container.module.css";
import Empty from "./Empty";
import Column from "./Column";
import { useContext, useEffect } from "react";
import AppContext from "../../context/context-api";
import { useLocation, useHistory } from "react-router-dom";
import data from "../../store/data";

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

      const boardName = queriedBoard
        ? queriedBoard
        : boards[0].name.toLowerCase().replace(" ", "-")
    }
  }, []);

  if (boards.length === 0) {
    return <div className={classes.container}></div>;
  }

  const [filteredBoard] = boards.filter(
    (board) => board.name.toLowerCase().replace(" ", "-") === queriedBoard
  );

  const neededBoard = filteredBoard ? filteredBoard : boards[0];

  if (!neededBoard.columns || neededBoard.columns.length === 0) {
    return (
      <div className={classes.container}>
        <Empty />
      </div>
    );
  }

  const boardColumns = neededBoard.columns;

  const columns = boardColumns.map((column) => (
    <Column key={column.name} column={column} />
  ));

  return (
    <div className={classes.container}>
      {columns}

      <div className={classes.add_column}>+ New Column</div>
    </div>
  );
};

export default Container;
