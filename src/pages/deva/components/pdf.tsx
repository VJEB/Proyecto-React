import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import backgroundImage from './fondo.jpg'; // Asegúrate de que esta ruta sea correcta
import { getFacturas1, getItems } from '../data/data'

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
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
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
    marginTop: 3,
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
    marginTop: 12,
    marginBottom: -12,
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
  if(dato != null){
  data = [
    dato
    ]
  }
  else{
    data = ["nada"];
  }
  const [facturasConDetalles, setFacturasConDetalles] = useState([]);


  useEffect(() => {
    const fetchFacturasYDetalles = async () => {
      try {
        const facturas = await getFacturas1(deva_Id);

        const facturasConDetallesPromises = facturas.map(async (factura) => {
          const items = await getItems(factura.fact_Id);
          console.log("items "+items)
          return { ...factura, items };
        });

        const facturasConDetalles = await Promise.all(facturasConDetallesPromises);
        setFacturasConDetalles(facturasConDetalles);
        console.log(facturasConDetalles)
      } catch (error) {
        console.error('Error fetching facturas y detalles:', error);
      }
    };

    fetchFacturasYDetalles();
  }, [data.deva_Id]);


  // console.log("entra al pdf?",JSON.stringify(data, null, 2))

  useEffect(() => {
    if (data.length > 0) {
      setShowPdf(true);
    }
  }, [data]);


  const generatePDF = () => (
    <PDFViewer width="100%" height="500px">
      <Document>
          <Page  size="LEGAL" wrap={true} style={styles.page}>
            <View style={styles.section}>
             <Image
                style={styles.backgroundImage}
                src={backgroundImage} 
              /> 
              
              <Text style={{ fontSize: 20, marginHorizontal: '31%', marginBottom: 2, marginTop: -3 }}>Declaración de Valor</Text>
              <View style={styles.section}>
                {data
                  .map((item, i) => (
                    <View style={{fontSize: 12}} key={i}>
                      <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Informacion Aduana</Text>
                      </Text>
                    </text>
                      <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Aduana Ingreso : {item.adua_IngresoNombre}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Despacho Nombre : {item.adua_DespachoNombre}</Text>
                        </text>
                        
                    </text>
                    <text style={styles.tableRow}>
                    <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Declaración de Mercancía : {item.deva_DeclaracionMercancia}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Fecha de Aceptación : {item.deva_FechaAceptacion.split('T')[0]}</Text>
                        </text>
                    </text>

                    <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Informacion Importador</Text>
                      </Text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Nombre o Razón Social: {item.impo_Nombre_Raso}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• RTN : {item.impo_RTN}</Text>
                        </text>
                        
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Número de Registro : {item.impo_NumRegistro}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Dirección Importador : {item.impo_Direccion_Exacta}</Text>
                        </text>

                        </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Ciudad Importador : {item.impo_CiudadNombre}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• País Importador: {item.impo_PaisNombre}</Text>
                        </text>
                        </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• IMail Importador : {item.impo_Correo_Electronico}</Text>
                        </text>
                        <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Teléfono Importador : {item.impo_Telefono}</Text>
                      </text>
                      
                    </text>
                    <text style={styles.tableRow}>
                    <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Fax Importador : {item.impo_Fax}</Text>
                      </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Nivel Comercial : {item.nico_Descripcion}</Text>
                        </text>
                    </text>

                    <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Informacion Proveedor</Text>
                      </Text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Nombre Proveedor : {item.prov_Nombre_Raso}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Dirección Proveedor : {item.prov_Direccion_Exacta}</Text>
                        </text>
                        
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• País Proveedor : {item.prov_PaisNombre}</Text>
                      </text>
                     <text style={styles.tableCell}>
                       <Text style={styles.linea}>• Ciudad Proveedor : 
                       {item.prov_CiudadNombre}</Text>
                     </text>
                     </text>
                    <text style={styles.tableRow}>
                    
                     <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Correo Proveedor : 
                       {item.prov_Correo_Electronico}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Teléfono Proveedor :  
                        {item.prov_Telefono}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Fax Proveedor : 
                           {item.prov_Fax}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Condicion Comercial : 
                          {item.coco_Descripcion}</Text>
                        </text>
                      
                    </text>

                    <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Información Intermediario</Text>
                      </Text>
                    </text>

                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Nombre o Razón social : 
                          {item.inte_Nombre_Raso}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Ciudad Intermediario : 
                          {item.inte_Direccion_Exacta}</Text>
                        </text>
                        
                      </text>
                      <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Ciudad Intermediario : 
                          {item.inte_CiudadNombre}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• País Intermediario : 
                          {item.inte_PaisNombre}</Text>
                        </text>
                        </text>
                      <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Correo Intermediario : 
                          {item.inte_Correo_Electronico}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Teléfono Intermediario : 
                          {item.inte_Telefono}</Text>
                        </text>
                      </text>
                      <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Fax Intermediario : 
                          {item.inte_Fax}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Tipo Intermediario : 
                          {item.inte_Tipo_Otro}</Text>
                        </text>
                      </text>


                    <text style={styles.tableRow}>
                      <Text style={styles.tableHeader}>
                        <Text style={{ fontWeight: 'bold' }}>Características de Transacción</Text>
                      </Text>
                    </text>

                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Lugar de Entrega :  
                         {item.deva_LugarEntrega}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• País de Entrega :  
                         {item.pais_EntregaNombre}</Text>
                      </text>
                      
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Incoterm : 
                        {item.inco_Descripcion}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Versión de Incoterms :
                         {item.inco_Version}</Text>
                      </text>
                      </text>
                    <text style={styles.tableRow}>

                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Número de Contrato : 
                        {item.deva_NumeroContrato}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Fecha de Contrato : 
                        {item.deva_FechaContrato}</Text>
                      </text>                   
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Forma de Envío : 
                        {item.foen_Descripcion}</Text>
                      </text>
                      <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Pago Efectuado : 
                          {item.deva_PagoEfectuado !== null ? (item.deva_PagoEfectuado ? 'Si' : 'No') : 'null'}</Text>
                      </text>
                      
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Forma de Pago : 
                        {item.fopa_Descripcion}</Text>
                      </text>
                      <text style={styles.tableCell}>
                            <Text style={styles.linea}>• Lugar de Embarque : 
                            {item.lugarEmbarque}</Text>
                      </text>
                      </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• País de Exportación : 
                        {item.pais_ExportacionNombre}</Text>
                      </text>
                      <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Fecha de Exportación : 
                          {item.deva_FechaExportacion}</Text>
                        </text>
                    </text>
                   <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Moneda : 
                        {item.monedaNombre}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}></Text>
                      </text>
                    </text>
                   
                    
                    </View>
                   
                   
                  
                  ))}
              </View>
              
