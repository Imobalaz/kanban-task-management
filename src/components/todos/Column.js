import classes from './Column.module.css'
import Todo from './Todo';

const Column = () => {
    return (
      <div className={classes.container}>
        <div className={classes.column_title}>
          <span></span>
          <p>TODO (4)</p>
        </div>

        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </div>
    );
}

export default Column;