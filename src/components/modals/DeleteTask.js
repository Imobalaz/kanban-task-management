import classes from "./DeleteBoard.module.css";
import Button from "../ui/Button";

const DeleteTask = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Delete this task?</div>
      <div className={classes.text}>
        Are you sure you want to delete the ‘Build settings UI’ task and its
        subtasks? This action cannot be reversed.
      </div>
      <div className={classes.actions}>
        <Button isForm={true} color="red">
          Delete
        </Button>
        <Button isForm={true} color="grey">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteTask;
