import { z } from 'zod'

const devaSchema = z.object({
  deva_Id: z.number(),
  deva_AduanaIngresoId: z.number(),
  adua_IngresoNombre: z.string(),
  adua_IngresoCodigo: z.string(),
  adua_DespachoCodigo: z.string(),
  regi_Id: z.number(),
  regi_Codigo: z.string(),
  regi_Descripcion: z.string(),
  inco_Codigo: z.string().nullable(),
  duca_No_DUCA: z.string().nullable(),
  deva_AduanaDespachoId: z.number(),
  adua_DespachoNombre: z.string(),
  deva_DeclaracionMercancia: z.string(),
  deva_FechaAceptacion: z.string(),
  deva_Finalizacion: z.boolean(),
  deva_PagoEfectuado: z.boolean().nullable(),
  pais_ExportacionId: z.number().nullable(),
  pais_ExportacionNombre: z.string().nullable(),
  deva_FechaExportacion: z.string().nullable(),
  mone_Id: z.number().nullable(),
  mone_Otra: z.string().nullable(),
  monedaNombre: z.string().nullable(),
  deva_ConversionDolares: z.number().nullable(),
  emba_Id: z.number().nullable(),
  lugarEmbarque: z.string().nullable(),
  nico_Id: z.number(),
  nico_Descripcion: z.string(),
  emba_Codigo: z.string().nullable(),
  impo_Id: z.number(),
  impo_NumRegistro: z.string(),
  impo_RTN: z.string(),
  impo_NivelComercial_Otro: z.string().nullable(),
  impo_Nombre_Raso: z.string(),
  impo_Direccion_Exacta: z.string(),
  impo_CiudadNombre: z.string(),
  impo_PaisNombre: z.string(),
  impo_Correo_Electronico: z.string(),
  impo_Telefono: z.string(),
  impo_Fax: z.string().nullable(),
  impo_ciudId: z.number(),
  impo_paisId: z.number(),
  coco_Id: z.number(),
  coco_Descripcion: z.string(),
  pvde_Condicion_Otra: z.string().nullable(),
  pvde_Id: z.number(),
  prov_NumeroIdentificacion: z.string(),
  prov_Nombre_Raso: z.string(),
  prov_Direccion_Exacta: z.string(),
  prov_CiudadNombre: z.string(),
  prov_PaisNombre: z.string(),
  prov_Correo_Electronico: z.string(),
  prov_Telefono: z.string(),
  prov_Fax: z.string().nullable(),
  prov_ciudId: z.number(),
  prov_paisId: z.number(),
  tite_Id: z.number().nullable(),
  tipoIntermediario: z.string().nullable(),
  inte_Id: z.number().nullable(),
  inte_ciudId: z.number().nullable(),
  inte_paisId: z.number().nullable(),
  inte_Tipo_Otro: z.string().nullable(),
  inte_NumeroIdentificacion: z.string().nullable(),
  inte_Nombre_Raso: z.string().nullable(),
  inte_Direccion_Exacta: z.string().nullable(),
  inte_Correo_Electronico: z.string().nullable(),
  inte_CiudadNombre: z.string().nullable(),
  inte_PaisNombre: z.string().nullable(),
  inte_Telefono: z.string().nullable(),
  inte_Fax: z.string().nullable(),
  deva_LugarEntrega: z.string().nullable(),
  pais_EntregaId: z.number().nullable(),
  pais_EntregaNombre: z.string().nullable(),
  inco_Descripcion: z.string().nullable(),
  inco_Version: z.string().nullable(),
  deva_NumeroContrato: z.string().nullable(),
  deva_FechaContrato: z.string().nullable(),
  foen_Id: z.number().nullable(),
  foen_Descripcion: z.string().nullable(),
  deva_FormaEnvioOtra: z.string().nullable(),
  fopa_Id: z.number().nullable(),
  fopa_Descripcion: z.string().nullable(),
  deva_FormaPagoOtra: z.string().nullable(),
  codi_Id: z.number().nullable(),
  codi_Restricciones_Utilizacion: z.string().nullable(),
  codi_Indicar_Restricciones_Utilizacion: z.boolean().nullable(),
  codi_Depende_Precio_Condicion: z.boolean().nullable(),
  codi_Indicar_Existe_Condicion: z.boolean().nullable(),
  codi_Condicionada_Revertir: z.boolean().nullable(),
  codi_Vinculacion_Comprador_Vendedor: z.boolean().nullable(),
  codi_Tipo_Vinculacion: z.string().nullable(),
  codi_Vinculacion_Influye_Precio: z.boolean().nullable(),
  codi_Pagos_Descuentos_Indirectos: z.boolean().nullable(),
  codi_Concepto_Monto_Declarado: z.number().nullable(),
  codi_Existen_Canones: z.boolean().nullable(),
  codi_Indicar_Canones: z.boolean().nullable(),
  base_Id: z.number().nullable(),
  base_PrecioFactura: z.number().nullable(),
  base_PagosIndirectos: z.number().nullable(),
  base_PrecioReal: z.number().nullable(),
  base_MontCondicion: z.number().nullable(),
  base_MontoReversion: z.number().nullable(),
  base_ComisionCorrelaje: z.number().nullable(),
  base_Gasto_Envase_Embalaje: z.number().nullable(),
  base_ValoresMateriales_Incorporado: z.number().nullable(),
  base_Valor_Materiales_Utilizados: z.number().nullable(),
  base_Valor_Materiales_Consumidos: z.number().nullable(),
  base_Valor_Ingenieria_Importado: z.number().nullable(),
  base_Valor_Canones: z.number().nullable(),
  base_Gasto_TransporteM_Importada: z.number().nullable(),
  base_Gastos_Carga_Importada: z.number().nullable(),
  base_Costos_Seguro: z.number().nullable(),
  base_Total_Ajustes_Precio_Pagado: z.number().nullable(),
  base_Gastos_Asistencia_Tecnica: z.number().nullable(),
  base_Gastos_Transporte_Posterior: z.number().nullable(),
  base_Derechos_Impuestos: z.number().nullable(),
  base_Monto_Intereses: z.number().nullable(),
  base_Deducciones_Legales: z.number().nullable(),
  base_Total_Deducciones_Precio: z.number().nullable(),
  base_Valor_Aduana: z.number().nullable(),
  usua_UsuarioCreacion: z.number(),
  usua_CreacionNombre: z.string(),
  deva_FechaCreacion: z.string(),
  usua_ModificacionNombre: z.string(),
  deva_FechaModificacion: z.string(),
  deva_Estado: z.boolean(),
})

