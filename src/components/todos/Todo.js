import classes from "./Todo.module.css"

const Todo = () => {
    return(
        <div className={classes.container}>
            <div className={classes.title}>Build UI for onboarding flow</div>
            <div className={classes.substacks}>0 of 3 substacks</div>
        </div>
    )
}

export default Todo;