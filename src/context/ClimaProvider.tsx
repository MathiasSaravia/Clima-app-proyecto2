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
    busqueda: Busqueda;
    resultado:ResultadoApi;
    datosBusqueda: (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    consultarClima: (datos : Busqueda) => void;
    cargando: boolean
}


const ClimaContext = createContext<ClimaContextProps>({} as ClimaContextProps);

const ClimaPovider = ({ children }: PropsWithChildren) => {

    const [resultado, setResultado] = useState<ResultadoApi>({} as ResultadoApi)

    const [cargando, setCargando] = useState(false)

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

        setCargando(true)

        try {

            const {ciudad , pais } = datos;
            const apiKey = import.meta.env.VITE_API_KEY
            const url = `https://api.openweathermap.org/geo/1.0/direct?appid=${apiKey}&q=${ciudad},${pais}` //https://api.openweathermap.org/data/2.5/weather?q=London,GB&appid=7f40eb4ff8243f313cc5be1addda131a` //https://api.openweathermap.org/data/2.5/weather?q=London,GB&appid=7f40eb4ff8243f313cc5be1addda131a -0.1257 51.5085
            const {data} = await axios.get(url)

            const {lat , lon} = data[0]
            const urlClimaRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
            const {data : datoClima} = await axios.get(urlClimaRequest) 
            
            
            setResultado(datoClima)
 
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                resultado,
                datosBusqueda,
                consultarClima,
                cargando
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