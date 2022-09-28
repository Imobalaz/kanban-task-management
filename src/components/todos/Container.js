import classes from './Container.module.css'
// import Empty from './Empty';
import Column from './Column';

const Container = () => {
    return (
        <div className={classes.container}>
            <Column />
            <Column />
            <Column />
            <Column />
            <Column />
            <Column />
            <Column />
            <Column />
            <Column />
        
            <div className={classes.add_column}>
                + New Column
            </div>
        </div>
    )
}

export default Container;