import classes from './Container.module.css'
// import Empty from './Empty';
import Column from './Column';

const Container = (props) => {
    return (

        <div className={classes.container}>
            <Column />

        
            <div className={classes.add_column}>
                + New Column
            </div>
        </div>
    )
}

export default Container;