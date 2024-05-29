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

interface Proceso {
  proc_Id: number
  proc_Descripcion: string
  proc_CodigoHtml: string
  modu_Id: number | null
  modu_Nombre: string | null
  usua_UsuarioCreacion: number
  usuarioCreacion: string
  proc_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  usuarioModificacion: string | null
  proc_FechaModificacion: string | null
  usua_UsuarioEliminacion: number | null
  usuarioEliminacion: string | null
  proc_FechaEliminacion: string | null
  proc_Estado: boolean
}
export const getProcesos = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Procesos/Listar',
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.map((proceso: Proceso) => {
      return {
        proc_Id: proceso.proc_Id,
        proc_Descripcion: proceso.proc_Descripcion,
        proc_CodigoHtml: proceso.proc_CodigoHtml,
        modu_Id: proceso.modu_Id,
        modu_Nombre: proceso.modu_Nombre,
        usua_UsuarioCreacion: proceso.usua_UsuarioCreacion,
        usuarioCreacion: proceso.usuarioCreacion,
        proc_FechaCreacion: proceso.proc_FechaCreacion,
        usua_UsuarioModificacion: proceso.usua_UsuarioModificacion,
        usuarioModificacion: proceso.usuarioModificacion,
        proc_FechaModificacion: proceso.proc_FechaModificacion,
        usua_UsuarioEliminacion: proceso.usua_UsuarioEliminacion,
        usuarioEliminacion: proceso.usuarioEliminacion,
        proc_FechaEliminacion: proceso.proc_FechaEliminacion,
        proc_Estado: proceso.proc_Estado,
      }
    })
  } catch (error) {
    return []
  }
}
export const guardarProceso = async (proceso:Proceso) => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_SimexPro_Url}api/Procesos/${proceso.proc_Id === 0 ? 'Insertar' : 'Editar'}`, proceso,
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.messageStatus === "1"
  } catch (error) {
    return []
  }
}

