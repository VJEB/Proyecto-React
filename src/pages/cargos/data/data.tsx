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

interface Empleado {
  empl_Id: number
  empl_Nombres: string
  empl_Apellidos: string
  empl_DNI: string
  escv_Id: number
  escv_Nombre: string
  empl_NombreCompleto: string
  empl_Sexo: string
  empl_FechaNacimiento: string
  empl_Telefono: string
  empl_DireccionExacta: string
  pvin_Id: number
  pvin_Nombre: string
  pais_Id: number
  pais_Codigo: string
  pais_Nombre: string
  empl_CorreoElectronico: string
  carg_Id: number
  carg_Nombre: string
  empl_EsAduana: boolean
  usua_UsuarioCreacion: number
  usuarioCreacionNombre: string
  empl_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  usuarioModificacionNombre: string | null
  empl_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  usuarioEliminacionNombre: string | null
  empl_FechaEliminacion: string | null
  empl_Estado: boolean
  usua_UsuarioActivacion: number | null
  usuarioActivacionNombre: string | null
  empl_FechaActivacion: string | null
}

export const cargarEmpleados = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Empleados/Listar',
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
    return data.data.map((empleado: Empleado) => {
      return {
        empl_Id: empleado.empl_Id,
        empl_Nombres: empleado.empl_Nombres,
        empl_Apellidos: empleado.empl_Apellidos,
        empl_DNI: empleado.empl_DNI,
        escv_Nombre: empleado.escv_Nombre,
        empl_NombreCompleto: empleado.empl_NombreCompleto,
        empl_Sexo: empleado.empl_Sexo,
        empl_FechaNacimiento: empleado.empl_FechaNacimiento,
        empl_Telefono: empleado.empl_Telefono,
        empl_DireccionExacta: empleado.empl_DireccionExacta,
        pvin_Nombre: empleado.pvin_Nombre,
        pais_Nombre: empleado.pais_Nombre,
        empl_CorreoElectronico: empleado.empl_CorreoElectronico,
        carg_Id: empleado.carg_Id,
      }
    })
  } catch (error) {
    console.error(`Error al cargar empleados: ${error}`);
    
    return []
  }
}

export const cargarCargos = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await fetch(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Cargos/Listar',
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

    return cargarEmpleados()
      .then((empleados: Empleado[]) => {
        return data.data.map((cargo: Cargo) => {
          return {
            id: cargo.carg_Id,
            cargo: cargo.carg_Nombre,
            subRows: empleados.filter((emp) => emp.carg_Id === cargo.carg_Id),
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
