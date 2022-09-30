import classes from './Button.module.css'
import { useState, useEffect,  } from 'react';
import Logo from '../layout/Logo';

const Button = (props) => {
    const [isDisabled, setIsDisabled] = useState(false);


    useEffect(() => {
        if(props.isDisabled) {
            setIsDisabled(props.isDisabled)
        } else {
            setIsDisabled(false)
        }
    }, [props.isDisabled])


    const style = `${classes.button} ${isDisabled ? classes.is_disabled : ""}`

    const buttonClickHandler = () => {
        console.log("This button is clicked");
    }

    return (
        <button className={style} onClick={buttonClickHandler} disabled={isDisabled}>{props.children}</button>
    )
}

export default Button;