import axios from 'axios'
import React, { useState }  from 'react';
import PDFGenerator from '../components/pdf';  

  
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
            console.error('API key es indefinida.')
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
        console.log (data)
        let  resultado;
        switch (enviar.contrato) {
            case 'CI':
                resultado = data.data as ComercianteIndividual[];
                break;
              case 'PJ':
                resultado = data.data as PersonaJuridica[];
                break;
              case 'PN':
                resultado = data.data as PersonaNatural[];
                break;
              default:
                resultado = [];
                break;
          }
        console.log('Mapped resultado:', JSON.stringify(resultado, null, 2));
        return resultado

    }
    catch(err){
    console.error('Error in cargar reporte:', err)
    return []
    }
}