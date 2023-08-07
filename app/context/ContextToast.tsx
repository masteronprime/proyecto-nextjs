'use client'

import { useEffect, useState } from 'react';
import {Toaster} from 'react-hot-toast'



const ToasterContext = ()=>{
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return(
    <Toaster />
  )
}
export default ToasterContext