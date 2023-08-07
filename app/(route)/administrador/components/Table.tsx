'use client'

import { useEffect, useRef, useState } from "react";
import convertTableToPdf from "../../../helpers/convertTableToPdf"

interface TableProps{
  data:any
  selection:string
}

const Table: React.FC<TableProps> = ({ data, selection }) => {
  

  const [isMounted, setIsMounted] = useState(false);
  const refTable = useRef<HTMLTableElement>(null)

  const downloadPdf = ()=>{
    convertTableToPdf(refTable,"informe","")
  }

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted) return null

  return (
    <div className="overflow-x-auto">
      <img
        onClick={downloadPdf}
        src="icons/download.svg"
        className="w-6 h-6 absolute top-4 right-12 opacity-50 text-gray-500 hover:cursor-pointer hover:opacity-80"
      />
      <table
        ref={refTable}
        className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Codigo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Matriculado actual
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row:any) => (
            <tr key={row?.user?.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{row?.user?.codigo}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{row?.user?.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{row?.user?.estadoAlumno}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {
                    row?.user?.estadoAlumno==="graduando" && selection==="2023-I" ? "Matriculado" :"No matriculado"
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
