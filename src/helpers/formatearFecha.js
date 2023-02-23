export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)

    const opciones = {

        
       
        day: '2-digit',
        year: 'numeric',
        month: 'numeric',
        
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
}