import classes from "./Todo.module.css";
import { useContext } from "react";
import AppContext from "../../context/context-api";
import { useLocation, useHistory } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const Todo = (props) => {
  const location = useLocation();
  const history = useHistory();
  const ctx = useContext(AppContext);
  const task = props.task;
  const title = task.title;
  const subtasks = task.subtasks;
  const totalLength = subtasks.length;

  const titleSlug = title.toLowerCase().replaceAll(" ", "-");

  const doneTasks = subtasks.filter((task) => task.isCompleted === true);
  const doneLength = doneTasks.length;

  const taskClickHandler = () => {
    ctx.activateOverlay();
    ctx.setOverlayType("view task");
    ctx.setTask({
        columnName: props.column,
        taskTitle: title,
    })
  };
  return (
    <BrowserRouter>
      <div className={classes.container} onClick={taskClickHandler}>
        <div className={classes.title}>{title}</div>
        <div
          className={classes.substacks}
        >{`${doneLength} of ${totalLength} substacks`}</div>
      </div>
    </BrowserRouter>
  );
};

export default Todo;
