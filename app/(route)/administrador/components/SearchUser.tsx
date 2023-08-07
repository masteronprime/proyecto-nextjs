'use client'
import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
}

interface SearchUserProps{
  role:string | null | undefined
  data:any
}


const SearchUser: React.FC<SearchUserProps> = ({
  role,
  data
}) => {
  const session = useSession()
  const router = useRouter()

  const [users, setUsers] = useState<User[]>(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(()=>{
    if (!role){
      router.push("/")
      return;
    }
    if (role!=="admin"){
      router.push("/constituyente")
    }
  }, [role, router])


  const handleSearch = (searchTerm: string) => {
    if (searchTerm===""){
      setSearchResults([]);
      return;
    }
    setSearchTerm(searchTerm);

    const filteredResults = users.filter((user:any) =>
      user.codigo.toLowerCase().includes(searchTerm.toLowerCase()) || user.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    console.log(session?.status)
    if (session?.status !== 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router])




  return (
    <div className='mt-11 h-[60vh]' >
      <SearchForm users={users} onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchUser;