// Define the nested schemas first
const declaraciones_ValorViewModelSchema = z.object({
  deva_Id: z.number(),
  deva_AduanaIngresoId: z.number(),
  adua_IngresoNombre: z.string(),
  deva_AduanaDespachoId: z.number(),
  adua_DespachoNombre: z.string(),
  deva_DeclaracionMercancia: z.string(),
  deva_FechaAceptacion: z.string().datetime(),
  regi_Id: z.number(),
  regi_Codigo: z.string(),
  regi_Descripcion: z.string(),
  impo_RTN: z.string(),
  impo_Id: z.number(),
  impo_NumRegistro: z.string(),
  nico_Id: z.number(),
  nico_Descripcion: z.string(),
  impo_NivelComercial_Otro: z.string(),
  impo_Nombre_Raso: z.string(),
  impo_Direccion_Exacta: z.string(),
  impo_Correo_Electronico: z.string(),
  impo_Telefono: z.string(),
  impo_Fax: z.string(),
  impo_ciudId: z.number(),
  pvde_Id: z.number(),
  prov_Nombre_Raso: z.string(),
  prov_Direccion_Exacta: z.string(),
  prov_Correo_Electronico: z.string(),
  prov_Telefono: z.string(),
  prov_Fax: z.string(),
  prov_ciudId: z.number(),
  coco_Id: z.number(),
  coco_Descripcion: z.string(),
  pvde_Condicion_Otra: z.string(),
  inte_Id: z.number(),
  tite_Id: z.number(),
  inte_Nombre_Raso: z.string(),
  inte_Direccion_Exacta: z.string(),
  inte_Correo_Electronico: z.string(),
  inte_Telefono: z.string(),
  inte_Fax: z.string(),
  inte_ciudId: z.number(),
  deva_LugarEntrega: z.string(),
  pais_EntregaId: z.number(),
  inco_Id: z.number(),
  inco_Descripcion: z.string(),
  inco_Version: z.string(),
  deva_NumeroContrato: z.string(),
  deva_FechaContrato: z.string().datetime(),
  foen_Id: z.number(),
  foen_Descripcion: z.string(),
  deva_FormaEnvioOtra: z.string(),
  deva_PagoEfectuado: z.boolean(),
  fopa_Id: z.number(),
  deva_FormaPagoOtra: z.string(),
  emba_Id: z.number(),
  pais_ExportacionId: z.number(),
  deva_FechaExportacion: z.string().datetime(),
  mone_Id: z.number(),
  mone_Otra: z.string(),
  deva_ConversionDolares: z.number(),
  deva_Condiciones: z.string(),
  usua_UsuarioCreacion: z.number(),
  usua_CreacionNombre: z.string(),
  deva_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number(),
  usua_ModificacionNombre: z.string(),
  deva_FechaModificacion: z.string().datetime(),
  deva_Estado: z.boolean(),
  usua_UsuarioEliminacion: z.number(),
  deva_FechaEliminacion: z.string().datetime(),
})

