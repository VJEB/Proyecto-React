import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
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
    backgroundColor: '#f2f2f2',
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

  peju_Id: number
  peju_PuntoReferencia: string
  peju_NumeroLocalRepresentante: string
  peju_PuntoReferenciaRepresentante: string
  peju_TelefonoEmpresa: string
  peju_TelefonoFijoRepresentanteLegal: string
  peju_TelefonoRepresentanteLegal: string
  peju_CorreoElectronico: string
  peju_CorreoElectronicoAlternativo: string
  colo_Nombre: string
  alde_Nombre: string
  ciudadRepresentante: string 
  coloniaRepresentante: string
  aldeaRepresemtante: string 
  peju_NumeroLocalApart: string
  peju_FechaCreacion: string
  
  coin_Id: number
    pers_RTN: string
    pers_FormaRepresentacion: string
    coin_TelefonoCelular: string
    coin_TelefonoFijo: string 
    coin_CorreoElectronico: string
    coin_CorreoElectronicoAlternativo: string
    coin_FechaCreacion: string
}

interface  PDFGeneratorProps {
  data: PersonaNatural[];
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ data = []}) => {
  const [showPdf, setShowPdf] = useState(false);
  const pageSize = 26; 
  const totalPages = Math.ceil(data.length / pageSize);
  const hasPenaId = data.some((item) => 'pena_Id' in item);
  const hasCoinId = data.some((item) => 'coin_Id' in item);
  const hasPejuId = data.some((item) => 'peju_Id' in item);


  let headers = [];
  let rowFields = [];
  let titulo: string;

  if (hasPenaId) {
    headers = ['DNI', 'Nombre',  'Dirección'];
    
    rowFields = ['pena_DNI', 'pers_Nombre', 'pena_DireccionExacta'];
    titulo = "     Persona Natural"
  } else if (hasPejuId) {
    headers = ['RTN','Nombre', 'Dirección'];
    
    rowFields = ['pers_RTN','pers_Nombre', 'ciud_Nombre'];
    titulo = "     Persona Juridica"

  } else if (hasCoinId) {
    
    headers = ['RTN','Nombre', 'Dirección'];
    
    rowFields = ['pers_RTN','pers_Nombre', 'ciud_Nombre'];
   
    titulo = "Comerciante Individual"
  }

  console.log("llega?:",JSON.stringify(data, null, 2))

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
              <Text style={{ fontSize: 18, marginHorizontal: '33%', marginBottom: 5}}>Contratos de Adhesión</Text>
              <Text style={{ fontSize: 18,marginHorizontal: '32%'}}> {titulo}</Text>

              <View style={styles.table} >
               <View style={styles.tableRow} >
                {headers.map((header, idx) => (
                    <Text key={idx} style={styles.tableHeader}>{header}</Text>
                  ))}
                </View> 
                {data
                  .slice(index * pageSize, (index + 1) * pageSize)
                  .map((item, i) => (
                    <View  style={styles.tableRow}  key={i}>
                      {
                      rowFields.map((field, idx)  => (
                        <Text key={idx} style={styles.tableCell}>{item[field]} </Text>
                      ))}

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
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          
        </div>
      )}
    </div>
  );

}
export default PDFGenerator;
