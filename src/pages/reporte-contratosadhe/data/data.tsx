import axios from 'axios'

interface enviarReporte {
    fechaInicio: string
    fechaFin: string
    contrato: string
}

interface PersonaNatural {
    pena_Id: number
    pers_Nombre: string
    pena_DireccionExacta: string
    ciud_Nombre: string
    pena_TelefonoFijo: string
    pena_TelefonoCelular : string
    pena_CorreoElectronico: string 
    pena_CorreoAlternativo: string
    pena_RTN: string
    pena_ArchivoRTN: string
    pena_DNI: string
    pena_ArchivoDNI: string
    pena_NumeroRecibo: string
    pena_ArchivoNumeroRecibo: string
    pena_NombreArchDNI: string
    pena_NombreArchRTN: string
    pena_NombreArchRecibo: string
    pena_FechaCreacion: string
}

interface PersonaJuridica {
    peju_Id: number
    pers_Nombre: string
    peju_PuntoReferencia: string
    peju_NumeroLocalRepresentante: string
    peju_PuntoReferenciaRepresentante: string
    peju_TelefonoEmpresa: string
    peju_TelefonoFijoRepresentanteLegal: string
    peju_TelefonoRepresentanteLegal: string
    peju_CorreoElectronico: string
    peju_CorreoElectronicoAlternativo: string
    ciud_Nombre: string
    colo_Nombre: string
    alde_Nombre: string
    peju_CiudadRepresentante: string 
    ColoniaRepresentante: string
    peju_AldeaRepresentante: string 
    peju_NumeroLocalApart: string
    peju_FechaCreacion: string
}

interface ComercianteIndividual{
    coin_Id: number
    pers_Nombre: string
    pers_FormaRepresentacion: string
    ciud_Nombre: string
    colo_Nombre: string
    alde_Nombre: string
    coin_TelefonoCelular: string
    coin_TelefonoFijo: string 
    coin_CorreoElectronico: string
    coin_CorreoElectronicoAlternativo: string
    coin_FechaCreacion: string
}


export const getReporte = async (enviar : enviarReporte) =>{
    try{
        const apiKey = import.meta.env.VITE_ApiKey
        if(!apiKey){
            console.error('API key is undefined.')
            return
        }

        const response = await axios.get(
            `${import.meta.env.VITE_API_SimexPro_Url}api/Reportes/Contratos_Adhesion?fechaInicio=${enviar.fechaInicio}&fechaFin=${enviar.fechaFin}&Contrato=${enviar.contrato}`,
            {
                headers: {
                    XApiKey: apiKey,
                    'Content-Type': 'application/json',
                }
            }
        )

        const data = await response.data
        console.log(data)
        if(enviar.contrato == "CI"){
            return data.data.map((comeriante: ComercianteIndividual)=>{
                return{
                    coin_Id: comeriante.coin_Id,
                    pers_Nombre: comeriante.pers_Nombre,
                    pers_FormaRepresentacion: comeriante.pers_FormaRepresentacion,
                    ciud_Nombre: comeriante.ciud_Nombre,
                    colo_Nombre: comeriante.colo_Nombre,
                    alde_Nombre: comeriante.alde_Nombre,
                    coin_TelefonoCelular: comeriante.coin_TelefonoCelular,
                    coin_TelefonoFijo: comeriante.coin_TelefonoFijo,
                    coin_CorreoElectronico: comeriante.coin_CorreoElectronico,
                    coin_CorreoElectronicoAlternativo: comeriante.coin_CorreoElectronicoAlternativo,
                    coin_FechaCreacion: comeriante.coin_FechaCreacion
                }
            })
        }
        else if(enviar.contrato == "PJ"){
            return data.data.map((personajuridica: PersonaJuridica)=>{
                return{
                    peju_Id: personajuridica.peju_Id,
                    pers_Nombre: personajuridica.pers_Nombre,
                    peju_PuntoReferencia: personajuridica.peju_PuntoReferencia,
                    peju_NumeroLocalRepresentante: personajuridica.peju_NumeroLocalRepresentante,
                    peju_PuntoReferenciaRepresentante: personajuridica.peju_PuntoReferencia,
                    peju_TelefonoEmpresa: personajuridica.peju_TelefonoEmpresa,
                    peju_TelefonoFijoRepresentanteLegal: personajuridica.peju_TelefonoFijoRepresentanteLegal,
                    peju_TelefonoRepresentanteLegal: personajuridica.peju_TelefonoRepresentanteLegal,
                    peju_CorreoElectronico: personajuridica.peju_CorreoElectronico,
                    peju_CorreoElectronicoAlternativo: personajuridica.peju_CorreoElectronicoAlternativo,
                    ciud_Nombre: personajuridica.ciud_Nombre,
                    colo_Nombre: personajuridica.colo_Nombre,
                    alde_Nombre: personajuridica.alde_Nombre,
                    peju_CiudadRepresentante: personajuridica.peju_CiudadRepresentante,
                    ColoniaRepresentante: personajuridica.ColoniaRepresentante,
                    peju_AldeaRepresentante: personajuridica.peju_AldeaRepresentante,
                    peju_NumeroLocalApart: personajuridica.peju_NumeroLocalApart,
                    peju_FechaCreacion: personajuridica.peju_FechaCreacion
                }
            })
        }
        else{
            return data.data.map((personanatural: PersonaNatural)=>{
                return{
                    pena_Id: personanatural.pena_Id,
                    pers_Nombre: personanatural.pers_Nombre,
                    pena_DireccionExacta: personanatural.pena_DireccionExacta,
                    ciud_Nombre: personanatural.ciud_Nombre,
                    pena_TelefonoFijo: personanatural.pena_TelefonoFijo,
                    pena_TelefonoCelular : personanatural.pena_TelefonoCelular,
                    pena_CorreoElectronico: personanatural.pena_CorreoElectronico,
                    pena_CorreoAlternativo: personanatural.pena_CorreoAlternativo,
                    pena_RTN: personanatural.pena_RTN,
                    pena_ArchivoRTN: personanatural.pena_ArchivoRTN,
                    pena_DNI: personanatural.pena_DNI,
                    pena_ArchivoDNI: personanatural.pena_ArchivoDNI,
                    pena_NumeroRecibo: personanatural.pena_NumeroRecibo,
                    pena_ArchivoNumeroRecibo: personanatural.pena_ArchivoNumeroRecibo,
                    pena_NombreArchDNI: personanatural.pena_ArchivoDNI,
                    pena_NombreArchRTN: personanatural.pena_NombreArchRTN,
                    pena_NombreArchRecibo: personanatural.pena_NombreArchRecibo,
                    pena_FechaCreacion: personanatural.pena_FechaCreacion
                }
            })
        }

    }
    catch(err){
        return []
    }
}