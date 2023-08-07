import getCurrentUser from "@/app/actions/getCurrentUser";
import UpdateUser from "./components/UpdateUser";

const UserEdit = async () => {
  const currentUser = await getCurrentUser();
  
  
  return ( 
    <>
      <UpdateUser currentUser={currentUser}  />
    </>
   );
}
 
export default UserEdit;