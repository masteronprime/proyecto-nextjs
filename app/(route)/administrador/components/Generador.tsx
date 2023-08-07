'use client'

import Select from "./Select";

interface GeneradorProsp{
  label:string
  data:any
}

const Generador: React.FC<GeneradorProsp> = ({
  label,
  data
}) => {


  return ( 
    <>
      <div>
        {label}
      </div>
      <Select data={data}/>
    </>
   );
}
 
export default Generador;