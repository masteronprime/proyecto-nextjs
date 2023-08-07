'use client'
import React from 'react';
import UserItem from './UserItem';



interface SearchResultsProps {
  results: any | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {

  return (
    <div className='mt-6 px-4'>
      {
        results.length !== 0 ? (
          <div className=''>
            <div className="py-2 px-8 flex gap-x-8 justify-between">
              <div className='text-sm font-bold text-gray-700' >Codigo</div>
              <div className='text-sm font-bold text-gray-700' >Nombre</div>
              <div className='text-sm font-bold text-gray-700' >Tipo</div>
            </div>
            <ul>
              {results.map((user:any) => (
                <UserItem key={user?.id} user={user} />
              ))}
            </ul>
          </div>
        )
        :
        <>
          <div className="mt-11 text-center text-lg text-gray-600">
            No se encontro ningun usuario
          </div>
        </>
      }
      
    </div>
  );
};

export default SearchResults;