import classes from "./AddNewBoard.module.css";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const AddNewBoard = () => {
  return (
    <div className={classes.container}>
      <p className={classes.title}>Add New Board</p>

      <div class={`${classes.board_form}`}>
        <label htmlFor="boardName">Name</label>
        <input
          type="text"
          className=""
          id="boardName"
          placeholder="e.g. Web Design"
        />
      </div>
      <div className={classes.all_columns}>
        <p>Columns</p>

        <div className={classes.columns}>
          <input type="text" className="" />
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
        <div className={classes.columns}>
          <input type="text" className="" />
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
        <div className={classes.columns}>
          <input type="text" className="" />
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>

        <Button isForm={true} color="grey">
          + Add New Column
        </Button>
      </div>

      <Button isForm={true}>Create New Board</Button>
    </div>
  );
};

export default AddNewBoard;
