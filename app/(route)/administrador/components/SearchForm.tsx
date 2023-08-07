'use client'
import clsx from 'clsx';
import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
}

interface SearchFormProps {
  users: User[];
  onSearch: (searchTerm: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ users, onSearch }) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      <div className="text-gray-500 px-1 py-2 text-md font-bold">Buscar constituyentes</div>
      <input
        type="text"
        placeholder="Buscar constituyentes por codigo o nombre"
        value={searchTerm}
        onChange={handleInputChange}
        className={clsx(`
            px-3
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            sm:text-sm
            sm:leading-6`
        )}
      />
    </div>
  );
};

export default SearchForm;