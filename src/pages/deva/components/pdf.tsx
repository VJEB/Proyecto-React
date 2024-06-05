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
    fontSize: '10px',
    flex: 1,
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 0,
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
    marginTop: 7,
    fontWeight: 'bold',
    
  },
  tableHeader1: {
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
    marginTop: -1,
    marginBottom: -20,
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
    ]
  }
  else{
    data = ["nada"];
  }
  const pageSize = 20;
  const totalPages = Math.ceil(data.length / pageSize);


  // console.log("entra al pdf?",JSON.stringify(data, null, 2))

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
            {/* <Image
                style={styles.backgroundImage}
                src={backgroundImage} 
              /> */}
              
              <Text style={{ fontSize: 20, marginHorizontal: '31%', marginBottom: 5 }}>Declaración de Valor</Text>
              <View style={styles.tableRow}>
                  
                    <Text style={styles.tableHeader1}>
                      <Text style={{ fontWeight: 'bold' }}>Generales</Text>
                    </Text>

                </View>
              <View style={styles.section}>
                {data
                  .slice(index * pageSize, (index + 1) * pageSize)
                  .map((item, i) => (
                    <View style={{fontSize: 12}} key={i}>
                      <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Informacion Aduana</Text>
                      </Text>
                    </text>
                      <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Aduana Ingreso : </Text>
                          <Text style={{fontSize: 12}}>{item.adua_IngresoNombre}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Despacho Nombre : </Text>
                          <Text style={{fontSize: 12}}>{item.adua_DespachoNombre}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Declaración de Mercancía : </Text>
                          <Text style={{fontSize: 12}}>{item.deva_DeclaracionMercancia}</Text>
                        </text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Fecha de Aceptación : </Text>
                          <Text style={{fontSize: 12}}>{item.deva_FechaAceptacion.split('T')[0]}</Text>
                        </text>
                    </text>

                    <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Informacion Importador</Text>
                      </Text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Nombre o Razón Social: </Text>
                          <Text style={{fontSize: 12}}>{item.impo_Nombre_Raso}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>RTN : </Text>
                          <Text style={{fontSize: 12}}>{item.impo_RTN}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Número de Registro : </Text>
                          <Text style={{fontSize: 12}}>{item.impo_NumRegistro}</Text>
                        </text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Dirección Importador : </Text>
                          <Text style={{fontSize: 12}}>{item.impo_Direccion_Exacta}</Text>
                        </text>

                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Ciudad Importador : </Text>
                          <Text style={{fontSize: 12}}>{item.impo_CiudadNombre}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>País Importador: </Text>
                          <Text style={{fontSize: 12}}>{item.impo_PaisNombre}</Text>
                        </text>
                        </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>IMail Importador : </Text>
                          <Text style={{fontSize: 12}}>{item.impo_Correo_Electronico}</Text>
                        </text>
                        <text style={styles.tableCell}>
                        <Text style={styles.linea}>Teléfono Importador : </Text>
                        <Text style={{fontSize: 12}}>{item.impo_Telefono}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Fax Importador : </Text>
                        <Text style={{fontSize: 12}}>{item.impo_Fax}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Nivel Comercial : </Text>
                          <Text style={{fontSize: 12}}>{item.nico_Descripcion}</Text>
                        </text>
                    </text>

                    <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Informacion Proveedor</Text>
                      </Text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Nombre Proveedor : </Text>
                          <Text style={{fontSize: 12}}>{item.prov_Nombre_Raso}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Dirección Proveedor : </Text>
                          <Text style={{fontSize: 12}}>{item.prov_Direccion_Exacta}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>País Proveedor : </Text>
                          <Text style={{fontSize: 12}}>{item.prov_PaisNombre}</Text>
                        </text>
                    </text>
                    <text style={styles.tableRow}>
                     <text style={styles.tableCell}>
                       <Text style={styles.linea}>Ciudad Proveedor : </Text>
                       <Text style={{fontSize: 12}}>{item.prov_CiudadNombre}</Text>
                     </text>
                     <text style={styles.tableCell}>
                        <Text style={styles.linea}>Correo Proveedor : </Text>
                       <Text style={{fontSize: 12}}>{item.prov_Correo_Electronico}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Teléfono Proveedor : </Text> 
                        <Text style={{fontSize: 12}}>{item.prov_Telefono}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Fax Proveedor : </Text>
                          <Text  style={{fontSize: 12}}> {item.prov_Fax}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Condicion Comercial : </Text>
                          <Text  style={{fontSize: 12}}>{item.coco_Descripcion}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}> </Text>
                          <Text></Text>
                        </text>
                    </text>

                    <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Información Intermediario</Text>
                      </Text>
                    </text>

                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Nombre o Razón social : </Text>
                          <Text style={{fontSize: 12}}>{item.inte_Nombre_Raso}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Ciudad Intermediario : </Text>
                          <Text style={{fontSize: 12}}>{item.inte_Direccion_Exacta}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Ciudad Intermediario : </Text>
                          <Text style={{fontSize: 12}}>{item.inte_CiudadNombre}</Text>
                        </text>
                      </text>
                      <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>País Intermediario : </Text>
                          <Text style={{fontSize: 12}}>{item.inte_PaisNombre}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Correo Intermediario : </Text>
                          <Text style={{fontSize: 12}}>{item.inte_Correo_Electronico}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Teléfono Intermediario : </Text>
                          <Text style={{fontSize: 12}}>{item.inte_Telefono}</Text>
                        </text>
                      </text>
                      <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Fax Intermediario : </Text>
                          <Text style={{fontSize: 12}}>{item.inte_Fax}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Tipo Intermediario : </Text>
                          <Text style={{fontSize: 12}}>{item.inte_Tipo_Otro}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}> </Text>
                        </text>
                      </text>


                    <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Características de Transacción</Text>
                      </Text>
                    </text>

                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Lugar de Entrega : </Text> 
                        <Text> {item.deva_LugarEntrega}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>País de Entrega : </Text> 
                        <Text> {item.pais_EntregaNombre}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Incoterm : </Text>
                        <Text style={{fontSize: 12}}>{item.inco_Descripcion}</Text>
                      </text>
                    </text>

                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Versión de Incoterms :</Text>
                        <Text> {item.inco_Version}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Número de Contrato : </Text>
                        <Text style={{fontSize: 12}}>{item.deva_NumeroContrato}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Fecha de Contrato : </Text>
                        <Text style={{fontSize: 12}}>{item.deva_FechaContrato.split('T')[0]}</Text>
                      </text>                   
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Forma de Envío : </Text>
                        <Text style={{fontSize: 12}}>{item.foen_Descripcion}</Text>
                      </text>
                      <text style={styles.tableCell}>
                          <Text style={styles.linea}>Pago Efectuado : </Text>
                          <Text style={{fontSize: 12}}>{item.deva_PagoEfectuado !== null ? (item.deva_PagoEfectuado ? 'Si' : 'No') : 'null'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Forma de Pago : </Text>
                        <Text style={{fontSize: 12}}>{item.fopa_Descripcion}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                            <Text style={styles.linea}>Lugar de Embarque : </Text>
                            <Text style={{fontSize: 12}}>{item.lugarEmbarque}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>País de Exportación : </Text>
                        <Text style={{fontSize: 12}}>{item.pais_ExportacionNombre}</Text>
                      </text>
                      <text style={styles.tableCell}>
                          <Text style={styles.linea}>Fecha de Exportación : </Text>
                          <Text style={{fontSize: 12}}>{item.deva_FechaExportacion.split('T')[0]}</Text>
                        </text>
                    </text>
                   <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Moneda : </Text>
                        <Text style={{fontSize: 11}}>{item.monedaNombre}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}></Text>
                      </text>
                    </text>
                   
                    
                    </View>
                   
                   
                  
                  ))}
              </View>


              <View style={styles.tableRow}>
                  
                  <Text style={styles.tableHeader1}>
                    <Text style={{ fontWeight: 'bold' }}>Transacción</Text>
                  </Text>

              </View>
              <View style={styles.section}>
              {data
                .slice(index * pageSize, (index + 1) * pageSize)
                .map((item, i) => (
                  <View style={{fontSize: 12}} key={i}>
                    <text style={styles.tableRow}>
                    <Text style={styles.tableHeader}>
                      <Text style={{ fontWeight: 'bold' }}>Condiciones de Transacción</Text>
                    </Text>
                  </text>


                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Finalización : </Text>
                        <Text style={{fontSize: 12}}>{item.deva_Finalizacion ? 'Si' : 'No'}</Text>
                      </text>
                      
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Descuentos Indirectos : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Pagos_Descuentos_Indirectos ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Depende Precio Condición : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Depende_Precio_Condicion ? 'Si' : 'No'}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Indicar Existe Condición : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Indicar_Existe_Condicion ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Condicionada Revertir : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Condicionada_Revertir ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Vinculación Comprador Vendedor : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Vinculacion_Comprador_Vendedor ? 'Si' : 'No'}</Text>
                      </text>
                    </text>

                    
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Vinculación Influye Precio : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Vinculacion_Influye_Precio ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Restricciones de Utilización : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Indicar_Restricciones_Utilizacion ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                    <Text style={styles.linea}>Restricciones de Utilización Indicadas: </Text>
                    <Text style={{fontSize: 12}}>{item.codi_Restricciones_Utilizacion}</Text>
                    </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Existen Cánones : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Existen_Canones ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Indicar Cánones : </Text>
                        <Text style={{fontSize: 12}}>{item.codi_Indicar_Canones ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                    <Text style={styles.linea}> </Text>
                    </text>
                    </text>
                    
                    <text style={styles.tableRow}>
                    <Text style={styles.tableHeader}>
                      <Text style={{ fontWeight: 'bold' }}>Valor Aduana</Text>
                    </Text>
                  </text>

                    <text style={styles.tableRow}>
                     
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Conversión a Dólares : </Text>
                          <Text style={{fontSize: 12}}>{item.deva_ConversionDolares}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Tipo de Vinculación : </Text>
                          <Text style={{fontSize: 12}}>{item.codi_Tipo_Vinculacion}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Concepto Monto Declarado : </Text>
                          <Text style={{fontSize: 12}}>{item.codi_Concepto_Monto_Declarado}</Text>
                        </text>
                    </text>
                    
                   
                    <text style={styles.tableRow}>
                       
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Precio Factura : </Text>
                        <Text style={{fontSize: 12}}>{item.base_PrecioFactura}</Text>
                      </text>
                      <text style={styles.tableCell}>
                          <Text style={styles.linea}>Pagos Indirectos : </Text>
                          <Text style={{fontSize: 12}}>{item.base_PagosIndirectos}</Text>
                      </text>
                      
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Precio Real : </Text> 
                        <Text style={{fontSize: 12}}>{item.base_PrecioReal}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Monto Condición : </Text>
                          <Text style={{fontSize: 12}}>{item.base_MontCondicion}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Monto de Reversión : </Text> 
                          <Text style={{fontSize: 12}}>{item.base_MontoReversion}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>Comisión Correlaje : </Text> 
                          <Text style={{fontSize: 12}}>{item.base_ComisionCorrelaje}</Text>
                        </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Gasto Envase Embalaje : </Text> 
                        <Text style={{fontSize: 12}}>{item.base_Gasto_Envase_Embalaje}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Valores Materiales Incorporado : </Text> 
                        <Text style={{fontSize: 12}}>{item.base_ValoresMateriales_Incorporado}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Valor Materiales Utilizados : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Valor_Materiales_Utilizados}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Valor Materiales Consumidos : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Valor_Materiales_Consumidos}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Valor Ingeniería Importado : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Valor_Ingenieria_Importado}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Valor Cánones : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Valor_Canones}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                        
                   
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Gasto Transporte Importada : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Gasto_TransporteM_Importada}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Gastos Carga Importada : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Gastos_Carga_Importada}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Costos Seguro : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Costos_Seguro}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Total Ajustes Precio Pagado : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Total_Ajustes_Precio_Pagado}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Gastos Asistencia Técnica : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Gastos_Asistencia_Tecnica}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Gastos Transporte Posterior : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Gastos_Transporte_Posterior}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                        
                    
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Derechos Impuestos : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Derechos_Impuestos}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Monto Intereses : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Monto_Intereses}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Deducciones Legales : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Deducciones_Legales}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Total Deducciones : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Total_Deducciones_Precio}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>Valor Aduana : </Text>
                        <Text style={{fontSize: 12}}>{item.base_Valor_Aduana}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}></Text>
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
