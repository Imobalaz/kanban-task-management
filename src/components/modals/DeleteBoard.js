import classes from './DeleteBoard.module.css'
import Button from '../ui/Button';
import { useContext } from 'react';
import AppContext from '../../context/context-api';


const DeleteBoard = () => {
  const ctx = useContext(AppContext)
  const deleteHandler = () => {
    const index = ctx.data.boards.findIndex(board => board.name === ctx.boardName);
    ctx.data.boards.splice(index, 1);
    ctx.deactivateOverlay()
  }

  const cancelHandler = () => {
    ctx.deactivateOverlay();
  }
    return (
      <div className={classes.container}>
        <div className={classes.title}>Delete this board?</div>
        <div className={classes.text}>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </div>
        <div className={classes.actions}>
            <Button onClick={deleteHandler} isForm={true} color='red'>Delete</Button>
            <Button isForm={true} onClick={cancelHandler} color='grey'>Cancel</Button>
        </div>
      </div>
    );
}

export default DeleteBoard;