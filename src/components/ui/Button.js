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

    const isForm = props.isForm;

    const buttonColor = props.color;

    

    var addedButtonStyle;

    if (buttonColor === "grey") {
        addedButtonStyle = classes.grey
    } else if (buttonColor === 'red') {
        addedButtonStyle = classes.red
    } else if (buttonColor === 'light') {
        addedButtonStyle = classes.light
    } else {
        addedButtonStyle = ''
    }


    const style = `${classes.button} ${isDisabled ? classes.is_disabled : ""} ${isForm ? classes.form : ''} ${addedButtonStyle}`



    return (
        <button className={style} onClick={props.onClick} disabled={isDisabled}>{props.children}</button>
    )
}

export default Button;