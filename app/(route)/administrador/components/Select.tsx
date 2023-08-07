'use client'
import React, { useState, useEffect } from 'react';
import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal';
import Table from './Table';

interface Option {
  id: string;
  name: string;
}

interface State {
  options: Option[];
  selectedOption: string;
}

interface SelectProps {
  data: any | null;
}

const Select: React.FC<SelectProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  const [dataTable, setDataTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<State>({
    options: [
      {
        id: '2023-I',
        name: '2023-I',
      },
      {
        id: '2022-II',
        name: '2022-II',
      },
      {
        id: '2022-I',
        name: '2022-I',
      },
    ],
    selectedOption: '',
  });

  // console.log(dataTable)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setState((prev) => ({ ...prev, selectedOption }));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (state.selectedOption !== '') {
      // Aquí accedemos al valor del objeto en data según la opción seleccionada
      setDataTable(data[state.selectedOption]);
    }
    
  }, [state.selectedOption, data]);

  if (!isMounted) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1 className='text-gray-600 font-bold text-xl text-center'>Tabla</h1>
        <Table
          data={dataTable}
          selection={state.selectedOption}
        />
      </Modal>
      <div className=' mt-2 font-sans text-sm flex flex-col gap-y-2'>
        <select
          id='selectOption'
          value={state.selectedOption}
          onChange={handleSelectChange}
          className='block w-full mt-1 rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2 '
        >
          <option value=''>Seleccionar semestre</option>
          {state.options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <Button onClick={() => {
          setIsOpen(true)
          console.log(state.selectedOption)
        }}>
          Ver
        </Button>
      </div>
    </>
  );
};

export default Select;
