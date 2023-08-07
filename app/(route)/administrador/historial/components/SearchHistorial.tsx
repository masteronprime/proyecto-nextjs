'use client'
import EmptyState from "@/app/components/EmptyState";
import clsx from "clsx";
import { useState } from "react";
import axios from "axios";
import TableHistory from "./TableHistory";



const SearchHistorial = () => {

  const[codigo, setCodigo] = useState('');
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event:any) => {
    setCodigo(event.target.value);
  };

  const onSubmit= async (e:any)=>{
    e.preventDefault();
    try {
      setIsLoading(true)
      await axios.get(`/api/historial/${codigo}`)
      .then(response=>{
        setHistorial(response.data)
      })
      .finally(()=>{
        setIsLoading(false)
      })
           
    } catch (error:any) {
      console.log(error)
    }
  }


  return ( 
    <div>
      <form onSubmit={onSubmit}>
        <div className="text-gray-500 px-1 py-2 text-md font-bold">Busqueda de historial de constituyentes</div>
        <input
          type="text"
          placeholder="Ingrese codigo de constituyente"
          value={codigo}
          onChange={handleInputChange}
          disabled={isLoading}
          className={clsx(`
              px-3
              form-input
              block
              w-full
              rounded-md
              border-0
              py-1.5
              text-gray-900
              shadow-sm
              ring-1
              ring-inset
              ring-gray-300
              placeholder:text-gray-400
              focus:ring-2
              focus:ring-inset
              sm:text-sm
              sm:leading-6`
          )}
        />
      </form>
      <div className="px-6 py-6">
        {
          historial.length===0 ? (
            <EmptyState
              title="No se encontro"
              subtitle="Intenta buscar con otro codigo de constituyente"
            />
          ) : (
              <TableHistory data={historial} />
          )
        }
      </div>
    </div>
   );
}
 
export default SearchHistorial;