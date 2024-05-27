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
interface Cargo {
  carg_Id: number | null
  carg_Nombre: string | null
  carg_Aduana: boolean | null
  usua_UsuarioCreacion: number
  usua_UsuarioModificacion: number | null
  usuarioCreacionNombre: string | null
  carg_FechaCreacion: string | null
  usuarioModificacionNombre: string | null
  carg_FechaModificacion: string | null
  usua_UsuarioEliminacion: string | null
  carg_FechaEliminacion: string | null
  pvin_Nombre: string | null
  carg_Estado: boolean | null
}

export const cargarCargos = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey;

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(import.meta.env.VITE_API_SimexPro_Url + 'api/Cargos/Listar', {
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
    return data.data.map((cargo: Cargo) => {
      return {
        id: cargo.carg_Id,
        title: cargo.carg_Nombre,
        // subRows: [],
        // status: 'in progress',
        // label: 'documentation',
        // priority: 'medium',
      }
    })
  } catch (error) {
    return []
  }
}
