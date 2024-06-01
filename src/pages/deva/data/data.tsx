import axios from 'axios'

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
