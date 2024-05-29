import { nullable, z } from 'zod'

const procesoSchema = z.object({
  proc_Id: z.number(),
  proc_Descripcion: z.string(),
  proc_CodigoHtml: z.string(),
  modu_Id: z.number().nullable(),
  modu_Nombre: z.string().nullable(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacion: z.string(),
  proc_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number().nullable(),
  usuarioModificacion: z.string().nullable(),
  proc_FechaModificacion: z.string().nullable(),
  usua_UsuarioEliminacion: z.number().nullable(),
  usuarioEliminacion: z.string().nullable(),
  proc_FechaEliminacion: z.string().nullable(),
  proc_Estado: z.boolean(),
})

export type Proceso = z.infer<typeof procesoSchema>
