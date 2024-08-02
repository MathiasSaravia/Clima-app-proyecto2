import axios from "axios";
import { ChangeEvent, createContext, PropsWithChildren, useState } from "react";

interface Busqueda {
    ciudad: string;
    pais: string;
}

interface ResultadoApi {
    name: string;
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
    }
}

export interface ClimaContextProps {
    busqueda: Busqueda,
    resultado:ResultadoApi,
    datosBusqueda: (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}


const ClimaContext = createContext<ClimaContextProps>({} as ClimaContextProps);

const ClimaPovider = ({ children }: PropsWithChildren) => {

    const [resultado, setResultado] = useState<ResultadoApi>({} as ResultadoApi)

    const [busqueda, setBusqueda] = useState<Busqueda>({
        ciudad: "",
        pais: "",
    })

    const datosBusqueda = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const consultarClima = async (datos : Busqueda) => {
        try {

            const {ciudad , pais } = datos;
            const apiKey = import.meta.env.VITE_API_KEY
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
            await axios.get(url)

            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                resultado,
                datosBusqueda
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaPovider
};

export default ClimaContext;