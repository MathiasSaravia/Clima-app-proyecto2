import { FormEvent, useState } from "react"
import { useClima } from "../hooks/useClima"

const Formulario = () => {
    
    const {datosBusqueda , busqueda : {ciudad, pais} , consultarClima} = useClima()

    const [alert, setAlert] = useState("")

    const onSubmit = (e : FormEvent) => {

        if ([ciudad,pais].includes("")){
            setAlert("Todos los campos son obligatorios")
            return
        }

        e.preventDefault();
        consultarClima({
            ciudad,
            pais
        })

        setAlert("")

    }

    return (
        <div className="contenedor">
            {
                alert && <p style={{color: 'red', textAlign: 'center' , padding: '5px'}}>{alert}</p>
            }

            <form onSubmit={onSubmit}
            >
                <div className="campo">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input 
                        type="text"
                        id="ciudad"
                        name="ciudad"
                        onChange={datosBusqueda}
                        value={ciudad}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="pais">País</label>
                    <select
                        id="pais"
                        name="pais"
                        onChange={datosBusqueda}
                        value={pais}
                    >   
                        <option value=""> Seleccione un país</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>
                        <option value="CL">Chile</option>

                    </select>
                </div>

                <input
                    type="submit"
                    value='Consultar Clima'
                />
            </form>
        </div>
    )
}

export default Formulario