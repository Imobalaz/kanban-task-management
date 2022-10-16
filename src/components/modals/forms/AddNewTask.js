import classes from "./AddNewTask.module.css";
import Button from "../../ui/Button";
import { useContext, useState } from "react";
import AppContext from "../../../context/context-api";

const AddNewTask = () => {
  const ctx = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasksArray, setSubtasksArray] = useState([''])
  const [showOptions, setShowOptions] = useState(false)
  
  const neededBoard = ctx.data.boards.find(board => board.name === ctx.boardName)
  const [currentColumn, setCurrentColumn] = useState(neededBoard.columns[0].name)

  const addInputHandler = () => {
    setSubtasksArray(prev => [...prev, ""])
  }
 

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  }
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  }

  const removeInput = (index) => {
    const array = [...subtasksArray];
    array.splice(index, 1);
    setSubtasksArray(array)
  }

  const showOptionsHandler = () => {
    setShowOptions(prev => !prev)
  }

  const inputChangeHandler = (event, index) => {
    const array = [...subtasksArray];
    array[index] = event.target.value;
    setSubtasksArray(array);
  }

  const submitHandler = () => {
    const submittedTitle = title.trim();
    let subtasksAreValid = true;
    for (const subtask of subtasksArray) {
      if(!subtask || subtask.trim().length === 0) {
        subtasksAreValid = false
      }
    }

    if (subtasksAreValid && submittedTitle.length > 0) {
      const subtaskPack = subtasksArray.map(subtask => {
        return {title: subtask, isCompleted: false}
      })
      const newTask = {description: description, title: submittedTitle, subtasks: subtaskPack, status: currentColumn }
      const neededColumn = neededBoard.columns.find(column => column.name === currentColumn)
      neededColumn.tasks.push(newTask)
      ctx.deactivateOverlay()
    }
  }

  const subtasks = subtasksArray.map((subtask, index) => {
    return (
      <div className={classes.subtasks} key={`subtask${index}`}>
        <input type="text" className="" onChange={(event) => inputChangeHandler(event, index)}/>
        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" onClick={() => removeInput(index)}>
          <g fill="#828FA3" fill-rule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </div>
    );
  })

  const options = neededBoard.columns.map(column => {
    const clickHandler = () => {
      setCurrentColumn(column.name);
      setShowOptions(false)
    }
    return <div key={column.name} onClick={clickHandler} className={classes.option}>{column.name}</div>;
  })


  const placeholderText =
    "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.";
  return (
    <div className={`${classes.container} ${ctx.isDark ? classes.dark : ''}`}>
      <p className={classes.title}>Add New Task</p>
      <div class={`${classes.task_form}`}>
        <label htmlFor="taskName">Title</label>
        <input
          type="text"
          className=""
          id="taskName"
          placeholder="e.g. Take coffee break"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>

      <div className={classes.description}>
        <p>Description</p>
        <textarea placeholder={placeholderText} onChange={descriptionChangeHandler} value={description}></textarea>
      </div>

      <div className={classes.all_subtasks}>
        <p>Subtasks</p>

        {subtasks}

        <Button isForm={true} color={ctx.isDark ? 'light' : 'grey'} onClick={addInputHandler}>
          + Add New Subtask
        </Button>
      </div>

      <div className={classes.status}>
        <p>Status</p>

        <button className={`${classes.select} ${showOptions ? classes.active : ''}`} onClick={showOptionsHandler}>
          {currentColumn}
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

        {showOptions && <div className={classes.options}>
          {options}
        </div>}
      </div>

      <Button isForm={true} onClick={submitHandler}>Create Task</Button>
    </div>
  );
};

export default AddNewTask;
