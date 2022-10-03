import classes from "./ViewTask.module.css";
import { useContext, useState, useEffect } from "react";
import AppContext from "../../../context/context-api";


const ViewTask = () => {
  const ctx = useContext(AppContext);
  const [columnToggle, setColumnToggle] = useState(false);
  const [buttonText, setButtonText] = useState(ctx.task.columnName)

  useEffect(() => {
    setButtonText(ctx.task.columnName)
  }, [ctx.task])
  const {boards} = ctx.data;

  const [neededBoard] = boards.filter(board => board.name === ctx.boardName);
  const [neededColumn] = neededBoard.columns.filter(column => column.name === ctx.task.columnName)
  const [neededTask] = neededColumn.tasks.filter(task => task.title === ctx.task.taskTitle)
  
  
  const allSubtasks = neededTask.subtasks;
  const completedSubtasks = allSubtasks.filter(subtask => subtask.isCompleted);

  const checkboxToggleHandler = () => {
    
  }

  const checkboxChangeHandler = () => {

  }

  const optionClickHandler = (event) => {
    setButtonText(event.target.textContent);
    setColumnToggle(false);
  }

  const subtasks = allSubtasks.map((subtask) => {
   return <div key={subtask.title} className={`${classes.checkbox} ${subtask.isCompleted ? classes.checked : ''}`} onClick={checkboxToggleHandler}>
      <input type="checkbox" checked={subtask.isCompleted} onChange={checkboxChangeHandler}/>
      <label>{subtask.title}</label>
    </div>
});

  const columns = neededBoard.columns.map((column) => (
    <div key={column.name} className={classes.option} onClick={optionClickHandler} >{column.name}</div>
  ));

  const columnToggleHandler = () => {
    setColumnToggle(prev => !prev);
  }


  return (
    <div className={classes.container}>
      <div className={classes.title}>{neededTask.title}</div>

      <div className={classes.description}>
       {neededTask.description}
      </div>

      <div className={classes.subtasks}>
        <p>Subtasks ({`${completedSubtasks.length} of ${allSubtasks.length}`})</p>
        <div className={classes.checkboxes}>
          {subtasks}
        </div>
      </div>

      <div className={classes.status}>
        <p>Current Status</p>

        <button className={`${classes.select} ${columnToggle ? classes.active : ''}`} onClick={columnToggleHandler}>
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

        <div className={`${classes.options} ${columnToggle ? classes.active : ''}`}>
          {columns}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
