import { Fragment } from "react"
import classes from './TopNav.module.css'
const TopNav = () => {
    return (
        <Fragment>
            <div className={classes.logo}>Logo</div>
            <div className={classes.beside}>
                <p>Platform Launch</p>
                <div className="sub">
                    <button>Button</button>
                    <span>three dots</span>
                </div>
            </div>
        </Fragment>
    )
}

export default TopNav;