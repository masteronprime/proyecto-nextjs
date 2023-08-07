  import getCurrentUser from "@/app/actions/getCurrentUser";
  import Heading from "../components/heading";
  import Informes from "./components/Informes";
  import SearchUser from "./components/SearchUser";
  import getAlumnosSemestre from "@/app/actions/getAlumnosSemestre";
  import getEgresadosSemestre from "@/app/actions/getEgresadosSemestre";
  import getGraduadosSemestre from "@/app/actions/getGraduadosSemestre";
  import getAlumnos from "@/app/actions/getAlumnos";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";




  const DashboardAdmin = async () => {

    const currentUser = await getCurrentUser();

    const alumnosSemestre = await getAlumnosSemestre();
    const egresadosSemestre = await getEgresadosSemestre()
    const graduadosSemestre = await getGraduadosSemestre()

    const alumnos = await getAlumnos()

    if (!currentUser){
      <ClientOnly>
        <EmptyState
          title="No autorizado"
          subtitle="Por favor, inicie sesion"

        />
      </ClientOnly>
    }

    return (
      <ClientOnly>
        <div className="px-6 py-11">
          {
            currentUser && <Heading
              // Aqui tiene que ir el rol
              title={`${currentUser?.typeRole}`}
              description="Acceso a buscar y consultar informacion de los constituyentes, y tambien informes"
            />
          }
          {
            alumnosSemestre && egresadosSemestre && graduadosSemestre && <Informes
              alumnosSemestre={alumnosSemestre}
              egresadosSemestre={egresadosSemestre}
              graduadosSemestre={graduadosSemestre}
            />
          }



          <hr className="border-gray-300 mt-11 border-2" />
          {
            alumnos && <SearchUser role={currentUser?.role} data={alumnos} />
          }


        </div>
      </ClientOnly>
    );
  }

  export default DashboardAdmin;