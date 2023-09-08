import { useCallback, useMemo, useRef } from "react"
import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES } from "../constants"

const Resultado = () => {

    const {resultado, datos} = useCotizador()
    const {marca, plan, año} = datos
    const añoRef = useRef(año)

    if (resultado === 0) {
        return null
    }
    
    // useCallback para evitar hacer re-render del plan o marca. Solo si cambia el resultado (cuando se de click en cotizar)
    const [nombreMarca] = useCallback(MARCAS.filter(m => m.id === Number(marca)), [resultado])
    const [nombrePlan] = useCallback(PLANES.filter(p => p.id === Number(plan)), [resultado])

  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
      <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>

      <p className="my-2">
        <span className="font-bold">Marca: </span>
        {nombreMarca.nombre}
      </p>

      <p className="my-2">
        <span className="font-bold">Plan: </span>
        {nombrePlan.nombre}
      </p>

      <p className="my-2">
        <span className="font-bold">Año del Auto: </span>
        {añoRef.current}
      </p>

      <p className="my-2 text-2xl">
        <span className="font-bold">Total Cotización: </span>
        {resultado}
      </p>

    </div>
  )
}

export default Resultado
