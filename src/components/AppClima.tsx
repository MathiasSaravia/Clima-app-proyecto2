import { useClima } from "../hooks/useClima"
import Formulario from "./Formulario"
import Loading from "./Loading"
import Resultado from "./Resultado"

const AppClima = () => {

  const { resultado, cargando } = useClima()

  return (
    <>
        <main className="dos-columnas">
         <Formulario />
         {
          cargando ? <Loading /> 
          : resultado.name ? <Resultado />
          : <p style={{ textAlign: 'center' , padding: '5px'}}>No hubo resultado</p>
         }
        
        </main>
    </>
  )
}

export default AppClima