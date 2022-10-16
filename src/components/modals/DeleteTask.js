import classes from "./DeleteBoard.module.css";
import Button from "../ui/Button";
import { useContext } from "react";
import AppContext from "../../context/context-api";

const DeleteTask = () => {

  const ctx = useContext(AppContext)

  const cancelHandler = () => {
    ctx.deactivateOverlay()
  }
  
  const deleteHandler = () => {
    const neededBoard = ctx.data.boards.find(
      (board) => board.name === ctx.boardName
    );

    const neededColumn = neededBoard.columns.find(
      (column) => column.name === ctx.task.columnName
    );

    const neededTaskIndex = neededColumn.tasks.findIndex(
      (task) => task.title === ctx.task.taskTitle
    );

    neededColumn.tasks.splice(neededTaskIndex, 1);

    ctx.deactivateOverlay();
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>Delete this task?</div>
      <div className={classes.text}>
        Are you sure you want to delete the ‘Build settings UI’ task and its
        subtasks? This action cannot be reversed.
      </div>
      <div className={classes.actions}>
        <Button isForm={true} onClick={deleteHandler} color="red">
          Delete
        </Button>
        <Button isForm={true} onClick={cancelHandler} color="grey">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteTask;
