import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider

    const [idReceta, guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({});

    //cuando se tiene el id se llama al api
    useEffect(() => {
        if (!idReceta) return;
        const obtenerReceta = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`

            const resultReceta = await axios.get(url);
            console.log(resultReceta.data.drinks);
            guardarReceta(resultReceta.data.drinks[0])

        }
        obtenerReceta()
    }, [idReceta])

    return (
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta
            }}

        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;