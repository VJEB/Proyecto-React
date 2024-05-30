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

interface Aduanas {
  adua_Id: number
  adua_Codigo: string
  adua_Nombre: string
  adua_Direccion_Exacta: string
  pvin_Id: string | null
  ciud_Id: string | null
  usua_UsuarioCreacion: number
  adua_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  adua_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  adua_FechaEliminacion: string | null
}

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


interface Ciudadddl {
  ciud_Id: number | null
  ciud_Nombre: string | null
}

interface Pais {
  pais_Id: number
  pais_Nombre: string

}

interface Provincia {
  pvin_Id: number
  pvin_Nombre: string
}

export const getAduana = async () => {
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
    return data.data.map((aldea: Aduana) => {
      return {
        adua_Id: aldea.adua_Id,
        adua_Nombre: aldea.adua_Nombre,
        adua_Codigo: aldea.adua_Codigo,
        adua_Direccion_Exacta: aldea.adua_Direccion_Exacta,
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

export const paisddl = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Paises/Listar?pais_EsAduana=true',
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.map((pais: Pais) => {
      return {
        pais_Id: pais.pais_Id,
        pais_Nombre: pais.pais_Nombre,
        // status: 'in progress',
        // label: 'documentation',
        // priority: 'medium',
      }
    })
  }catch (error) {
    return []
  }
}

export const provinciaddl = async (pais_Id: number) => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey
    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_SimexPro_Url}api/Provincias/ProvinciasFiltradaPorPaisYesAduana?pais_Id=${pais_Id}&pvin_EsAduana=false`,
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.map((provincia: Provincia) => {
      return {
        pvin_Id: provincia.pvin_Id,
        pvin_Nombre: provincia.pvin_Nombre,
        // status: 'in progress',
        // label: 'documentation',
        // priority: 'medium',
      }
    })
  }catch (error) {
    return []
  }
}


export const ciudadesddl = async (pvin_Id: number) => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_SimexPro_Url}api/Ciudades/CiudadesFiltradaPorProvincias?pvin_Id=${pvin_Id}`,
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.map((ciudadddl: Ciudadddl) => {
      return {
        ciud_Id: ciudadddl.ciud_Id,
        ciud_Nombre: ciudadddl.ciud_Nombre,
        // status: 'in progress',
        // label: 'documentation',
        // priority: 'medium',
      }
    })
  }catch (error) {
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

    const response = await axios.get(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Ciudades/Listar?ciud_EsAduana=true',
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data

    return getAduana()
      .then((aduana: Aduana[]) => {
        return data.data.map((ciudad: Ciudad) => {
          return {
            id: ciudad.ciud_Id,
            ciudad: ciudad.ciud_Nombre,
            pais: ciudad.pais_Nombre,
            provincia: ciudad.pvin_Nombre,
            subRows: aduana.filter((adu) => adu.ciud_Id === ciudad.ciud_Id),
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

export const guardarAduana = async (Aduana : Aduanas) =>{
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.post(
     ` ${import.meta.env.VITE_API_SimexPro_Url}api/Aduanas/${Aduana.adua_Id === 0 ? 'Insertar' : 'Editar'}`, Aduana,
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.data
    console.log(data.messageStatus)
    return data.messageStatus === "1"
  } catch (error) {
    console.error('Error in cargarCiudades:', error)
    return []
  }

}

export const eliminarAduana = async (adua_Id : number) =>{
  try {
    console.log(adua_Id)
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.post(
     ` ${import.meta.env.VITE_API_SimexPro_Url}api/Aduanas/Eliminar`, 
     {
      adua_Id: adua_Id,
      adua_Codigo: '',
      adua_Nombre: '',
      adua_Direccion_Exacta: '',
      pvin_Nombre: '',
      pvin_Id: 0,
      ciud_Id: 0,
      ciud_Nombre: '',
      usua_UsuarioCreacion: 1,
      adua_FechaCreacion:  new Date().toISOString(),
      usua_UsuarioModificacion: 1,
      adua_FechaModificacion:  new Date().toISOString(),
      usua_UsuarioEliminacion: 1,
      adua_FechaEliminacion:  new Date().toISOString(),
      adua_Estado: true,
      usarioCreacion: '',
      usuarioModificacion: ''
     },
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log (response)
    const data = await response.data
    return data.messageStatus === "1"
  } catch (error) {
    console.error('Error in cargarCiudades:', error)
    return []
  }

}