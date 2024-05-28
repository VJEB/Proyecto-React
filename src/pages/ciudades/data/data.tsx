import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

import axios from 'axios';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
]
interface Ciudad {
  ciud_Id: string | null
  ciud_Nombre: string | null
  pvin_Id: string | null
  pvin_Nombre: string | null
  pvin_Codigo: string | null
  pais_Codigo: string | null
  pais_Nombre: string | null
  pais_Id: string | null
  ciud_EsAduana: boolean | null
  usua_UsuarioCreacion: number
  usua_UsuarioModificacion: number | null
  usuarioCreacionNombre: string | null
  ciud_FechaCreacion: string | null
  usuarioModificacionNombre: string | null
  ciud_FechaModificacion: string | null
  usua_UsuarioEliminacion: string | null
  ciud_FechaEliminacion: string | null
  ciud_Estado: boolean | null
}

interface Aldea {
  alde_Id: string
  alde_Nombre: string
  ciud_Id: string
  ciud_Nombre: string
  pvin_Id: string
  pvin_Codigo: string
  pvin_Nombre: string
  usua_UsuarioCreacion: number
  usuarioCreacionNombre: string
  alde_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  usuarioModificacionNombre: string | null
  alde_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  alde_FechaEliminacion: string | null
  alde_Estado: boolean
}

export const getAldeas = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Aldea/Listar',
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )


    const data = await response.data
    return data.data.map((aldea: Aldea) => {
      return {
        alde_Id: aldea.alde_Id,
        alde_Nombre: aldea.alde_Nombre,
        ciud_Id: aldea.ciud_Id,
        ciud_Nombre: aldea.ciud_Nombre,
        pvin_Id: aldea.pvin_Id,
        pvin_Nombre: aldea.pvin_Nombre,
        // status: 'in progress',
        // label: 'documentation',
        // priority: 'medium',
      }
    })
  } catch (error) {
    return []
  }
}

export const cargarCiudades = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Ciudades/Listar?ciud_EsAduana=true',
      {
        method: 'GET',
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return getAldeas()
      .then((aldea: Aldea[]) => {
        return data.data.map((ciudad: Ciudad) => {
          return {
            id: ciudad.ciud_Id,
            ciudad: ciudad.ciud_Nombre,
            subRows: aldea.filter((ald) => ald.ciud_Id === ciudad.ciud_Id),
            // status: 'in progress',
            // label: 'documentation',
            // priority: 'medium',
          }
        })
      })
      .catch((err) => {
        console.error('Error al cargar las ciudades:', err)
        return [] // Return an empty array in case of error
      })
  } catch (error) {
    console.error('Error in cargarCiudades:', error)
    return []
  }
}
