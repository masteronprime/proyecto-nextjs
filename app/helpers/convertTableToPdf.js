import { jsPDF } from "jspdf"
import 'jspdf-autotable'

/**
 * @param { string } tableid El id de la tabla
 * @param { string } format 
 * @param { string } filename El nombre del archivo con el que se va a descargar
 */
const convertTableToPdf = (tableReference, filename = 'document', format) => {
  const tableFormats = {
    1: 'striped',
    2: 'grid',
    3: 'plain'
  }

  // la tabla
  const table = tableReference.current

  const doc = new jsPDF({ orientation: "landscape" })

  // automáticamente se genera la tabla
  
  doc.autoTable({
    html: table,
    theme: 'grid'
  })

  // se descarga el documento
  doc.save(filename + '.pdf')
}

export default convertTableToPdf