
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, createContext, type SetStateAction } from "react";


interface AlertasTypes {
    modo_dark_numero: string,
    set_modo_dark_numero: React.Dispatch<SetStateAction<string>>
}

export const AlertasContext = createContext<AlertasTypes>({
    modo_dark_numero: "",
    set_modo_dark_numero: () => { }
});


export const AlertasProvider = ({ children }: any): JSX.Element => {

    const [modo_dark_numero, set_modo_dark_numero] = useState<string>("")

    const valueAlertas = {
        modo_dark_numero,
        set_modo_dark_numero

    }

    return (

        <AlertasContext.Provider value={valueAlertas}   >
            {children}
        </AlertasContext.Provider>

    )
}