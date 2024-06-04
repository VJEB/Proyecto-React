import axios from 'axios'
import { Factura } from './schema'

interface Deva {
  deva_Id: number
  deva_AduanaIngresoId: number
  adua_IngresoNombre: string
  adua_IngresoCodigo: string
  adua_DespachoCodigo: string
  regi_Id: number
  regi_Codigo: string
  regi_Descripcion: string
  inco_Codigo: string | null
  duca_No_DUCA: string | null
  deva_AduanaDespachoId: number
  adua_DespachoNombre: string
  deva_DeclaracionMercancia: string
  deva_FechaAceptacion: string
  deva_Finalizacion: boolean
  deva_PagoEfectuado: boolean | null
  pais_ExportacionId: number | null
  pais_ExportacionNombre: string | null
  deva_FechaExportacion: string | null
  mone_Id: number | null
  mone_Otra: string | null
  monedaNombre: string | null
  deva_ConversionDolares: number | null
  emba_Id: number | null
  lugarEmbarque: string | null
  nico_Id: number
  nico_Descripcion: string
  emba_Codigo: string | null
  impo_Id: number
  impo_NumRegistro: string
  impo_RTN: string
  impo_NivelComercial_Otro: string | null
  impo_Nombre_Raso: string
  impo_Direccion_Exacta: string
  impo_CiudadNombre: string
  impo_PaisNombre: string
  impo_Correo_Electronico: string
  impo_Telefono: string
  impo_Fax: string | null
  impo_ciudId: number
  impo_paisId: number
  coco_Id: number
  coco_Descripcion: string
  pvde_Condicion_Otra: string | null
  pvde_Id: number
  prov_NumeroIdentificacion: string
  prov_Nombre_Raso: string
  prov_Direccion_Exacta: string
  prov_CiudadNombre: string
  prov_PaisNombre: string
  prov_Correo_Electronico: string
  prov_Telefono: string
  prov_Fax: string | null
  prov_ciudId: number
  prov_paisId: number
  tite_Id: number | null
  tipoIntermediario: string | null
  inte_Id: number | null
  inte_ciudId: number | null
  inte_paisId: number | null
  inte_Tipo_Otro: string | null
  inte_NumeroIdentificacion: string | null
  inte_Nombre_Raso: string | null
  inte_Direccion_Exacta: string | null
  inte_Correo_Electronico: string | null
  inte_CiudadNombre: string | null
  inte_PaisNombre: string | null
  inte_Telefono: string | null
  inte_Fax: string | null
  deva_LugarEntrega: string | null
  pais_EntregaId: number | null
  pais_EntregaNombre: string | null
  inco_Descripcion: string | null
  inco_Version: string | null
  deva_NumeroContrato: string | null
  deva_FechaContrato: string | null
  foen_Id: number | null
  foen_Descripcion: string | null
  deva_FormaEnvioOtra: string | null
  fopa_Id: number | null
  fopa_Descripcion: string | null
  deva_FormaPagoOtra: string | null
  codi_Id: number | null
  codi_Restricciones_Utilizacion: string | null
  codi_Indicar_Restricciones_Utilizacion: boolean | null
  codi_Depende_Precio_Condicion: boolean | null
  codi_Indicar_Existe_Condicion: boolean | null
  codi_Condicionada_Revertir: boolean | null
  codi_Vinculacion_Comprador_Vendedor: boolean | null
  codi_Tipo_Vinculacion: string | null
  codi_Vinculacion_Influye_Precio: boolean | null
  codi_Pagos_Descuentos_Indirectos: boolean | null
  codi_Concepto_Monto_Declarado: number | null
  codi_Existen_Canones: boolean | null
  codi_Indicar_Canones: boolean | null
  base_Id: number | null
  base_PrecioFactura: number | null
  base_PagosIndirectos: number | null
  base_PrecioReal: number | null
  base_MontCondicion: number | null
  base_MontoReversion: number | null
  base_ComisionCorrelaje: number | null
  base_Gasto_Envase_Embalaje: number | null
  base_ValoresMateriales_Incorporado: number | null
  base_Valor_Materiales_Utilizados: number | null
  base_Valor_Materiales_Consumidos: number | null
  base_Valor_Ingenieria_Importado: number | null
  base_Valor_Canones: number | null
  base_Gasto_TransporteM_Importada: number | null
  base_Gastos_Carga_Importada: number | null
  base_Costos_Seguro: number | null
  base_Total_Ajustes_Precio_Pagado: number | null
  base_Gastos_Asistencia_Tecnica: number | null
  base_Gastos_Transporte_Posterior: number | null
  base_Derechos_Impuestos: number | null
  base_Monto_Intereses: number | null
  base_Deducciones_Legales: number | null
  base_Total_Deducciones_Precio: number | null
  base_Valor_Aduana: number | null
  usua_UsuarioCreacion: number
  usua_CreacionNombre: string
  deva_FechaCreacion: string
  usua_ModificacionNombre: string
  deva_FechaModificacion: string
  deva_Estado: boolean
}
export const getDevas = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Declaracion_Valor/Listar',
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.map((deva: Deva) => {
      return {
        deva_Id: deva.deva_Id,
        deva_AduanaIngresoId: deva.deva_AduanaIngresoId,
        adua_IngresoNombre: deva.adua_IngresoNombre,
        adua_IngresoCodigo: deva.adua_IngresoCodigo,
        adua_DespachoCodigo: deva.adua_DespachoCodigo,
        regi_Id: deva.regi_Id,
        regi_Codigo: deva.regi_Codigo,
        regi_Descripcion: deva.regi_Descripcion,
        inco_Codigo: deva.inco_Codigo,
        duca_No_DUCA: deva.duca_No_DUCA,
        deva_AduanaDespachoId: deva.deva_AduanaDespachoId,
        adua_DespachoNombre: deva.adua_DespachoNombre,
        deva_DeclaracionMercancia: deva.deva_DeclaracionMercancia,
        deva_FechaAceptacion: deva.deva_FechaAceptacion,
        deva_Finalizacion: deva.deva_Finalizacion,
        deva_PagoEfectuado: deva.deva_PagoEfectuado,
        pais_ExportacionId: deva.pais_ExportacionId,
        pais_ExportacionNombre: deva.pais_ExportacionNombre,
        deva_FechaExportacion: deva.deva_FechaExportacion,
        mone_Id: deva.mone_Id,
        mone_Otra: deva.mone_Otra,
        monedaNombre: deva.monedaNombre,
        deva_ConversionDolares: deva.deva_ConversionDolares,
        emba_Id: deva.emba_Id,
        lugarEmbarque: deva.lugarEmbarque,
        nico_Id: deva.nico_Id,
        nico_Descripcion: deva.nico_Descripcion,
        emba_Codigo: deva.emba_Codigo,
        impo_Id: deva.impo_Id,
        impo_NumRegistro: deva.impo_NumRegistro,
        impo_RTN: deva.impo_RTN,
        impo_NivelComercial_Otro: deva.impo_NivelComercial_Otro,
        impo_Nombre_Raso: deva.impo_Nombre_Raso,
        impo_Direccion_Exacta: deva.impo_Direccion_Exacta,
        impo_CiudadNombre: deva.impo_CiudadNombre,
        impo_PaisNombre: deva.impo_PaisNombre,
        impo_Correo_Electronico: deva.impo_Correo_Electronico,
        impo_Telefono: deva.impo_Telefono,
        impo_Fax: deva.impo_Fax,
        impo_ciudId: deva.impo_ciudId,
        impo_paisId: deva.impo_paisId,
        coco_Id: deva.coco_Id,
        coco_Descripcion: deva.coco_Descripcion,
        pvde_Condicion_Otra: deva.pvde_Condicion_Otra,
        pvde_Id: deva.pvde_Id,
        prov_NumeroIdentificacion: deva.prov_NumeroIdentificacion,
        prov_Nombre_Raso: deva.prov_Nombre_Raso,
        prov_Direccion_Exacta: deva.prov_Direccion_Exacta,
        prov_CiudadNombre: deva.prov_CiudadNombre,
        prov_PaisNombre: deva.prov_PaisNombre,
        prov_Correo_Electronico: deva.prov_Correo_Electronico,
        prov_Telefono: deva.prov_Telefono,
        prov_Fax: deva.prov_Fax,
        prov_ciudId: deva.prov_ciudId,
        prov_paisId: deva.prov_paisId,
        tite_Id: deva.tite_Id,
        tipoIntermediario: deva.tipoIntermediario,
        inte_Id: deva.inte_Id,
        inte_ciudId: deva.inte_ciudId,
        inte_paisId: deva.inte_paisId,
        inte_Tipo_Otro: deva.inte_Tipo_Otro,
        inte_NumeroIdentificacion: deva.inte_NumeroIdentificacion,
        inte_Nombre_Raso: deva.inte_Nombre_Raso,
        inte_Direccion_Exacta: deva.inte_Direccion_Exacta,
        inte_Correo_Electronico: deva.inte_Correo_Electronico,
        inte_CiudadNombre: deva.inte_CiudadNombre,
        inte_PaisNombre: deva.inte_PaisNombre,
        inte_Telefono: deva.inte_Telefono,
        inte_Fax: deva.inte_Fax,
        deva_LugarEntrega: deva.deva_LugarEntrega,
        pais_EntregaId: deva.pais_EntregaId,
        pais_EntregaNombre: deva.pais_EntregaNombre,
        inco_Descripcion: deva.inco_Descripcion,
        inco_Version: deva.inco_Version,
        deva_NumeroContrato: deva.deva_NumeroContrato,
        deva_FechaContrato: deva.deva_FechaContrato,
        foen_Id: deva.foen_Id,
        foen_Descripcion: deva.foen_Descripcion,
        deva_FormaEnvioOtra: deva.deva_FormaEnvioOtra,
        fopa_Id: deva.fopa_Id,
        fopa_Descripcion: deva.fopa_Descripcion,
        deva_FormaPagoOtra: deva.deva_FormaPagoOtra,
        codi_Id: deva.codi_Id,
        codi_Restricciones_Utilizacion: deva.codi_Restricciones_Utilizacion,
        codi_Indicar_Restricciones_Utilizacion:
          deva.codi_Indicar_Restricciones_Utilizacion,
        codi_Depende_Precio_Condicion: deva.codi_Depende_Precio_Condicion,
        codi_Indicar_Existe_Condicion: deva.codi_Indicar_Existe_Condicion,
        codi_Condicionada_Revertir: deva.codi_Condicionada_Revertir,
        codi_Vinculacion_Comprador_Vendedor:
          deva.codi_Vinculacion_Comprador_Vendedor,
        codi_Tipo_Vinculacion: deva.codi_Tipo_Vinculacion,
        codi_Vinculacion_Influye_Precio: deva.codi_Vinculacion_Influye_Precio,
        codi_Pagos_Descuentos_Indirectos: deva.codi_Pagos_Descuentos_Indirectos,
        codi_Concepto_Monto_Declarado: deva.codi_Concepto_Monto_Declarado,
        codi_Existen_Canones: deva.codi_Existen_Canones,
        codi_Indicar_Canones: deva.codi_Indicar_Canones,
        base_Id: deva.base_Id,
        base_PrecioFactura: deva.base_PrecioFactura,
        base_PagosIndirectos: deva.base_PagosIndirectos,
        base_PrecioReal: deva.base_PrecioReal,
        base_MontCondicion: deva.base_MontCondicion,
        base_MontoReversion: deva.base_MontoReversion,
        base_ComisionCorrelaje: deva.base_ComisionCorrelaje,
        base_Gasto_Envase_Embalaje: deva.base_Gasto_Envase_Embalaje,
        base_ValoresMateriales_Incorporado:
          deva.base_ValoresMateriales_Incorporado,
        base_Valor_Materiales_Utilizados: deva.base_Valor_Materiales_Utilizados,
        base_Valor_Materiales_Consumidos: deva.base_Valor_Materiales_Consumidos,
        base_Valor_Ingenieria_Importado: deva.base_Valor_Ingenieria_Importado,
        base_Valor_Canones: deva.base_Valor_Canones,
        base_Gasto_TransporteM_Importada: deva.base_Gasto_TransporteM_Importada,
        base_Gastos_Carga_Importada: deva.base_Gastos_Carga_Importada,
        base_Costos_Seguro: deva.base_Costos_Seguro,
        base_Total_Ajustes_Precio_Pagado: deva.base_Total_Ajustes_Precio_Pagado,
        base_Gastos_Asistencia_Tecnica: deva.base_Gastos_Asistencia_Tecnica,
        base_Gastos_Transporte_Posterior: deva.base_Gastos_Transporte_Posterior,
        base_Derechos_Impuestos: deva.base_Derechos_Impuestos,
        base_Monto_Intereses: deva.base_Monto_Intereses,
        base_Deducciones_Legales: deva.base_Deducciones_Legales,
        base_Total_Deducciones_Precio: deva.base_Total_Deducciones_Precio,
        base_Valor_Aduana: deva.base_Valor_Aduana,
        usua_UsuarioCreacion: deva.usua_UsuarioCreacion,
        usua_CreacionNombre: deva.usua_CreacionNombre,
        deva_FechaCreacion: deva.deva_FechaCreacion,
        usua_ModificacionNombre: deva.usua_ModificacionNombre,
        deva_FechaModificacion: deva.deva_FechaModificacion,
        deva_Estado: deva.deva_Estado,
      }
    })
  } catch (error) {
    return []
  }
}
export const guardarDeva = async (Deva: Deva) => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    // Deva.usua_UsuarioModificacion = 1
    // Deva.proc_FechaModificacion = new Date().toISOString()

    const response = await axios.post(
      `${import.meta.env.VITE_API_SimexPro_Url}api/Devas/${Deva.deva_Id === 0 ? 'Insertar' : 'Editar'}`,
      Deva,
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.messageStatus === '1'
  } catch (error) {
    return false
  }
}

