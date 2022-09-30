import Button from "../ui/Button"
import classes from './Empty.module.css'

const Empty = () => {

    

    return (
        <div className={classes.container}>
            <p>This board is empty. Create a new column to get started</p>
            <Button padding="15px 18px 14px 17px" fontSize="15px" lineHeight="18.9px">+ Add New Column</Button>
        </div>
    )
}

export default Empty