const declarantesImpo_ViewModelSchema = z.object({
  decl_Id: z.number(),
  decl_NumeroIdentificacion: z.string(),
  decl_Nombre_Raso: z.string(),
  decl_Direccion_Exacta: z.string(),
  ciud_Id: z.number(),
  decl_Correo_Electronico: z.string(),
  decl_Telefono: z.string(),
  decl_Fax: z.string(),
  usua_UsuarioCreacion: z.number(),
  decl_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number(),
  decl_FechaModificacion: z.string().datetime(),
  usua_UsuarioEliminacion: z.number(),
  decl_FechaEliminacion: z.string().datetime(),
  decl_Estado: z.boolean(),
  nico_Id: z.number(),
  impo_NivelComercial_Otro: z.string(),
  impo_RTN: z.string(),
  impo_NumRegistro: z.string(),
  tite_Id: z.number(),
  inte_Tipo_Otro: z.string(),
  coco_Id: z.number(),
  pvde_Condicion_Otra: z.string(),
})

const declarantesProv_ViewModelSchema = z.object({
  decl_Id: z.number(),
  decl_NumeroIdentificacion: z.string(),
  decl_Nombre_Raso: z.string(),
  decl_Direccion_Exacta: z.string(),
  ciud_Id: z.number(),
  decl_Correo_Electronico: z.string(),
  decl_Telefono: z.string(),
  decl_Fax: z.string(),
  usua_UsuarioCreacion: z.number(),
  decl_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number(),
  decl_FechaModificacion: z.string().datetime(),
  usua_UsuarioEliminacion: z.number(),
  decl_FechaEliminacion: z.string().datetime(),
  decl_Estado: z.boolean(),
  nico_Id: z.number(),
  impo_NivelComercial_Otro: z.string(),
  impo_RTN: z.string(),
  impo_NumRegistro: z.string(),
  tite_Id: z.number(),
  inte_Tipo_Otro: z.string(),
  coco_Id: z.number(),
  pvde_Condicion_Otra: z.string(),
})

const declarantesInte_ViewModelSchema = z.object({
  decl_Id: z.number(),
  decl_NumeroIdentificacion: z.string(),
  decl_Nombre_Raso: z.string(),
  decl_Direccion_Exacta: z.string(),
  ciud_Id: z.number(),
  decl_Correo_Electronico: z.string(),
  decl_Telefono: z.string(),
  decl_Fax: z.string(),
  usua_UsuarioCreacion: z.number(),
  decl_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number(),
  decl_FechaModificacion: z.string().datetime(),
  usua_UsuarioEliminacion: z.number(),
  decl_FechaEliminacion: z.string().datetime(),
  decl_Estado: z.boolean(),
  nico_Id: z.number(),
  impo_NivelComercial_Otro: z.string(),
  impo_RTN: z.string(),
  impo_NumRegistro: z.string(),
  tite_Id: z.number(),
  inte_Tipo_Otro: z.string(),
  coco_Id: z.number(),
  pvde_Condicion_Otra: z.string(),
})

const importadoresViewModelSchema = z.object({
  impo_Id: z.number(),
  nico_Id: z.number(),
  decl_Id: z.number(),
  impo_NivelComercial_Otro: z.string(),
  impo_RTN: z.string(),
  impo_NumRegistro: z.string(),
  usua_UsuarioCreacion: z.number(),
  impo_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number(),
  impo_FechaModificacion: z.string().datetime(),
  usua_UsuarioEliminacion: z.number(),
  impo_FechaEliminacion: z.string().datetime(),
  impo_Estado: z.boolean(),
})

const proveedoresDeclaracionViewModelSchema = z.object({
  pvde_Id: z.number(),
  coco_Id: z.number(),
  pvde_Condicion_Otra: z.string(),
  decl_Id: z.number(),
  usua_UsuarioCreacion: z.number(),
  pvde_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number(),
  pvde_FechaModificacion: z.string().datetime(),
  usua_UsuarioEliminacion: z.number(),
  pvde_FechaEliminacion: z.string().datetime(),
  pvde_Estado: z.boolean(),
})

