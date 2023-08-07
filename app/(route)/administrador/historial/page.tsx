import Heading from "@/app/components/Heading";
import prismadb  from "@/app/libs/prismadb"
import SearchHistorial from "./components/SearchHistorial";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";


const ConstituyentePage = async ()=> {
  
  const currentUser = await getCurrentUser();

  if(currentUser?.role !== "admin"){
    return (
      <EmptyState
        title="No tienes accesso a historial"
        subtitle="Solo administradores pueden usar esto"
      />
    )
  }
  
  return (
    <>
      {/* <hr className=" mt-6 border-2 border-gray-500 opacity-50" /> */}
      <div className="flex-col mt-6">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Heading
            title="Historial"
          />
          <SearchHistorial />
        </div>
      </div>
    </>
    
  );
}

export default ConstituyentePage;