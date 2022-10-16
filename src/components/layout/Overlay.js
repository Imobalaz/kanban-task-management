import classes from './Overlay.module.css'
import { useContext } from 'react'
import AppContext from '../../context/context-api'



const Overlay = () => {
    const ctx = useContext(AppContext)
    
    const overlayClickHandler = () => {
        if(ctx.overlayType === "view task" || ctx.overlayType === "add board" || ctx.overlayType === "edit board" || ctx.overlayType === "add task" || ctx.overlayType === "edit task") {
            ctx.deactivateOverlay();
        }

        if(ctx.mobileDropdownIsActive) {
            ctx.setMobileDrobdownIsActive(false);
        }
    }

    return (
        <div className={classes.overlay} onClick={overlayClickHandler}>
        </div>
    )
    
}

export default Overlay;