const intermediarioViewModelSchema = z.object({
  inte_Id: z.number(),
  tite_Id: z.number(),
  inte_Tipo_Otro: z.string(),
  decl_Id: z.number(),
  usua_UsuarioCreacion: z.number(),
  inte_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number(),
  inte_FechaModificacion: z.string().datetime(),
  usua_UsuarioEliminacion: z.number(),
  inte_FechaEliminacion: z.string().datetime(),
  inte_Estado: z.boolean(),
})

export const devaCompuestaSchema = z.object({
  declaraciones_ValorViewModel: declaraciones_ValorViewModelSchema,
  declarantesImpo_ViewModel: declarantesImpo_ViewModelSchema,
  declarantesProv_ViewModel: declarantesProv_ViewModelSchema,
  declarantesInte_ViewModel: declarantesInte_ViewModelSchema,
  importadoresViewModel: importadoresViewModelSchema,
  proveedoresDeclaracionViewModel: proveedoresDeclaracionViewModelSchema,
  intermediarioViewModel: intermediarioViewModelSchema,
})

export const aduanaSchema = z.object({
  adua_Id: z.number(),
  adua_Codigo: z.string(),
  adua_Nombre: z.string(),
  adua_Direccion_Exacta: z.string(),
  pvin_Nombre: z.string(),
  pvin_Id: z.string(),
  ciud_Id: z.string(),
  ciud_Nombre: z.string(),
  usua_UsuarioCreacion: z.number(),
  adua_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  adua_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  adua_FechaEliminacion: z.string().nullable(),
  usarioCreacion: z.string(),
  usuarioModificacion: z.string().nullable(),
})

