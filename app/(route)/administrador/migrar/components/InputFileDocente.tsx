'use client'
import { useState } from "react";
import axios from "axios";
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";

const InputFileDocente = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileBinary, setFileBinary] = useState<ArrayBuffer | null>(null);
  // Define el tipo de fileBinary como ArrayBuffer | null
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);

      // Leer el archivo usando FileReader
      const reader = new FileReader();

      // Establecer la función de callback para cuando la lectura esté completa
      reader.onload = (e) => {
        const fileContent = e.target?.result;
        if (fileContent instanceof ArrayBuffer) {
          setFileBinary(fileContent);
        }
      };

      // Iniciar la lectura del archivo como un ArrayBuffer
      reader.readAsArrayBuffer(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!fileName){
        toast.error("Algo ha sucedo mal")
        return
      }
      setIsLoading(true);
      await axios.post(`/api/convertir/docente/`, fileBinary, { responseType: 'arraybuffer' })
        .then(() => {
          toast.success("Subido exitosamente")
          router.push("/administrador")
        })
        .catch(()=>{
          toast.error("Error, algo ha pasado")
        })
        .finally(() => {
          setIsLoading(false);
        });
      setFileName("")
    } catch (error: any) {
      console.log(error);
    }
  };


  return ( 
    <div className="relative mt-6">
      
      <Modal
        isOpen={isOpen}
        onClose={()=>setIsOpen(false)}
      >
        <img
          src="/images/formatoDocente.png"
          alt="formato Alumno"
          className="rounded-2xl object-cover"
        />
      </Modal>

      <form onSubmit={onSubmit}>
        <div className="text-gray-500 px-1 py-2 text-md font-bold">Migrar docentes</div>
        <div className="mt-4">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="fileInput">
            Alumnos
          </label> */}
          <div className="relative">
            <input
              type="file"
              id="fileInput"
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <div className="flex items-center justify-between bg-white border rounded-lg shadow-sm px-4 py-2 cursor-pointer">
              <span className="text-gray-600">{fileName || 'Seleccione un archivo'}</span>
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-x-4 gap-y-2 flex-col sm:flex-row">
          <Button
            type="submit"
            secondary
            disabled={isLoading}
          >
            Subir
          </Button>
          <Button
            type="button"
            secondary
            disabled={isLoading}
            onClick={()=>setIsOpen(true)}
          >
            Ver formato
          </Button>
        </div>
      </form>
      <div className="px-6 py-6">
        {
          // historial.length===0 ? (
          //   <EmptyState
          //     title="No se encontro"
          //     subtitle="Intenta buscar con otro codigo de constituyente"
          //   />
          // ) : (
          //     <TableHistory data={historial} />
          // )
        }
      </div>
    </div>
   );
}
 
export default InputFileDocente;