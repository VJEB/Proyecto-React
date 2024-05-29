import { nullable, z } from 'zod'

const oficioProfesionSchema = z.object({
  ofpr_Id: z.number(),
  ofpr_Nombre: z.string(),
  usua_UsuarioCreacion: z.number(),
  ofpr_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  ofpr_FechaModificacion: z.string().nullable(),
  ofpr_Estado: z.boolean(),
  usuarioCreacionNombre: z.string(),
  usuarioModificacionNombre: z.string().nullable(),
})

export type Oficio_Profesion = z.infer<typeof oficioProfesionSchema>
