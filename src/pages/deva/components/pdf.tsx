import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import backgroundImage from './fondo.jpg'; // Asegúrate de que esta ruta sea correcta

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
    position: 'relative', // Ensure the positioning context for the background image
  },
  backgroundImage: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: '120%',
    height: '130%',
    zIndex: -1, // Send the image to the background
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'flex',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
  },
  tableCell: {
    fontSize: '12px',
    flex: 1,
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableHeader: {
    fontSize: '12px',
    flex: 1,
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#a3d1fe',
    padding: 5,
    fontWeight: 'bold',
    
  },
  linea: {
    paddingTop: 8,
    paddingRight: -10,
    fontSize: 12,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: 'grey',
  },
});

interface Deva {
    deva_Id: number
    deva_AduanaIngresoId: number
    adua_IngresoNombre: string
    adua_IngresoCodigo: string
    adua_DespachoCodigo: string
    regi_Id: number
    regi_Codigo: string
    regi_Descripcion: string
    inco_Codigo: string 
    duca_No_DUCA: string 
    deva_AduanaDespachoId: number
    adua_DespachoNombre: string
    deva_DeclaracionMercancia: string
    deva_FechaAceptacion: string
    deva_Finalizacion: boolean
    deva_PagoEfectuado: boolean 
    pais_ExportacionId: number 
    pais_ExportacionNombre: string 
    deva_FechaExportacion: string 
    mone_Id: number 
    mone_Otra: string 
    monedaNombre: string 
    deva_ConversionDolares: number 
    emba_Id: number 
    lugarEmbarque: string 
    nico_Id: number
    nico_Descripcion: string
    emba_Codigo: string 
    impo_Id: number
    impo_NumRegistro: string
    impo_RTN: string
    impo_NivelComercial_Otro: string 
    impo_Nombre_Raso: string
    impo_Direccion_Exacta: string
    impo_CiudadNombre: string
    impo_PaisNombre: string
    impo_Correo_Electronico: string
    impo_Telefono: string
    impo_Fax: string 
    impo_ciudId: number
    impo_paisId: number
    coco_Id: number
    coco_Descripcion: string
    pvde_Condicion_Otra: string 
    pvde_Id: number
    prov_NumeroIdentificacion: string
    prov_Nombre_Raso: string
    prov_Direccion_Exacta: string
    prov_CiudadNombre: string
    prov_PaisNombre: string
    prov_Correo_Electronico: string
    prov_Telefono: string
    prov_Fax: string 
    prov_ciudId: number
    prov_paisId: number
    tite_Id: number 
    tipoIntermediario: string 
    inte_Id: number 
    inte_ciudId: number 
    inte_paisId: number 
    inte_Tipo_Otro: string 
    inte_NumeroIdentificacion: string 
    inte_Nombre_Raso: string 
    inte_Direccion_Exacta: string 
    inte_Correo_Electronico: string 
    inte_CiudadNombre: string 
    inte_PaisNombre: string 
    inte_Telefono: string 
    inte_Fax: string 
    deva_LugarEntrega: string 
    pais_EntregaId: number 
    pais_EntregaNombre: string 
    inco_Descripcion: string 
    inco_Version: string 
    deva_NumeroContrato: string 
    deva_FechaContrato: string 
    foen_Id: number 
    foen_Descripcion: string 
    deva_FormaEnvioOtra: string 
    fopa_Id: number 
    fopa_Descripcion: string 
    deva_FormaPagoOtra: string 
    codi_Id: number 
    codi_Restricciones_Utilizacion: string 
    codi_Indicar_Restricciones_Utilizacion: boolean 
    codi_Depende_Precio_Condicion: boolean 
    codi_Indicar_Existe_Condicion: boolean 
    codi_Condicionada_Revertir: boolean 
    codi_Vinculacion_Comprador_Vendedor: boolean 
    codi_Tipo_Vinculacion: string 
    codi_Vinculacion_Influye_Precio: boolean 
    codi_Pagos_Descuentos_Indirectos: boolean 
    codi_Concepto_Monto_Declarado: number 
    codi_Existen_Canones: boolean 
    codi_Indicar_Canones: boolean 
    base_Id: number 
    base_PrecioFactura: number 
    base_PagosIndirectos: number 
    base_PrecioReal: number 
    base_MontCondicion: number 
    base_MontoReversion: number 
    base_ComisionCorrelaje: number 
    base_Gasto_Envase_Embalaje: number 
    base_ValoresMateriales_Incorporado: number 
    base_Valor_Materiales_Utilizados: number 
    base_Valor_Materiales_Consumidos: number 
    base_Valor_Ingenieria_Importado: number 
    base_Valor_Canones: number 
    base_Gasto_TransporteM_Importada: number 
    base_Gastos_Carga_Importada: number 
    base_Costos_Seguro: number 
    base_Total_Ajustes_Precio_Pagado: number 
    base_Gastos_Asistencia_Tecnica: number 
    base_Gastos_Transporte_Posterior: number 
    base_Derechos_Impuestos: number 
    base_Monto_Intereses: number 
    base_Deducciones_Legales: number 
    base_Total_Deducciones_Precio: number 
    base_Valor_Aduana: number 
    usua_UsuarioCreacion: number
    usua_CreacionNombre: string
    deva_FechaCreacion: string
    usua_ModificacionNombre: string
    deva_FechaModificacion: string
    deva_Estado: boolean
  }
