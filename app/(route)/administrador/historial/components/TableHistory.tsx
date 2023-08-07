'use client'

import { useEffect, useRef, useState } from "react";
import convertTableToPdf from "../../../../helpers/convertTableToPdf"
import { format } from "date-fns"
import { es } from 'date-fns/locale';

interface TableProps {
  data: any
}

const TableHistory: React.FC<TableProps> = ({ data }) => {


  const [isMounted, setIsMounted] = useState(false);
  const refTable = useRef<HTMLTableElement>(null)

  const downloadPdf = () => {
    convertTableToPdf(refTable, "informe", "")
  }

  const formatFecha = (fechaOriginal:any)=>{
    const fecha = new Date(fechaOriginal);
    const fechaFormateada = format(fecha, 'dd MMMM yyyy', { locale: es });
    return fechaFormateada
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="overflow-x-auto">
      <div
        onClick={downloadPdf}
        className="px-4 flex gap-x-4 hover:border-gray-500 border-gray-500  rounded-lg border-2 text-center justify-center items-center hover:cursor-pointer hover:opacity-80 py-1 mt-1 mb-3">
        <img
          src="/icons/download.svg"
          className="w-6 h-6 opacity-50 text-gray-500"
        />
        <div className="text-sm text-gray-600">Descargar historial</div>
      </div>
      
      <table
        ref={refTable}
        className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Codigo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Caracteristicas actualizadas
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ultima Actualzacion
            </th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row: any) => (
            <tr key={row?.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{row?.alumnosCodigo}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{row?.mensaje}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatFecha(row?.updatedAt)}
                  </div>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHistory;
