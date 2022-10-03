import classes from './DeleteBoard.module.css'
import Button from '../ui/Button';


const DeleteBoard = () => {
    return (
      <div className={classes.container}>
        <div className={classes.title}>Delete this board?</div>
        <div className={classes.text}>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </div>
        <div className={classes.actions}>
            <Button isForm={true} color='red'>Delete</Button>
            <Button isForm={true} color='grey'>Cancel</Button>
        </div>
      </div>
    );
}

export default DeleteBoard;