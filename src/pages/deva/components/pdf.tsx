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
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontWeight: 'bold',
    
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
interface PDFGeneratorProps {
  data: Deva[];
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ data = [] }) => {
  const [showPdf, setShowPdf] = useState(false);
  const pageSize = 20;
  const totalPages = Math.ceil(data.length / pageSize);


  useEffect(() => {
    if (data.length > 0) {
      setShowPdf(true);
    }
  }, [data]);

  const generatePDF = () => (
    <PDFViewer width="100%" height="500px">
      <Document>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Page key={index} size="A4" wrap={true} style={styles.page}>
            <View style={styles.section}>
              {/* Fondo de página */}
              {/* <Image
                style={styles.backgroundImage}
                src={backgroundImage} // Usar la imagen importada
              /> */}
              <Text style={{ fontSize: 20, marginHorizontal: '31%', marginBottom: 5 }}>Declaración de Valor</Text>

              <View>
                {data
                  .slice(index * pageSize, (index + 1) * pageSize)
                  .map((item, i) => (
                    <View style={{fontSize: 12}} key={i}>
                    <Text style={{fontSize: 12}}>Aduana Nombre : {item.adua_IngresoNombre}</Text>
                    <Text style={{fontSize: 12}}>Aduana Código : {item.adua_IngresoCodigo}</Text>
                    <Text style={{fontSize: 12}}>Código de Despacho : {item.adua_DespachoCodigo}</Text>
                    <Text style={{fontSize: 12}}>Código de Región : {item.regi_Id}</Text>
                    <Text style={{fontSize: 12}}>Región : {item.regi_Descripcion}</Text>
                    <Text style={{fontSize: 12}}>Código de Incoterms : {item.inco_Codigo}</Text>
                    <Text style={{fontSize: 12}}>Número DUCA : {item.duca_No_DUCA}</Text>
                    <Text style={{fontSize: 12}}>Despacho Nombre : {item.adua_DespachoNombre}</Text>
                    <Text style={{fontSize: 12}}>Declaración de Mercancía : {item.deva_DeclaracionMercancia}</Text>
                    <Text style={{fontSize: 12}}>Fecha de Aceptación : {item.deva_FechaAceptacion}</Text>
                    <Text style={{fontSize: 12}}>Finalización : {item.deva_Finalizacion ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Pago Efectuado : {item.deva_PagoEfectuado !== null ? (item.deva_PagoEfectuado ? 'Si' : 'No') : 'null'}</Text>
                    <Text style={{fontSize: 12}}>País de Exportación : {item.pais_ExportacionNombre}</Text>
                    <Text style={{fontSize: 12}}>Fecha de Exportación : {item.deva_FechaExportacion}</Text>
                    <Text style={{fontSize: 12}}>Moneda : {item.monedaNombre}</Text>
                    <Text style={{fontSize: 12}}>Conversión a Dólares : {item.deva_ConversionDolares}</Text>
                    <Text style={{fontSize: 12}}>Lugar de Embarque : {item.lugarEmbarque}</Text>
                    <Text style={{fontSize: 12}}>Nombre Raso Comprador : {item.nico_Descripcion}</Text>
                    <Text style={{fontSize: 12}}>Dirección Comprador : {item.impo_Direccion_Exacta}</Text>
                    <Text style={{fontSize: 12}}>Ciudad  : {item.impo_CiudadNombre}</Text>
                    <Text style={{fontSize: 12}}>País  : {item.impo_PaisNombre}</Text>
                    <Text style={{fontSize: 12}}>Correo Electrónico Comprador : {item.impo_Correo_Electronico}</Text>
                    <Text style={{fontSize: 12}}>Teléfono Comprador : {item.impo_Telefono}</Text>
                    <Text style={{fontSize: 12}}>Fax Comprador : {item.impo_Fax}</Text>
                    <Text style={{fontSize: 12}}>Ciudad Proveedor : {item.prov_CiudadNombre}</Text>
                    <Text style={{fontSize: 12}}>País Proveedor : {item.prov_PaisNombre}</Text>
                    <Text style={{fontSize: 12}}>Identificación Intermediario : {item.prov_NumeroIdentificacion}</Text>
                    <Text style={{fontSize: 12}}>Nombre Intermediario : {item.prov_Nombre_Raso}</Text>
                    <Text style={{fontSize: 12}}>Dirección Intermediario : {item.prov_Direccion_Exacta}</Text>
                    <Text style={{fontSize: 12}}>Correo Intermediario : {item.prov_Correo_Electronico}</Text>
                    <Text style={{fontSize: 12}}>Ciudad Intermediario : {item.inte_CiudadNombre}</Text>
                    <Text style={{fontSize: 12}}>País Intermediario : {item.inte_PaisNombre}</Text>
                    <Text style={{fontSize: 12}}>Teléfono Intermediario : {item.prov_Telefono}</Text>
                    <Text style={{fontSize: 12}}>Fax Intermediario : {item.prov_Fax}</Text>
                    <Text style={{fontSize: 12}}>Lugar de Entrega : {item.deva_LugarEntrega}</Text>
                    <Text style={{fontSize: 12}}>País de Entrega : {item.pais_EntregaNombre}</Text>
                    <Text style={{fontSize: 12}}>Descripción de Incoterms : {item.inco_Descripcion}</Text>
                    <Text style={{fontSize: 12}}>Versión de Incoterms : {item.inco_Version}</Text>
                    <Text style={{fontSize: 12}}>Número de Contrato : {item.deva_NumeroContrato}</Text>
                    <Text style={{fontSize: 12}}>Fecha de Contrato : {item.deva_FechaContrato}</Text>
                    <Text style={{fontSize: 12}}>Forma de Envío : {item.foen_Descripcion}</Text>
                    <Text style={{fontSize: 12}}>Forma de Pago : {item.fopa_Descripcion}</Text>
                    <Text style={{fontSize: 12}}>Restricciones de Utilización : {item.codi_Restricciones_Utilizacion}</Text>
                    <Text style={{fontSize: 12}}>Restricciones de Utilización Indicadas: {item.codi_Indicar_Restricciones_Utilizacion ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Depende Precio Condición : {item.codi_Depende_Precio_Condicion ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Indicar Existe Condición : {item.codi_Indicar_Existe_Condicion ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Condicionada Revertir : {item.codi_Condicionada_Revertir ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Vinculación Comprador Vendedor : {item.codi_Vinculacion_Comprador_Vendedor ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Tipo de Vinculación : {item.codi_Tipo_Vinculacion}</Text>
                    <Text style={{fontSize: 12}}>Vinculación Influye Precio : {item.codi_Vinculacion_Influye_Precio ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Pagos Descuentos Indirectos : {item.codi_Pagos_Descuentos_Indirectos ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Concepto Monto Declarado : {item.codi_Concepto_Monto_Declarado}</Text>
                    <Text style={{fontSize: 12}}>Existen Cánones : {item.codi_Existen_Canones ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Indicar Cánones : {item.codi_Indicar_Canones ? 'Si' : 'No'}</Text>
                    <Text style={{fontSize: 12}}>Precio Factura : {item.base_PrecioFactura}</Text>
                    <Text style={{fontSize: 12}}>Pagos Indirectos : {item.base_PagosIndirectos}</Text>
                    <Text style={{fontSize: 12}}>Precio Real : {item.base_PrecioReal}</Text>
                    <Text style={{fontSize: 12}}>Monto Condición : {item.base_MontCondicion}</Text>
                    <Text style={{fontSize: 12}}>Monto de Reversión : {item.base_MontoReversion}</Text>
                    <Text style={{fontSize: 12}}>Comisión Correlaje : {item.base_ComisionCorrelaje}</Text>
                    <Text style={{fontSize: 12}}>Gasto Envase Embalaje : {item.base_Gasto_Envase_Embalaje}</Text>
                    <Text style={{fontSize: 12}}>Valores Materiales Incorporado : {item.base_ValoresMateriales_Incorporado}</Text>
                    <Text style={{fontSize: 12}}>Valor Materiales Utilizados : {item.base_Valor_Materiales_Utilizados}</Text>
                    <Text style={{fontSize: 12}}>Valor Materiales Consumidos : {item.base_Valor_Materiales_Consumidos}</Text>
                    <Text style={{fontSize: 12}}>Valor Ingeniería Importado : {item.base_Valor_Ingenieria_Importado}</Text>
                    <Text style={{fontSize: 12}}>Valor Cánones : {item.base_Valor_Canones}</Text>
                    <Text style={{fontSize: 12}}>Gasto Transporte Importada : {item.base_Gasto_TransporteM_Importada}</Text>
                    <Text style={{fontSize: 12}}>Gastos Carga Importada : {item.base_Gastos_Carga_Importada}</Text>
                    <Text style={{fontSize: 12}}>Costos Seguro : {item.base_Costos_Seguro}</Text>
                    <Text style={{fontSize: 12}}>Total Ajustes Precio Pagado : {item.base_Total_Ajustes_Precio_Pagado}</Text>
                    <Text style={{fontSize: 12}}>Gastos Asistencia Técnica : {item.base_Gastos_Asistencia_Tecnica}</Text>
                    <Text style={{fontSize: 12}}>Gastos Transporte Posterior : {item.base_Gastos_Transporte_Posterior}</Text>
                    <Text style={{fontSize: 12}}>Derechos Impuestos : {item.base_Derechos_Impuestos}</Text>
                    <Text style={{fontSize: 12}}>Monto Intereses : {item.base_Monto_Intereses}</Text>
                    <Text style={{fontSize: 12}}>Deducciones Legales : {item.base_Deducciones_Legales}</Text>
                    <Text style={{fontSize: 12}}>Total Deducciones : {item.base_Total_Deducciones_Precio}</Text>
                    <Text style={{fontSize: 12}}>Valor Aduana : {item.base_Valor_Aduana}</Text>

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
