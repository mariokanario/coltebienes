'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PropertyListTable from './ProperyListTable'
import { useEffect, useState } from 'react'
import list from '@/app/api/captaciones/list'
import { formDataInterface } from '@/components/context/FormDataInterface'
import Cookies from 'js-cookie'
import { useAlert } from '@/components/AlertContext'
import { useRouter } from 'next/navigation'


interface PropertyListProps {
  isHouse: boolean
}


const PropertyList = ({ isHouse }: PropertyListProps) => {
  const [formDataList, setFormDataList] = useState<formDataInterface[]>([])
  const { showMessage } = useAlert()
  const router = useRouter()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await list(isHouse === true ? 1 : 0)
        const { status, data } = response
        if (status === 200) {
          setFormDataList(data)
        } else if (status === 500) {
          showMessage("Error del servidor, por favor intenta nuevamente más tarde.", "error")
          Cookies.remove("auth_token")
          router.push("/login")
        }
      } catch (error: any) {
        console.error("Error al obtener datos:", error)
        showMessage("Error al obtener datos, por favor intenta nuevamente.", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      }
    }
    fetchData()
  }, [])



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PropertyListTable tableData={formDataList} isHouse={isHouse} />
      </Grid>
    </Grid>
  )
}

export default PropertyList