interface PDFGeneratorProps {
  dato: Deva[];
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ dato = []}) => {
  const [showPdf, setShowPdf] = useState(false);
  let data = [];
  console.log(dato);
  if(dato != null){
  data = [
    dato
    //#region cagada
    // dato.deva_AduanaIngresoId,
    // dato.adua_IngresoNombre,
    // dato.adua_IngresoCodigo,
    // dato.adua_DespachoCodigo,
    // dato.regi_Id,
    // dato.regi_Codigo,
    // dato.regi_Descripcion,
    // dato.inco_Codigo, 
    // dato.duca_No_DUCA, 
    // dato.deva_AduanaDespachoId,
    // dato.adua_DespachoNombre,
    // dato.deva_DeclaracionMercancia,
    // dato.deva_FechaAceptacion,
    // dato.deva_Finalizacion,
    // dato.deva_PagoEfectuado, 
    // dato.pais_ExportacionId, 
    // dato.pais_ExportacionNombre, 
    // dato.deva_FechaExportacion, 
    // dato.mone_Id, 
    // dato.mone_Otra, 
    // dato.monedaNombre, 
    // dato.deva_ConversionDolares, 
    // dato.emba_Id, 
    // dato.lugarEmbarque, 
    // dato.nico_Id,
    // dato.nico_Descripcion,
    // dato.emba_Codigo, 
    // dato.impo_Id,
    // dato.impo_NumRegistro,
    // dato.impo_RTN,
    // dato.impo_NivelComercial_Otro, 
    // dato.impo_Nombre_Raso,
    // dato.impo_Direccion_Exacta,
    // dato.impo_CiudadNombre,
    // dato.impo_PaisNombre,
    // dato.impo_Correo_Electronico,
    // dato.impo_Telefono,
    // dato.impo_Fax, 
    // dato.impo_ciudId,
    // dato.impo_paisId,
    // dato.coco_Id,
    // dato.coco_Descripcion,
    // dato.pvde_Condicion_Otra, 
    // dato.pvde_Id,
    // dato.prov_NumeroIdentificacion,
    // dato.prov_Nombre_Raso,
    // dato.prov_Direccion_Exacta,
    // dato.prov_CiudadNombre,
    // dato.prov_PaisNombre,
    // dato.prov_Correo_Electronico,
    // dato.prov_Telefono,
    // dato.prov_Fax, 
    // dato.prov_ciudId,
    // dato.prov_paisId,
    // dato.tite_Id, 
    // dato.tipoIntermediario, 
    // dato.inte_Id, 
    // dato.inte_ciudId, 
    // dato.inte_paisId, 
    // dato.inte_Tipo_Otro, 
    // dato.inte_NumeroIdentificacion, 
    // dato.inte_Nombre_Raso, 
    // dato.inte_Direccion_Exacta, 
    // dato.inte_Correo_Electronico, 
    // dato.inte_CiudadNombre, 
    // dato.inte_PaisNombre, 
    // dato.inte_Telefono, 
    // dato.inte_Fax, 
    // dato.deva_LugarEntrega, 
    // dato.pais_EntregaId, 
    // dato.pais_EntregaNombre, 
    // dato.inco_Descripcion, 
    // dato.inco_Version, 
    // dato.deva_NumeroContrato, 
    // dato.deva_FechaContrato, 
    // dato.foen_Id, 
    // dato.foen_Descripcion, 
    // dato.deva_FormaEnvioOtra, 
    // dato.fopa_Id, 
    // dato.fopa_Descripcion, 
    // dato.deva_FormaPagoOtra, 
    // dato.codi_Id, 
    // dato.codi_Restricciones_Utilizacion, 
    // dato.codi_Indicar_Restricciones_Utilizacion, 
    // dato.codi_Depende_Precio_Condicion, 
    // dato.codi_Indicar_Existe_Condicion, 
    // dato.codi_Condicionada_Revertir, 
    // dato.codi_Vinculacion_Comprador_Vendedor, 
    // dato.codi_Tipo_Vinculacion, 
    // dato.codi_Vinculacion_Influye_Precio, 
    // dato.codi_Pagos_Descuentos_Indirectos, 
    // dato.codi_Concepto_Monto_Declarado, 
    // dato.codi_Existen_Canones, 
    // dato.codi_Indicar_Canones, 
    // dato.base_Id, 
    // dato.base_PrecioFactura, 
    // dato.base_PagosIndirectos, 
    // dato.base_PrecioReal, 
    // dato.base_MontCondicion, 
    // dato.base_MontoReversion, 
    // dato.base_ComisionCorrelaje, 
    // dato.base_Gasto_Envase_Embalaje, 
    // dato.base_ValoresMateriales_Incorporado, 
    // dato.base_Valor_Materiales_Utilizados, 
    // dato.base_Valor_Materiales_Consumidos, 
    // dato.base_Valor_Ingenieria_Importado, 
    // dato.base_Valor_Canones, 
    // dato.base_Gasto_TransporteM_Importada, 
    // dato.base_Gastos_Carga_Importada, 
    // dato.base_Costos_Seguro, 
    // dato.base_Total_Ajustes_Precio_Pagado, 
    // dato.base_Gastos_Asistencia_Tecnica, 
    // dato.base_Gastos_Transporte_Posterior, 
    // dato.base_Derechos_Impuestos, 
    // dato.base_Monto_Intereses, 
    // dato.base_Deducciones_Legales, 
    // dato.base_Total_Deducciones_Precio, 
    // dato.base_Valor_Aduana, 
    //#endregion
    ]
  }
  else{
    data = ["nada"];
  }
  const pageSize = 20;
  const totalPages = Math.ceil(data.length / pageSize);


  console.log("entra al pdf?",JSON.stringify(data, null, 2))

  useEffect(() => {
    if (data.length > 0) {
      setShowPdf(true);
    }
  }, [data]);

  const generatePDF = () => (
    <PDFViewer width="100%" height="500px">
      <Document>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Page key={index} size="LEGAL" wrap={true} style={styles.page}>
            <View style={styles.section}>
            <Image
                style={styles.backgroundImage}
                src={backgroundImage} 
              />
              
              <Text style={{ fontSize: 20, marginHorizontal: '31%', marginBottom: 5 }}>Declaración de Valor</Text>

              <View style={styles.section}>
                {data
                  .slice(index * pageSize, (index + 1) * pageSize)
                  .map((item, i) => (
                    <View style={{fontSize: 12}} key={i}>
                      <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                    <Text style={styles.linea}>Aduana Nombre : {item.adua_IngresoNombre}</Text>
                    <Text style={styles.linea}>Aduana Código : {item.adua_IngresoCodigo}</Text>
                    <Text style={styles.linea}>Código de Despacho : {item.adua_DespachoCodigo}</Text>
                    <Text style={styles.linea}>Región : {item.regi_Descripcion}</Text>
                    <Text style={styles.linea}>Código de Incoterms : {item.inco_Codigo}</Text>
                    <Text style={styles.linea}>Número DUCA : {item.duca_No_DUCA}</Text>
                    <Text style={styles.linea}>Despacho Nombre : {item.adua_DespachoNombre}</Text>
                    <Text style={styles.linea}>Declaración de Mercancía : {item.deva_DeclaracionMercancia}</Text>
                    <Text style={styles.linea}>Fecha de Aceptación : {item.deva_FechaAceptacion}</Text>
                    <Text style={styles.linea}>Finalización : {item.deva_Finalizacion ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Pago Efectuado : {item.deva_PagoEfectuado !== null ? (item.deva_PagoEfectuado ? 'Si' : 'No') : 'null'}</Text>
                    <Text style={styles.linea}>País de Exportación : {item.pais_ExportacionNombre}</Text>
                    <Text style={styles.linea}>Fecha de Exportación : {item.deva_FechaExportacion}</Text>
                    <Text style={styles.linea}>Moneda : {item.monedaNombre}</Text>
                    <Text style={styles.linea}>Conversión a Dólares : {item.deva_ConversionDolares}</Text>
                    <Text style={styles.linea}>Lugar de Embarque : {item.lugarEmbarque}</Text>
                    <Text style={styles.linea}>Nombre Raso Comprador : {item.nico_Descripcion}</Text>
                    <Text style={styles.linea}>Dirección Comprador : {item.impo_Direccion_Exacta}</Text>
                    <Text style={styles.linea}>Ciudad  : {item.impo_CiudadNombre}</Text>
                    <Text style={styles.linea}>País  : {item.impo_PaisNombre}</Text>
                    <Text style={styles.linea}>Correo Electrónico Comprador : {item.impo_Correo_Electronico}</Text>
                    <Text style={styles.linea}>Teléfono Comprador : {item.impo_Telefono}</Text>
                    <Text style={styles.linea}>Fax Comprador : {item.impo_Fax}</Text>
                    <Text style={styles.linea}>Ciudad Proveedor : {item.prov_CiudadNombre}</Text>
                    <Text style={styles.linea}>País Proveedor : {item.prov_PaisNombre}</Text>
                    <Text style={styles.linea}>Identificación Intermediario : {item.prov_NumeroIdentificacion}</Text>
                    <Text style={styles.linea}>Nombre Intermediario : {item.prov_Nombre_Raso}</Text>
                    <Text style={styles.linea}>Dirección Intermediario : {item.prov_Direccion_Exacta}</Text>
                    <Text style={styles.linea}>Correo Intermediario : {item.prov_Correo_Electronico}</Text>
                    <Text style={styles.linea}>Ciudad Intermediario : {item.inte_CiudadNombre}</Text>
                    <Text style={styles.linea}>País Intermediario : {item.inte_PaisNombre}</Text>
                    <Text style={styles.linea}>Teléfono Intermediario : {item.prov_Telefono}</Text>
                    <Text style={styles.linea}>Fax Intermediario : {item.prov_Fax}</Text>
                    <Text style={styles.linea}>Lugar de Entrega : {item.deva_LugarEntrega}</Text>
                    <Text style={styles.linea}>País de Entrega : {item.pais_EntregaNombre}</Text>
                    <Text style={styles.linea}>Descripción de Incoterms : {item.inco_Descripcion}</Text>
                    <Text style={styles.linea}>Versión de Incoterms : {item.inco_Version}</Text>
                    <Text style={styles.linea}>Número de Contrato : {item.deva_NumeroContrato}</Text>
                    </text>
                        <text style={styles.tableCell}>
                    <Text style={styles.linea}>Fecha de Contrato : {item.deva_FechaContrato}</Text>
                    <Text style={styles.linea}>Forma de Envío : {item.foen_Descripcion}</Text>
                    <Text style={styles.linea}>Forma de Pago : {item.fopa_Descripcion}</Text>
                    
                    <Text style={styles.linea}>Restricciones de Utilización : {item.codi_Restricciones_Utilizacion}</Text>
                    <Text style={styles.linea}>Restricciones de Utilización Indicadas: {item.codi_Indicar_Restricciones_Utilizacion ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Depende Precio Condición : {item.codi_Depende_Precio_Condicion ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Indicar Existe Condición : {item.codi_Indicar_Existe_Condicion ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Condicionada Revertir : {item.codi_Condicionada_Revertir ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Vinculación Comprador Vendedor : {item.codi_Vinculacion_Comprador_Vendedor ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Tipo de Vinculación : {item.codi_Tipo_Vinculacion}</Text>
                    <Text style={styles.linea}>Vinculación Influye Precio : {item.codi_Vinculacion_Influye_Precio ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Pagos Descuentos Indirectos : {item.codi_Pagos_Descuentos_Indirectos ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Concepto Monto Declarado : {item.codi_Concepto_Monto_Declarado}</Text>
                    <Text style={styles.linea}>Existen Cánones : {item.codi_Existen_Canones ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Indicar Cánones : {item.codi_Indicar_Canones ? 'Si' : 'No'}</Text>
                    <Text style={styles.linea}>Precio Factura : {item.base_PrecioFactura}</Text>
                    <Text style={styles.linea}>Pagos Indirectos : {item.base_PagosIndirectos}</Text>
                    <Text style={styles.linea}>Precio Real : {item.base_PrecioReal}</Text>
                    <Text style={styles.linea}>Monto Condición : {item.base_MontCondicion}</Text>
                    <Text style={styles.linea}>Monto de Reversión : {item.base_MontoReversion}</Text>
                    <Text style={styles.linea}>Comisión Correlaje : {item.base_ComisionCorrelaje}</Text>
                    <Text style={styles.linea}>Gasto Envase Embalaje : {item.base_Gasto_Envase_Embalaje}</Text>
                    <Text style={styles.linea}>Valores Materiales Incorporado : {item.base_ValoresMateriales_Incorporado}</Text>
                    <Text style={styles.linea}>Valor Materiales Utilizados : {item.base_Valor_Materiales_Utilizados}</Text>
                    <Text style={styles.linea}>Valor Materiales Consumidos : {item.base_Valor_Materiales_Consumidos}</Text>
                    <Text style={styles.linea}>Valor Ingeniería Importado : {item.base_Valor_Ingenieria_Importado}</Text>
                    <Text style={styles.linea}>Valor Cánones : {item.base_Valor_Canones}</Text>
                    <Text style={styles.linea}>Gasto Transporte Importada : {item.base_Gasto_TransporteM_Importada}</Text>
                    <Text style={styles.linea}>Gastos Carga Importada : {item.base_Gastos_Carga_Importada}</Text>
                    <Text style={styles.linea}>Costos Seguro : {item.base_Costos_Seguro}</Text>
                    <Text style={styles.linea}>Total Ajustes Precio Pagado : {item.base_Total_Ajustes_Precio_Pagado}</Text>
                    <Text style={styles.linea}>Gastos Asistencia Técnica : {item.base_Gastos_Asistencia_Tecnica}</Text>
                    <Text style={styles.linea}>Gastos Transporte Posterior : {item.base_Gastos_Transporte_Posterior}</Text>
                    <Text style={styles.linea}>Derechos Impuestos : {item.base_Derechos_Impuestos}</Text>
                    <Text style={styles.linea}>Monto Intereses : {item.base_Monto_Intereses}</Text>
                    <Text style={styles.linea}>Deducciones Legales : {item.base_Deducciones_Legales}</Text>
                    <Text style={styles.linea}>Total Deducciones : {item.base_Total_Deducciones_Precio}</Text>
                    <Text style={styles.linea}>Valor Aduana : {item.base_Valor_Aduana}</Text>
                    </text>
</text>
                    </View>
                   
                   
                  
                  ))}
              </View>
              <Text style={styles.pagination}>
                Página {index + 1} de {totalPages}
              </Text>
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );

  return (
    <div>
      {showPdf && generatePDF()}
      {showPdf && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}></div>
      )}
    </div>
  );
};

export default PDFGenerator;