</View>
              <Text style={styles.pagination}>
                Página 1 de 1
              </Text>
</Page>
<Page  size="LEGAL" wrap={true} style={styles.page}>
  
              
              <View style={styles.section}>
              <Image
                style={styles.backgroundImage}
                src={backgroundImage} 
              /> 
              {data
                .map((item, i) => (
                  <View style={{fontSize: 12}} key={i}>
                    <text style={styles.tableRow}>
                    <Text style={styles.tableHeader}>
                      <Text style={{ fontWeight: 'bold' }}>Condiciones de Transacción</Text>
                    </Text>
                  </text>


                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Finalización : 
                        {item.deva_Finalizacion ? 'Si' : 'No'}</Text>
                      </text>
                      
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Descuentos Indirectos : 
                        {item.codi_Pagos_Descuentos_Indirectos ? 'Si' : 'No'}</Text>
                      </text>
                     
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Depende Precio Condición : 
                        {item.codi_Depende_Precio_Condicion ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Indicar Existe Condición : 
                        {item.codi_Indicar_Existe_Condicion ? 'Si' : 'No'}</Text>
                      </text>
                      </text>
                    <text style={styles.tableRow}>
                    
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Condicionada Revertir : 
                        {item.codi_Condicionada_Revertir ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Vinculación Comprador Vendedor : 
                        {item.codi_Vinculacion_Comprador_Vendedor ? 'Si' : 'No'}</Text>
                      </text>
                    </text>

                    
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Vinculación Influye Precio : 
                        {item.codi_Vinculacion_Influye_Precio ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Restricciones de Utilización : 
                        {item.codi_Indicar_Restricciones_Utilizacion ? 'Si' : 'No'}</Text>
                      </text>
                      
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Restricciones de Utilización Indicadas: {item.codi_Restricciones_Utilizacion}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Existen Cánones : 
                        {item.codi_Existen_Canones ? 'Si' : 'No'}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                    
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Indicar Cánones : 
                        {item.codi_Indicar_Canones ? 'Si' : 'No'}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>  </Text>
                      </text>
                    </text>
                    
                    <text style={styles.tableRow}>
                    <Text style={styles.tableHeader}>
                      <Text style={{ fontWeight: 'bold' }}>Valor Aduana</Text>
                    </Text>
                  </text>

                    <text style={styles.tableRow}>
                     
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Conversión a Dólares : 
                          {item.deva_ConversionDolares}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Tipo de Vinculación : 
                          {item.codi_Tipo_Vinculacion}</Text>
                        </text>
                        
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Concepto Monto Declarado : 
                          {item.codi_Concepto_Monto_Declarado}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Precio Factura : 
                        {item.base_PrecioFactura}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                    
                      <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Pagos Indirectos : 
                          {item.base_PagosIndirectos}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Precio Real :  
                        {item.base_PrecioReal}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Monto Condición : 
                          {item.base_MontCondicion}</Text>
                        </text>
                        <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Monto de Reversión :  
                          {item.base_MontoReversion}</Text>
                        </text>
                    
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                          <Text style={styles.linea}>• Comisión Correlaje :  
                          {item.base_ComisionCorrelaje}</Text>
                        </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Gasto Envase Embalaje :  
                        {item.base_Gasto_Envase_Embalaje}</Text>
                      </text>
                      </text>
                    <text style={styles.tableRow}>
                    
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Valores Materiales Incorporado :  
                        {item.base_ValoresMateriales_Incorporado}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Valor Materiales Utilizados : 
                        {item.base_Valor_Materiales_Utilizados}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Valor Materiales Consumidos : 
                        {item.base_Valor_Materiales_Consumidos}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Valor Ingeniería Importado : 
                        {item.base_Valor_Ingenieria_Importado}</Text>
                      </text>
                      
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Valor Cánones : 
                        {item.base_Valor_Canones}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Gasto Transporte Importada : 
                        {item.base_Gasto_TransporteM_Importada}</Text>
                      </text>
                      </text>
                    <text style={styles.tableRow}>
                    
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Gastos Carga Importada : 
                        {item.base_Gastos_Carga_Importada}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Costos Seguro : 
                        {item.base_Costos_Seguro}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Total Ajustes Precio Pagado : 
                        {item.base_Total_Ajustes_Precio_Pagado}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Gastos Asistencia Técnica : 
                        {item.base_Gastos_Asistencia_Tecnica}</Text>
                      </text>
                      
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Gastos Transporte Posterior : 
                        {item.base_Gastos_Transporte_Posterior}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Derechos Impuestos : 
                        {item.base_Derechos_Impuestos}</Text>
                      </text>
                      </text>
                    <text style={styles.tableRow}>
                    
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Monto Intereses : 
                        {item.base_Monto_Intereses}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Deducciones Legales : 
                        {item.base_Deducciones_Legales}</Text>
                      </text>
                    </text>
                    <text style={styles.tableRow}>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Total Deducciones : 
                        {item.base_Total_Deducciones_Precio}</Text>
                      </text>
                      <text style={styles.tableCell}>
                        <Text style={styles.linea}>• Valor Aduana : 
                        {item.base_Valor_Aduana}  </Text>
                      </text>
                    </text>
                  </View>
                  ))}
              </View>



              <Text style={styles.pagination}>
                Página 2 de 2
              </Text>
          </Page>
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
