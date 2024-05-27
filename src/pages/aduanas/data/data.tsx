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
  adua_Codigo: string
  adua_Direccion_Exacta: string
  adua_Estado: boolean
  adua_FechaCreacion: string
  adua_FechaEliminacion: string | null
  adua_FechaModificacion: string | null
  adua_Id: number
  adua_Nombre: string
  ciud_Id: number
  ciud_Nombre: string | null
  pvin_Id: number
  pvin_Nombre: string | null
  usarioCreacion: string
  usua_UsuarioCreacion: number
  usua_UsuarioEliminacion: number | null
  usua_UsuarioModificacion: number | null
  usuarioModificacion: string | null
}

export const cargarAduanas = async () => {
  try {
    console.log('HOLA');
    
    const apiKey = import.meta.env.VITE_ApiKey;

    console.log(apiKey, 'APIKEY');
    

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(import.meta.env.VITE_API_SimexPro_Url + 'api/Aduanas/Listar', {
      method: 'GET',
      headers: {
        XApiKey: apiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.data.map((aduana: Aduana) => {
      return {
        id: aduana.adua_Codigo,
        title: aduana.adua_Nombre,
        subRows: [],
        // status: 'in progress',
        // label: 'documentation',
        // priority: 'medium',
      }
    })
  } catch (error) {
    return []
  }
}
