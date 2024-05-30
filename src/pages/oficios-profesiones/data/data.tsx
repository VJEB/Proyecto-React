import axios from 'axios'

interface Oficio_Profesion {
  ofpr_Id: number
  ofpr_Nombre: string
  usua_UsuarioCreacion: number
  ofpr_FechaCreacion: string
  usua_UsuarioModificacion: number | null
  ofpr_FechaModificacion: string | null
  ofpr_Estado: boolean
  usuarioCreacionNombre: string
  usuarioModificacionNombre: string | null
}
export const getOficios_Profesiones = async () => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    const response = await axios.get(
      import.meta.env.VITE_API_SimexPro_Url + 'api/Oficio_Profesiones/Listar',
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.map((ofiPro: Oficio_Profesion) => {
      return {
        ofpr_Id: ofiPro.ofpr_Id,
        ofpr_Nombre: ofiPro.ofpr_Nombre,
        usua_UsuarioCreacion: ofiPro.usua_UsuarioCreacion,
        ofpr_FechaCreacion: ofiPro.ofpr_FechaCreacion,
        usua_UsuarioModificacion: ofiPro.usua_UsuarioModificacion,
        ofpr_FechaModificacion: ofiPro.ofpr_FechaModificacion,
        ofpr_Estado: ofiPro.ofpr_Estado,
        usuarioCreacionNombre: ofiPro.usuarioCreacionNombre,
        usuarioModificacionNombre: ofiPro.usuarioModificacionNombre,
      }
    })
  } catch (error) {
    return []
  }
}
export const guardarOficios_Profesiones = async (ofiPro: Oficio_Profesion) => {
  try {
    const apiKey = import.meta.env.VITE_ApiKey

    if (!apiKey) {
      console.error('API key is undefined.')
      return
    }

    ofiPro.usua_UsuarioModificacion = 1
    ofiPro.ofpr_FechaModificacion = new Date().toISOString()

    const response = await axios.post(
      `${import.meta.env.VITE_API_SimexPro_Url}api/Oficio_Profesiones/${ofiPro.ofpr_Id === 0 ? 'Insertar' : 'Editar'}`,
      ofiPro,
      {
        headers: {
          XApiKey: apiKey,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.data
    return data.data.messageStatus === '1'
  } catch (error) {
    return []
  }
}
