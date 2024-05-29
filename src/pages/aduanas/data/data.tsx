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
import axios from 'axios'

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

interface Aduana {
  adua_Id: number
  adua_Codigo: string
  adua_Nombre: string
  adua_Direccion_Exacta: string
  pvin_Nombre: string | null
  pvin_Id: number | null
  ciud_Id: number | null
  ciud_Nombre: string | null
  usua_UsuarioCreacion: number
  adua_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  adua_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  adua_FechaEliminacion: string | null
  adua_Estado: boolean
  usarioCreacion: string | null
  usuarioModificacion: string | null
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
    return data.data.map((ciudad: Ciudad) => {
      return {
        ciud_Id: ciudad.ciud_Id,
        ciud_Nombre: ciudad.ciud_Nombre,
        pvin_Id: ciudad.pvin_Id,
        pvin_Nombre: ciudad.pvin_Nombre,
        usua_UsuarioCreacion: ciudad.usua_UsuarioCreacion,
        ciud_FechaCreacion: ciudad.ciud_FechaCreacion,
        usua_UsuarioModificacion: ciudad.usua_UsuarioModificacion,
        ciud_FechaModificacion: ciudad.ciud_FechaModificacion,
        usua_UsuarioEliminacion: ciudad.usua_UsuarioEliminacion,
        ciud_FechaEliminacion: ciudad.ciud_FechaEliminacion,
        ciud_Estado: ciudad.ciud_Estado,
        usarioCreacion: ciudad.usua_UsuarioCreacion,
        usuarioModificacion: ciudad.usua_UsuarioModificacion
      }
    })
  } catch (error) {
    console.error(`Error al cargar las adunas: ${error}`)
    return []
  }
}

export const cargarAduanas = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Aduanas/Listar',
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )


    const data = await response.data

    return cargarCiudades()
      .then((ciudad : Ciudad[]) => {
        return data.data.map((aduana: Aduana) => {
          return {
            adua_Id: aduana.adua_Id,
            adua_Codigo: aduana.adua_Codigo,
            adua_Nombre: aduana.adua_Nombre,
            adua_Direccion_Exacta: aduana.adua_Direccion_Exacta,
            pvin_Nombre: aduana.pvin_Nombre,
            pvin_Id: aduana.pvin_Id,
            usua_UsuarioCreacion: aduana.usua_UsuarioCreacion,
            adua_FechaCreacion: aduana.adua_FechaCreacion,
            usua_UsuarioModificacion: aduana.usua_UsuarioModificacion,
            adua_FechaModificacion: aduana.adua_FechaModificacion,
            usua_UsuarioEliminacion: aduana.usua_UsuarioEliminacion,
            adua_FechaEliminacion: aduana.adua_FechaEliminacion,
            adua_Estado: aduana.adua_Estado,
            usarioCreacion: aduana.usarioCreacion,
            usuarioModificacion: aduana.usuarioModificacion,
            subRows: ciudad.filter((ciud) => aduana.ciud_Id === ciud.ciud_Id),
            // status: 'in progress',
            // label: 'documentation',
            // priority: 'medium',
          }
        })
      })
      .catch((err) => {
        console.error('Error al cargar los cargos:', err)
        return [] // Return an empty array in case of error
      })
  } catch (error) {
    console.error('Error in cargarCargos:', error)
    return []
  }
}


export const guardarAduana = async (Aduana : Aduana) =>{
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.post(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Aduanas/Insertar', Aduana,
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }

    )
    const data = await response.data
    return data.datamessageStatus === "1"

  } catch (error) {
    console.error('Error in cargarCiudades:', error)
    return []
  }

}