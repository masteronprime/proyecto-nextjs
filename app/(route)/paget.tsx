import getCurrentUser from "../actions/getCurrentUser";
import RedirectClient from "@/app/components/RedirectClient"

const PageMain = async () => {

  const currentUser = await getCurrentUser();
  return (
  <>
      {
        currentUser  && <RedirectClient role={currentUser?.role} />
      }
  </>)
}
 
export default PageMain;