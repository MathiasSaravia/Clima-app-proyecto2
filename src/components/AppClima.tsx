import { useClima } from "../hooks/useClima"
import Formulario from "./Formulario"
import Resultado from "./Resultado"

const AppClima = () => {

  const { resultado, cargando } = useClima()

  return (
    <>
        <main className="dos-columnas">
         <Formulario />
         {
          cargando ? <p style={{ textAlign: 'center' , padding: '5px'}}>Cargando...</p> 
          : resultado.name ? <Resultado />
          : <p style={{ textAlign: 'center' , padding: '5px'}}>No hubo resultado</p>
         }
        
        </main>
    </>
  )
}

export default AppClima