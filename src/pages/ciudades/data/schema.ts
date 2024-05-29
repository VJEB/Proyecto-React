import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const aduanaSchema = z.object({
  adua_Id: z.number(),
  adua_Codigo: z.string(),
  adua_Nombre: z.string(),
  adua_Direccion_Exacta: z.string(),
  pvin_Nombre: z.string(),
  pvin_Id: z.number(),
  ciud_Id: z.number(),
  ciud_Nombre: z.string(),
  usua_UsuarioCreacion: z.number(),
  adua_FechaCreacion: z.string(),
  usua_UsuarioModificacion: z.number(),
  adua_FechaModificacion: z.string(),
  usua_UsuarioEliminacion: z.number(),
  adua_FechaEliminacion: z.string(),
  adua_Estado: z.boolean(),
  usarioCreacion: z.string(),
  usuarioModificacion: z.string()
})

export const ciudadSchema = z.object({
  id: z.string(),
  ciudad: z.string(),
  subRows: z.array(aduanaSchema),
  // status: z.string(),
  // label: z.string(),
  // priority: z.string(),
})

export type Ciudad = z.infer<typeof ciudadSchema>
