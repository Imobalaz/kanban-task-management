import classes from "./Todo.module.css"

const Todo = (props) => {

    const task = props.task;
    const title = task.title;
    const subtasks = task.subtasks;

    const totalLength = subtasks.length;
    
    const doneTasks = subtasks.filter(task => task.isCompleted === true);
    const doneLength = doneTasks.length;
    return(
        <div className={classes.container}>
            <div className={classes.title}>{title}</div>
            <div className={classes.substacks}>{`${doneLength} of ${totalLength} substacks`}</div>
        </div>
    )
}

export default Todo;