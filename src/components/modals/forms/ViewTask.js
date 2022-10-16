import classes from "./ViewTask.module.css";
import { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/context-api";

const ViewTask = () => {
  const ctx = useContext(AppContext);
  const [columnToggle, setColumnToggle] = useState(false);
  const [buttonText, setButtonText] = useState(ctx.task.columnName);
  const dark = ctx.isDark ? classes.dark : '';

  useEffect(() => {
    setButtonText(ctx.task.columnName);
  }, [ctx.task]);
  const { boards } = ctx.data;

  const [neededBoard] = boards.filter((board) => board.name === ctx.boardName);
  const [neededColumn] = neededBoard.columns.filter(
    (column) => column.name === ctx.task.columnName
  );
  const [neededTask] = neededColumn.tasks.filter(
    (task) => task.title === ctx.task.taskTitle
  );

  const allSubtasks = neededTask.subtasks;
  const completedSubtasks = allSubtasks.filter(
    (subtask) => subtask.isCompleted
  );

  const checkboxChangeHandler = () => {};

  const subtasks = allSubtasks.map((subtask) => {
    const checkboxToggleHandler = () => {
      ctx.setTaskDropdownIsActive(false)
      const subtaskText = subtask.title;
      const oldSubtask = allSubtasks.find(
        (subtask) => subtask.title === subtaskText
      );
      const updatedSubtask = {
        ...oldSubtask,
        isCompleted: !oldSubtask.isCompleted,
      };

      const subtaskIndex = neededTask.subtasks.findIndex(
        (subtask) => subtask.title === subtaskText
      );
      neededTask.subtasks[subtaskIndex] = updatedSubtask;

      ctx.setData({ boards });
    };
    return (
      <div
        key={subtask.title}
        className={`${classes.checkbox} ${dark} ${
          subtask.isCompleted ? classes.checked : ""
        }`}
        onClick={checkboxToggleHandler}
      >
        <input
          type="checkbox"
          checked={subtask.isCompleted}
          onChange={checkboxChangeHandler}
        />
        <label>{subtask.title}</label>
      </div>
    );
  });

  const columns = neededBoard.columns.map((column) => {
    const optionClickHandler = () => {
      setButtonText(column.name);

      if (column.name !== buttonText) {
        const taskIndex = neededColumn.tasks.findIndex(
          (task) => task.title === neededTask.title
        );
        neededColumn.tasks.splice(taskIndex, 1);

        const [transferedToColumn] = neededBoard.columns.filter(
          (col) => col.name === column.name
        );



        transferedToColumn.tasks.push(neededTask);



        ctx.setTask(prevState => (
          {...prevState, columnName: column.name}
        ))
      }

      setColumnToggle(false);
    };
    return (
      <div
        key={column.name}
        className={classes.option}
        onClick={optionClickHandler}
      >
        {column.name}
      </div>
    );
  });

  const columnToggleHandler = () => {
    ctx.setTaskDropdownIsActive(false)
    setColumnToggle((prev) => !prev);
  };

  const editTaskHandler = () => {
    ctx.setTaskDropdownIsActive(false)
    ctx.activateOverlay();
    ctx.setOverlayType("edit task");
  }

  const deleteTaskHandler = () => {
    ctx.setTaskDropdownIsActive(false)
    ctx.activateOverlay();
    ctx.setOverlayType('delete task')
  }

  const dropdownToggler = () => {
    ctx.setTaskDropdownIsActive(prev => !prev);
  }
  return (
    <div className={`${classes.container} ${dark}`}>
      <div className={`${classes.title} ${dark}`}>{neededTask.title}</div>

      <div className={classes.description}>{neededTask.description}</div>

      <div className={classes.subtasks}>
        <p>
          Subtasks ({`${completedSubtasks.length} of ${allSubtasks.length}`})
        </p>
        <div className={classes.checkboxes}>{subtasks}</div>
      </div>

      <div className={classes.status}>
        <p>Current Status</p>

        <button
          className={`${classes.select} ${dark} ${
            columnToggle ? classes.active : ""
          }`}
          onClick={columnToggleHandler}
        >
          {buttonText}
          <span>
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                stroke-width="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </span>
        </button>

        <div
          className={`${classes.options} ${dark} ${
            columnToggle ? classes.active : ""
          }`}
        >
          {columns}
        </div>
      </div>

      <div className={classes.vertical} onClick={dropdownToggler}>
        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="#828FA3" fill-rule="evenodd">
            <circle cx="2.308" cy="2.308" r="2.308" />
            <circle cx="2.308" cy="10" r="2.308" />
            <circle cx="2.308" cy="17.692" r="2.308" />
          </g>
        </svg>
      </div>

      {ctx.taskDropdownIsActive && <div className={classes.dropdown}>
        <p onClick={editTaskHandler}>Edit Task</p>
        <p className={classes.delete_board} onClick={deleteTaskHandler}>
          Delete Task
        </p>
      </div>}
    </div>
  );
};

export default ViewTask;
