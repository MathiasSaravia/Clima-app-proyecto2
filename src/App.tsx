import AppClima from "./components/AppClima"
import { ClimaPovider } from "./context/ClimaProvider"

function App() {

  return (
    <ClimaPovider>
      <header>
        <h1>Buscador de Clima</h1>
      </header>
      <AppClima />
  </ClimaPovider> 
  )
}

export default App