const ciudadSchema = z.object({
  ciud_Id: z.number(),
  ciud_Nombre: z.string(),
  pvin_Id: z.number(),
  pvin_Nombre: z.string(),
  pvin_Codigo: z.string(),
  pais_Codigo: z.string(),
  pais_Nombre: z.string(),
  pais_Id: z.number(),
  ciud_EsAduana: z.boolean().nullable(),
  usua_UsuarioCreacion: z.number(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioCreacionNombre: z.string(),
  ciud_FechaCreacion: z.string(),
  usuarioModificacionNombre: z.string().nullable(),
  ciud_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.string().nullable(),
  ciud_FechaEliminacion: z.string().nullable(),
  ciud_Estado: z.boolean().nullable(),
})

const nicoSchema = z.object({
  nico_Id: z.number(),
  nico_Codigo: z.string(),
  nico_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacionNombre: z.string(),
  nico_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioModificacionNombre: z.string().nullable(),
  nico_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  usuarioEliminacionNombre: z.string().nullable(),
  nico_FechaEliminacion: z.string().nullable(),
  nico_Estado: z.boolean(),
})

// Zod schema for CondicionComercial
const cocoSchema = z.object({
  coco_Id: z.number(),
  coco_Codigo: z.string(),
  coco_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  usuarioNombreCreacion: z.string(),
  coco_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioModificadorNombre: z.string().nullable(),
  coco_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  usuarioNombreEliminacion: z.string().nullable(),
  coco_FechaEliminacion: z.string().nullable(),
  coco_Estado: z.boolean(),
})

const tiinSchema = z.object({
  tite_Id: z.number(),
  tite_Codigo: z.string(),
  tite_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  tite_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  tite_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  tite_FechaEliminacion: z.string().nullable(),
  tite_Estado: z.boolean(),
  usarioCreacion: z.string(),
  usuarioModificacion: z.string().nullable(),
})

const incoSchema = z.object({
  inco_Id: z.number(),
  inco_Codigo: z.string(),
  inco_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  inco_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  inco_FechaModificacion: z.string().nullable(),
  usuarioCreacionNombre: z.string(),
  usuarioModificadorNombre: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  inco_FechaEliminacion: z.string().nullable(),
  inco_Estado: z.boolean(),
})

const foenSchema = z.object({
  foen_Id: z.number(),
  foen_Codigo: z.string(),
  foen_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  foen_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  foen_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  usuarioCreacionNombre: z.string(),
  usuarioModificacionNombre: z.string().nullable(),
  usuarioEliminacionNombre: z.string().nullable(),
  foen_FechaEliminacion: z.string().nullable(),
  foen_Estado: z.boolean(),
})

const fopaSchema = z.object({
  fopa_Id: z.number(),
  fopa_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  fopa_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  fopa_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  fopa_FechaEliminacion: z.string().nullable(),
  fopa_Estado: z.boolean(),
  usua_NombreCreacion: z.string(),
  usua_NombreModificacion: z.string().nullable(),
})

const moneSchema = z.object({
  mone_Id: z.number(),
  mone_Codigo: z.string(),
  mone_Descripcion: z.string(),
  mone_EsAduana: z.boolean(),
  usua_UsuarioCreacion: z.number(),
  usuarioModificacionNombre: z.string().nullable(),
  mone_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioCreacionNombre: z.string(),
  mone_FechaModificacion: z.string().nullable(),
  mone_Estado: z.boolean(),
})

const embaSchema = z.object({
  emba_Id: z.number(),
  emba_Codigo: z.string(),
  emba_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacionNombre: z.string(),
  emba_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioModificacionNombre: z.string().nullable(),
  emba_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  usuarioEliminacionNombre: z.string().nullable(),
  emba_FechaEliminacion: z.string().nullable(),
  emba_Estado: z.boolean(),
})

const paisSchema = z.object({
  pais_Id: z.number(),
  pais_Codigo: z.string(),
  pais_Nombre: z.string(),
  pais_prefijo: z.string(),
  pais_EsAduana: z.boolean(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacionNombre: z.string(),
  pais_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioModificadorNombre: z.string().nullable(),
  pais_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  pais_FechaEliminacion: z.string().nullable(),
  pais_Estado: z.boolean(),
  fechaInicio: z.string(),
  fechaFin: z.string(),
  detalles: z.string().nullable(),
})

const itemSchema = z.object({
  item_Id: z.number(),
  item_Numero: z.number(),
  fact_Id: z.number(),
  item_Cantidad: z.number(),
  item_Cantidad_Bultos: z.number(),
  item_ClaseBulto: z.string().nullable(),
  item_Acuerdo: z.string().nullable(),
  item_PesoNeto: z.number().nullable(),
  item_PesoBruto: z.number().nullable(),
  unme_Id: z.number(),
  item_IdentificacionComercialMercancias: z.string(),
  item_CaracteristicasMercancias: z.string(),
  item_Marca: z.string(),
  item_Modelo: z.string(),
  merc_Id: z.number(),
  mate_SubCategoria: z.number(),
  subc_Descripcion: z.string().nullable(),
  mate_Imagen: z.string().nullable(),
  pais_IdOrigenMercancia: z.number(),
  item_ClasificacionArancelaria: z.string(),
  aran_Id: z.number(),
  aran_Descripcion: z.string().nullable(),
  aran_Codigo: z.string().nullable(),
  unme_Descripcion: z.string().nullable(),
  merc_Descripcion: z.string().nullable(),
  item_ValorUnitario: z.number(),
  item_GastosDeTransporte: z.number().nullable(),
  item_ValorTransaccion: z.number(),
  item_Seguro: z.number().nullable(),
  item_OtrosGastos: z.number().nullable(),
  item_ValorAduana: z.number().nullable(),
  item_CuotaContingente: z.number().nullable(),
  item_ReglasAccesorias: z.string().nullable(),
  item_CriterioCertificarOrigen: z.string().nullable(),
  item_EsNuevo: z.boolean(),
  item_EsHibrido: z.boolean(),
  item_LitrosTotales: z.number(),
  item_CigarrosTotales: z.number(),
  usua_UsuarioCreacion: z.number(),
  nombrePaisOrigen: z.string(),
  usuarioCreacionNombre: z.string(),
  item_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioModificacionNombre: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  item_FechaEliminacion: z.string().nullable(),
  item_FechaModificacion: z.string().nullable(),
  item_Estado: z.boolean(),
})

const factSchema = z.object({
  fact_Id: z.number(),
  deva_Id: z.number(),
  fact_Numero: z.string(),
  fact_Fecha: z.string(),
  usua_UsuarioCreacion: z.number(),
  fact_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  fact_FechaModificacion: z.string().nullable(),
  fact_Estado: z.boolean(),
  usuarioCreacionNombre: z.string(),
  usuarioModificacionNombre: z.string().nullable(),
  deva: z.string().nullable(),
  tbItems: z.array(itemSchema),
})

const condicionesSchema = z.object({
  codi_Id: z.number(),
  deva_Id: z.number(),
  codi_Restricciones_Utilizacion: z.boolean(),
  codi_Indicar_Restricciones_Utilizacion: z.string(),
  codi_Depende_Precio_Condicion: z.boolean(),
  codi_Indicar_Existe_Condicion: z.string(),
  codi_Condicionada_Revertir: z.boolean(),
  codi_Vinculacion_Comprador_Vendedor: z.boolean(),
  codi_Tipo_Vinculacion: z.string(),
  codi_Vinculacion_Influye_Precio: z.boolean(),
  codi_Pagos_Descuentos_Indirectos: z.boolean(),
  codi_Concepto_Monto_Declarado: z.string(),
  codi_Existen_Canones: z.boolean(),
  codi_Indicar_Canones: z.string(),
  usua_UsuarioCreacion: z.number(),
  codi_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  codi_FechaModificacion: z.string().nullable(),
  codi_Estado: z.boolean(),
})

const unmeSchema = z.object({
  unme_Id: z.number(),
  unme_Descripcion: z.string(),
  unme_EsAduana: z.boolean(),
  usua_UsuarioCreacion: z.number(),
  unme_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number().nullable(),
  unme_FechaModificacion: z.string().datetime().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  unme_FechaEliminacion: z.string().datetime().nullable(),
  unme_Estado: z.boolean(),
  usuarioCreacionNombre: z.string(),
  usuarioModificacionNombre: z.string().nullable(),
  usuarioEliminacionNombre: z.string().nullable(),
})

const mercSchema = z.object({
  merc_Id: z.number(),
  merc_Codigo: z.string(),
  merc_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  merc_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number().nullable(),
  merc_FechaModificacion: z.string().datetime().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  merc_FechaEliminacion: z.string().datetime().nullable(),
  merc_Estado: z.boolean(),
  usua_NombreCreacion: z.string(),
  usua_NombreModificacion: z.string().nullable(),
})

const aranDetalleSchema = z.object({
  aran_Id: z.number(),
  aran_Codigo: z.string(),
  aran_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacion: z.string(),
  aran_DAI: z.number(),
  aran_ISV: z.number(),
  aran_SEL: z.number(),
  aran_ProdCons: z.number(),
  impu_Descripcion: z.string().nullable(),
  impu_Cantidad: z.number(),
  aran_AplicaVehiculos: z.boolean(),
  aran_ArancelVehicular: z.boolean(),
  aran_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioModificacion: z.string().nullable(),
  aran_FechaModificacion: z.string().datetime().nullable(),
  aram_Estado: z.boolean().nullable(),
})

const aranSchema = z.object({
  aran_Id: z.number(),
  aran_Codigo: z.string(),
  aran_Descripcion: z.string(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacion: z.string(),
  aran_DAI: z.number(),
  aran_ISV: z.number(),
  aran_SEL: z.number(),
  aran_ProdCons: z.number(),
  impu_Descripcion: z.string().nullable(),
  impu_Cantidad: z.number(),
  aran_AplicaVehiculos: z.boolean(),
  aran_ArancelVehicular: z.boolean(),
  aran_FechaCreacion: z.string().datetime(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioModificacion: z.string().nullable(),
  aran_FechaModificacion: z.string().datetime().nullable(),
  aram_Estado: z.boolean().nullable(),
  subRows: z.array(aranDetalleSchema),
})

export type Deva = z.infer<typeof devaSchema>
export type DevaCompuesta = z.infer<typeof devaCompuestaSchema>
export type Aduana = z.infer<typeof aduanaSchema>
export type Ciudad = z.infer<typeof ciudadSchema>
export type NivelComercial = z.infer<typeof nicoSchema>
export type CondicionComercial = z.infer<typeof cocoSchema>
export type TipoDeIntermediario = z.infer<typeof tiinSchema>
export type Incoterm = z.infer<typeof incoSchema>
export type FormaDeEnvio = z.infer<typeof foenSchema>
export type FormaDePago = z.infer<typeof fopaSchema>
export type Moneda = z.infer<typeof moneSchema>
export type Embarque = z.infer<typeof embaSchema>
export type Pais = z.infer<typeof paisSchema>
export type Factura = z.infer<typeof factSchema>
export type Item = z.infer<typeof itemSchema>
export type Condiciones = z.infer<typeof condicionesSchema>
export type UnidadDeMedida = z.infer<typeof unmeSchema>
export type EstadoDeMercancia = z.infer<typeof mercSchema>
export type Arancel = z.infer<typeof aranSchema>
export type AranDetalle = z.infer<typeof aranDetalleSchema>
