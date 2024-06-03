import { z } from 'zod'

const reporteschema = z.object ({
    fechaInicio: z.string(),
    fechaFin: z.string(),
    contrato: z.string()
})


export const PersonaNaturalschema = z.object ({
    pena_Id: z.number(),
    pers_Nombre: z.string(),
    pena_DireccionExacta: z.string(),
    ciud_Nombre: z.string(),
    pena_TelefonoFijo: z.string(),
    pena_TelefonoCelular : z.string(),
    pena_CorreoElectronico: z.string(), 
    pena_CorreoAlternativo: z.string(),
    pena_RTN: z.string(),
    pena_ArchivoRTN: z.string(),
    pena_DNI: z.string(),
    pena_ArchivoDNI: z.string(),
    pena_NumeroRecibo: z.string(),
    pena_ArchivoNumeroRecibo: z.string(),
    pena_NombreArchDNI: z.string(),
    pena_NombreArchRTN: z.string(),
    pena_NombreArchRecibo: z.string(),
    pena_FechaCreacion: z.string(),
})

export const PersonaJuridicaschema  = z.object ({
    peju_Id: z.number(),
    pers_Nombre: z.string(),
    peju_PuntoReferencia: z.string(),
    peju_NumeroLocalRepresentante: z.string(),
    peju_PuntoReferenciaRepresentante: z.string(),
    peju_TelefonoEmpresa: z.string(),
    peju_TelefonoFijoRepresentanteLegal: z.string(),
    peju_TelefonoRepresentanteLegal: z.string(),
    peju_CorreoElectronico: z.string(),
    peju_CorreoElectronicoAlternativo: z.string(),
    ciud_Nombre: z.string(),
    colo_Nombre: z.string(),
    alde_Nombre: z.string(),
    peju_CiudadRepresentante: z.string(), 
    ColoniaRepresentante: z.string(),
    peju_AldeaRepresentante: z.string(), 
    peju_NumeroLocalApart: z.string(),
    peju_FechaCreacion: z.string(),
})

export const ComercianteIndividualschema = z.object({
    coin_Id: z.number(),
    pers_Nombre: z.string(),
    pers_FormaRepresentacion: z.string(),
    ciud_Nombre: z.string(),
    colo_Nombre: z.string(),
    alde_Nombre: z.string(),
    coin_TelefonoCelular: z.string(),
    coin_TelefonoFijo: z.string(), 
    coin_CorreoElectronico: z.string(),
    coin_CorreoElectronicoAlternativo: z.string(),
    coin_FechaCreacion: z.string(),
})

export type Reporte = z.infer<typeof reporteschema>
export type PersonaNatural = z.infer<typeof PersonaNaturalschema>
export type PersonaJuridica = z.infer<typeof PersonaJuridicaschema>
export type ComercianteIndividual = z.infer<typeof ComercianteIndividualschema>