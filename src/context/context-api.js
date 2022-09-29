import React from "react";
import data from "../store/data";

const AppContext = React.createContext({
    data: {},


})

export const AppProvider = (props) => {
    const appContext = {
        data: data
    }
    return <AppContext.Provider value={appContext}>
        {props.children}
    </AppContext.Provider>
}


export default AppContext;