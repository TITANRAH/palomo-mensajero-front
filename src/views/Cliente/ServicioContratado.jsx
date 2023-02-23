import usePalomo from "../../hooks/usePalomo"



export default function ServicioContratado(){

    const {servicioContratado} = usePalomo()

   console.log('servicioContratado desde servicios contratados', servicioContratado)

    

    
    return (
        <>
        <h1>Servicio contratado</h1>
        </>
    )
}