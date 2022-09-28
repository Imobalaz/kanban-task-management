import classes from './Button.module.css'

const Button = (props) => {

    return (
        <button style={{padding: props.padding, lineHeight: props.lineHeight, fontSize: props.fontSize}} className={classes.button}>{props.children}</button>
    )
}

export default Button;