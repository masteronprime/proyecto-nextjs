
interface ItemUserProps{
  text:string | null | undefined | Date 
  label:string
}

const ItemUser: React.FC<ItemUserProps> = ({ text, label }) => {
  return ( 
    <>
    {
        text && (
          <div className="flex gap-x-4 items-center justify-center px-6">
            <div className="text-sm font-medium"> {label}: </div>
            <div className="text-sm font-mono"> 
            { `${text}` }
            </div>
          </div>
        )
    }
    
    </>
   );
}
 
export default ItemUser;