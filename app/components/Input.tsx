'use client'

import clsx from 'clsx'
import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from 'react-hook-form'

interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
  placeholder?:string
  value?:any

}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
  value,

}) => {



  return (
    <div className='flex flex-col'>
      <label
        htmlFor={id}
        className='
          block
          text-lg
          font-medium
          leading-6
          text-gray-900
        '
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          placeholder={placeholder}
          id={id}
          value={value}
          type={type}
          autoComplete={id}
          disabled={disabled}
          
          {...register(id, { required })}
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
            sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
}

export default Input;