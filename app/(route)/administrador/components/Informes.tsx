
import Generador from "./Generador";

interface InformesProps{
  alumnosSemestre:any
  egresadosSemestre:any
  graduadosSemestre:any
}

const Informes: React.FC<InformesProps> = ({
  alumnosSemestre,
  egresadosSemestre,
  graduadosSemestre
}) => {

  return (
    <div className="w-full sm:w-4/5 lg:w-3/5 mt-11 text-gray-600 text-lg font-bold flex flex-col gap-y-3 w- ">
      INFORMES
      <div className="mt-8 px-2 text-sm flex flex-col gap-y-2">
        
        <Generador
          label="Generar alumnos por semestre"
          data={alumnosSemestre}
        />

        <hr className="border-1 border-gray-400 mt-6 mb-4 " />
        <Generador
          data={egresadosSemestre}
          label="Generar lista de alumnos egresados por semestre" />

        <hr className="border-1 border-gray-400 mt-6 mb-4 " />
        <Generador
          data={graduadosSemestre}
          label="Generar lista de graduados por semestre" />
      </div>
    </div>
   );
}
 
export default Informes;