import classes from "./AddNewTask.module.css";
import Button from "../../ui/Button";

const AddNewTask = () => {
  const placeholderText =
    "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.";
  return (
    <div className={classes.container}>
      <p className={classes.title}>Add New Task</p>

      <div class={`${classes.task_form}`}>
        <label htmlFor="taskName">Title</label>
        <input
          type="text"
          className=""
          id="taskName"
          placeholder="e.g. Take coffee break"
        />
      </div>

      <div className={classes.description}>
        <p>Description</p>
        <textarea placeholder={placeholderText}></textarea>
      </div>

      <div className={classes.all_subtasks}>
        <p>Subtasks</p>

        <div className={classes.subtasks}>
          <input type="text" className="" />
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>

        <Button isForm={true} color="grey">
          + Add New Subtask
        </Button>
      </div>

      <div className={classes.status}>
        <p>Status</p>

        <button className={`${classes.select} ${classes.active}`}>
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

        <div className={classes.options}>
          <div className={classes.option}>Hello</div>
          <div className={classes.option}>Hi</div>
          <div className={classes.option}>Welcome</div>
        </div>
      </div>

      <Button isForm={true}>Create Task</Button>
    </div>
  );
};

export default AddNewTask;