export const cancelarDeva = async (
  devaId: number,
  factId: number,
  codiId: number,
  baseId: number
) => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_SimexPro_Url}api/Declaracion_Valor/CancelarDeclaracionValor?deva_Id=${devaId}&fact_Id=${factId}&codi_Id=${codiId}&base_Id=${baseId}`,
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.messageStatus === '1'
  } catch (error) {
    return false
  }
}

interface Aduana {
  adua_Id: number
  adua_Codigo: string
  adua_Nombre: string
  adua_Direccion_Exacta: string
  pvin_Nombre: string
  pvin_Id: string
  ciud_Id: string
  ciud_Nombre: string
  usua_UsuarioCreacion: number
  adua_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  adua_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  adua_FechaEliminacion: string | null
  usarioCreacion: string
  usuarioModificacion: string | null
}

export const getAduanas = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Aduanas/Listar',
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.map((aduana: Aduana) => {
      return {
        adua_Id: aduana.adua_Id,
        adua_Codigo: aduana.adua_Codigo,
        adua_Nombre: aduana.adua_Nombre,
        adua_Direccion_Exacta: aduana.adua_Direccion_Exacta,
        pvin_Nombre: aduana.pvin_Nombre,
        pvin_Id: aduana.pvin_Id,
        ciud_Id: aduana.ciud_Id,
        ciud_Nombre: aduana.ciud_Nombre,
        usua_UsuarioCreacion: aduana.usua_UsuarioCreacion,
        adua_FechaCreacion: aduana.adua_FechaCreacion,
        usua_UsuarioModificacion: aduana.usua_UsuarioModificacion,
        adua_FechaModificacion: aduana.adua_FechaModificacion,
        usua_UsuarioEliminacion: aduana.usua_UsuarioEliminacion,
        adua_FechaEliminacion: aduana.adua_FechaEliminacion,
        usarioCreacion: aduana.usarioCreacion,
        usuarioModificacion: aduana.usuarioModificacion,
      }
    })
  } catch (error) {
    return []
  }
}

interface Ciudad {
  ciud_Id: number
  ciud_Nombre: string
  pvin_Id: number
  pvin_Nombre: string
  pvin_Codigo: string
  pais_Codigo: string
  pais_Nombre: string
  pais_Id: number
  ciud_EsAduana: boolean | null
  usua_UsuarioCreacion: number
  usua_UsuarioModificacion: number | null
  usuarioCreacionNombre: string
  ciud_FechaCreacion: string
  usuarioModificacionNombre: string | null
  ciud_FechaModificacion: string | null
  usua_UsuarioEliminacion: string | null
  ciud_FechaEliminacion: string | null
  ciud_Estado: boolean | null
}

export const getCiudades = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Ciudades/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((ciudad: Ciudad) => {
      return {
        ciud_Id: ciudad.ciud_Id,
        ciud_Nombre: ciudad.ciud_Nombre,
        pvin_Id: ciudad.pvin_Id,
        pvin_Nombre: ciudad.pvin_Nombre,
        pvin_Codigo: ciudad.pvin_Codigo,
        pais_Codigo: ciudad.pais_Codigo,
        pais_Nombre: ciudad.pais_Nombre,
        pais_Id: ciudad.pais_Id,
        ciud_EsAduana: ciudad.ciud_EsAduana,
        usua_UsuarioCreacion: ciudad.usua_UsuarioCreacion,
        usua_UsuarioModificacion: ciudad.usua_UsuarioModificacion,
        usuarioCreacionNombre: ciudad.usuarioCreacionNombre,
        ciud_FechaCreacion: ciudad.ciud_FechaCreacion,
        usuarioModificacionNombre: ciudad.usuarioModificacionNombre,
        ciud_FechaModificacion: ciudad.ciud_FechaModificacion,
        usua_UsuarioEliminacion: ciudad.usua_UsuarioEliminacion,
        ciud_FechaEliminacion: ciudad.ciud_FechaEliminacion,
        ciud_Estado: ciudad.ciud_Estado,
      }
    })
  } catch (error) {
    console.error('Error al cargar las ciudades:', error)
    return []
  }
}

interface NivelComercial {
  nico_Id: number
  nico_Codigo: string
  nico_Descripcion: string
  usua_UsuarioCreacion: number
  usuarioCreacionNombre: string
  nico_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  usuarioModificacionNombre: string | null
  nico_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  usuarioEliminacionNombre: string | null
  nico_FechaEliminacion: string | null
  nico_Estado: boolean
}

export const getNivelesComerciales = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/NivelesComerciales/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((nico: NivelComercial) => {
      return {
        nico_Id: nico.nico_Id,
        nico_Codigo: nico.nico_Codigo,
        nico_Descripcion: nico.nico_Descripcion,
        usua_UsuarioCreacion: nico.usua_UsuarioCreacion,
        usuarioCreacionNombre: nico.usuarioCreacionNombre,
        nico_FechaCreacion: nico.nico_FechaCreacion,
        usua_UsuarioModificacion: nico.usua_UsuarioModificacion,
        usuarioModificacionNombre: nico.usuarioModificacionNombre,
        nico_FechaModificacion: nico.nico_FechaModificacion,
        usua_UsuarioEliminacion: nico.usua_UsuarioEliminacion,
        usuarioEliminacionNombre: nico.usuarioEliminacionNombre,
        nico_FechaEliminacion: nico.nico_FechaEliminacion,
        nico_Estado: nico.nico_Estado,
      }
    })
  } catch (error) {
    console.error('Error al cargar los niveles comerciales:', error)
    return []
  }
}

interface CondicionComercial {
  coco_Id: number
  coco_Codigo: string
  coco_Descripcion: string
  usua_UsuarioCreacion: number
  usuarioNombreCreacion: string
  coco_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  usuarioModificadorNombre: string | null
  coco_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  usuarioNombreEliminacion: string | null
  coco_FechaEliminacion: string | null
  coco_Estado: boolean
}

export const getCondicionesComerciales = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url +
        'api/CondicionesComerciales/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((coco: CondicionComercial) => {
      return {
        coco_Id: coco.coco_Id,
        coco_Codigo: coco.coco_Codigo,
        coco_Descripcion: coco.coco_Descripcion,
        usua_UsuarioCreacion: coco.usua_UsuarioCreacion,
        usuarioNombreCreacion: coco.usuarioNombreCreacion,
        coco_FechaCreacion: coco.coco_FechaCreacion,
        usua_UsuarioModificacion: coco.usua_UsuarioModificacion,
        usuarioModificadorNombre: coco.usuarioModificadorNombre,
        coco_FechaModificacion: coco.coco_FechaModificacion,
        usua_UsuarioEliminacion: coco.usua_UsuarioEliminacion,
        usuarioNombreEliminacion: coco.usuarioNombreEliminacion,
        coco_FechaEliminacion: coco.coco_FechaEliminacion,
        coco_Estado: coco.coco_Estado,
      }
    })
  } catch (error) {
    console.error('Error al cargar las condiciones comerciales:', error)
    return []
  }
}

interface TipoDeIntermediario {
  tite_Id: number
  tite_Codigo: string
  tite_Descripcion: string
  usua_UsuarioCreacion: number
  tite_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  tite_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  tite_FechaEliminacion: string | null
  tite_Estado: boolean
  usarioCreacion: string
  usuarioModificacion: string | null
}

export const getTiposDeIntermediarios = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/TipoIntermediario/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((tiin: TipoDeIntermediario) => {
      return {
        tite_Id: tiin.tite_Id,
        tite_Codigo: tiin.tite_Codigo,
        tite_Descripcion: tiin.tite_Descripcion,
        usua_UsuarioCreacion: tiin.usua_UsuarioCreacion,
        tite_FechaCreacion: tiin.tite_FechaCreacion,
        usua_UsuarioModificacion: tiin.usua_UsuarioModificacion,
        tite_FechaModificacion: tiin.tite_FechaModificacion,
        usua_UsuarioEliminacion: tiin.usua_UsuarioEliminacion,
        tite_FechaEliminacion: tiin.tite_FechaEliminacion,
        tite_Estado: tiin.tite_Estado,
        usarioCreacion: tiin.usarioCreacion,
        usuarioModificacion: tiin.usuarioModificacion,
      }
    })
  } catch (error) {
    console.error('Error al cargar los tipos de intermediarios:', error)
    return []
  }
}

interface Incoterm {
  inco_Id: number
  inco_Codigo: string
  inco_Descripcion: string
  usua_UsuarioCreacion: number
  inco_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  inco_FechaModificacion: string | null
  usuarioCreacionNombre: string
  usuarioModificadorNombre: string | null
  usua_UsuarioEliminacion: number | null
  inco_FechaEliminacion: string | null
  inco_Estado: boolean
}

export const getIncoterms = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Incoterm/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((inco: Incoterm) => {
      return {
        inco_Id: inco.inco_Id,
        inco_Codigo: inco.inco_Codigo,
        inco_Descripcion: inco.inco_Descripcion,
        usua_UsuarioCreacion: inco.usua_UsuarioCreacion,
        inco_FechaCreacion: inco.inco_FechaCreacion,
        usua_UsuarioModificacion: inco.usua_UsuarioModificacion,
        inco_FechaModificacion: inco.inco_FechaModificacion,
        usuarioCreacionNombre: inco.usuarioCreacionNombre,
        usuarioModificadorNombre: inco.usuarioModificadorNombre,
        usua_UsuarioEliminacion: inco.usua_UsuarioEliminacion,
        inco_FechaEliminacion: inco.inco_FechaEliminacion,
        inco_Estado: inco.inco_Estado,
      }
    })
  } catch (error) {
    console.error('Error al cargar los incoterms:', error)
    return []
  }
}

interface FormaDeEnvio {
  foen_Id: number
  foen_Codigo: string
  foen_Descripcion: string
  usua_UsuarioCreacion: number
  foen_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  foen_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  usuarioCreacionNombre: string
  usuarioModificacionNombre: string | null
  usuarioEliminacionNombre: string | null
  foen_FechaEliminacion: string | null
  foen_Estado: boolean
}

export const getFormasDeEnvio = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/FormasEnvio/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((foen: FormaDeEnvio) => {
      return {
        foen_Id: foen.foen_Id,
        foen_Codigo: foen.foen_Codigo,
        foen_Descripcion: foen.foen_Descripcion,
        usua_UsuarioCreacion: foen.usua_UsuarioCreacion,
        foen_FechaCreacion: foen.foen_FechaCreacion,
        usua_UsuarioModificacion: foen.usua_UsuarioModificacion,
        foen_FechaModificacion: foen.foen_FechaModificacion,
        usua_UsuarioEliminacion: foen.usua_UsuarioEliminacion,
        usuarioCreacionNombre: foen.usuarioCreacionNombre,
        usuarioModificacionNombre: foen.usuarioModificacionNombre,
        usuarioEliminacionNombre: foen.usuarioEliminacionNombre,
        foen_FechaEliminacion: foen.foen_FechaEliminacion,
        foen_Estado: foen.foen_Estado,
      }
    })
  } catch (error) {
    console.error('Error al cargar las formas de envío:', error)
    return []
  }
}

interface FormaDePago {
  fopa_Id: number
  fopa_Descripcion: string
  usua_UsuarioCreacion: number
  fopa_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  fopa_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  fopa_FechaEliminacion: string | null
  fopa_Estado: boolean
  usua_NombreCreacion: string
  usua_NombreModificacion: string | null
}

export const getFormasDePago = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/FormasDePago/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((fopa: FormaDePago) => {
      return {
        fopa_Id: fopa.fopa_Id,
        fopa_Descripcion: fopa.fopa_Descripcion,
        usua_UsuarioCreacion: fopa.usua_UsuarioCreacion,
        fopa_FechaCreacion: fopa.fopa_FechaCreacion,
        usua_UsuarioModificacion: fopa.usua_UsuarioModificacion,
        fopa_FechaModificacion: fopa.fopa_FechaModificacion,
        usua_UsuarioEliminacion: fopa.usua_UsuarioEliminacion,
        fopa_FechaEliminacion: fopa.fopa_FechaEliminacion,
        fopa_Estado: fopa.fopa_Estado,
        usua_NombreCreacion: fopa.usua_NombreCreacion,
        usua_NombreModificacion: fopa.usua_NombreModificacion,
      }
    })
  } catch (error) {
    console.error('Error al cargar las formas de pago:', error)
    return []
  }
}

interface Moneda {
  mone_Id: number
  mone_Codigo: string
  mone_Descripcion: string
  mone_EsAduana: boolean
  usua_UsuarioCreacion: number
  usuarioModificacionNombre: string | null
  mone_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  usuarioCreacionNombre: string
  mone_FechaModificacion: string | null
  mone_Estado: boolean
}

export const getMonedas = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Moneda/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((mone: Moneda) => {
      return {
        mone_Id: mone.mone_Id,
        mone_Codigo: mone.mone_Codigo,
        mone_Descripcion: mone.mone_Descripcion,
        mone_EsAduana: mone.mone_EsAduana,
        usua_UsuarioCreacion: mone.usua_UsuarioCreacion,
        usuarioModificacionNombre: mone.usuarioModificacionNombre,
        mone_FechaCreacion: mone.mone_FechaCreacion,
        usua_UsuarioModificacion: mone.usua_UsuarioModificacion,
        usuarioCreacionNombre: mone.usuarioCreacionNombre,
        mone_FechaModificacion: mone.mone_FechaModificacion,
        mone_Estado: mone.mone_Estado,
      }
    })
  } catch (error) {
    console.error('Error al cargar las monedas:', error)
    return []
  }
}

interface Pais {
  pais_Id: number
  pais_Codigo: string
  pais_Nombre: string
  pais_prefijo: string
  pais_EsAduana: boolean
  usua_UsuarioCreacion: number
  usuarioCreacionNombre: string
  pais_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  usuarioModificadorNombre: string | null
  pais_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  pais_FechaEliminacion: string | null
  pais_Estado: boolean
  fechaInicio: string
  fechaFin: string
  detalles: string | null
}

export const getPaises = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Paises/Listar',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((pais: Pais) => {
      return {
        pais_Id: pais.pais_Id,
        pais_Codigo: pais.pais_Codigo,
        pais_Nombre: pais.pais_Nombre,
        pais_prefijo: pais.pais_prefijo,
        pais_EsAduana: pais.pais_EsAduana,
        usua_UsuarioCreacion: pais.usua_UsuarioCreacion,
        usuarioCreacionNombre: pais.usuarioCreacionNombre,
        pais_FechaCreacion: pais.pais_FechaCreacion,
        usua_UsuarioModificacion: pais.usua_UsuarioModificacion,
        usuarioModificadorNombre: pais.usuarioModificadorNombre,
        pais_FechaModificacion: pais.pais_FechaModificacion,
        usua_UsuarioEliminacion: pais.usua_UsuarioEliminacion,
        pais_FechaEliminacion: pais.pais_FechaEliminacion,
        pais_Estado: pais.pais_Estado,
        fechaInicio: pais.fechaInicio,
        fechaFin: pais.fechaFin,
        detalles: pais.detalles,
      }
    })
  } catch (error) {
    console.error('Error al cargar los paises:', error)
    return []
  }
}

interface Embarque {
  emba_Id: number
  emba_Codigo: string
  emba_Descripcion: string
  usua_UsuarioCreacion: number
  usuarioCreacionNombre: string
  emba_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  usuarioModificacionNombre: string | null
  emba_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  usuarioEliminacionNombre: string | null
  emba_FechaEliminacion: string | null
  emba_Estado: boolean
}

export const getEmbarques = async (pais_Codigo: string) => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url +
        `api/LugaresEmbarque/Listar?codigo=${pais_Codigo}`,
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((emba: Embarque) => {
      return {
        emba_Id: emba.emba_Id,
        emba_Codigo: emba.emba_Codigo,
        emba_Descripcion: emba.emba_Descripcion,
        usua_UsuarioCreacion: emba.usua_UsuarioCreacion,
        usuarioCreacionNombre: emba.usuarioCreacionNombre,
        emba_FechaCreacion: emba.emba_FechaCreacion,
        usua_UsuarioModificacion: emba.usua_UsuarioModificacion,
        usuarioModificacionNombre: emba.usuarioModificacionNombre,
        emba_FechaModificacion: emba.emba_FechaEliminacion,
        usua_UsuarioEliminacion: emba.usua_UsuarioEliminacion,
        usuarioEliminacionNombre: emba.usuarioEliminacionNombre,
        emba_FechaEliminacion: emba.emba_FechaEliminacion,
        emba_Estado: emba.emba_Estado,
      }
    })
  } catch (error) {
    console.error('Error al cargar los embarques:', error)
    return []
  }
}

export const getFacturas = async (deva_Id: number) => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url +
        `api//api/Facturas/Listar/Listar?deva_Id=${deva_Id}`,
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data.data.map((fact: Factura) => fact)
  } catch (error) {
    console.error('Error al cargar los embarques:', error)
    return []
  }
}
