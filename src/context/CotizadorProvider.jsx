import { createContext, useState } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext()

// provider - es donde vas a definir tu state (de donde vienen los datos)
const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        año: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos, //cuando se trabaje con objetos, se crea una copia del state para no borrar los datos (ya sea marca, año o plan)
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Una base (por el cliente)
        let resultado = 2000

        // Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.año)

        // Hay que restar el 3% por cada año
        resultado -= ((diferencia * 3) * (resultado)) / 100
        
        // Europeo 30%
        // Americano 15% (incrementa costo en 15%)
        // Asiático 5%
        resultado *= calcularMarca(datos.marca)
        
        // Plan básico 20%
        // Plan completo 50%
        resultado *= calcularPlan(datos.plan)

        // Formatear dinero
        resultado = formatearDinero(resultado)

        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);

    }

    return (
        <CotizadorContext.Provider 
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}>
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext