import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const aldeaSchema = z.object({
  alde_Id: z.string(),
  alde_Nombres: z.string(),
  ciud_Id: z.string(),
  ciud_Nombre: z.string(),
  pvin_Id: z.number(),
  pvin_Codigo: z.string(),
  pvin_Nombre: z.string(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacionNombre: z.string(),
  alde_FechaCreacion: z.string(), // Date in ISO format
  usua_UsuarioModificacion: z.number(),
  usuarioModificacionNombre: z.string(),
  alde_FechaModificacion: z.string(), // Date in ISO format
  usua_UsuarioEliminacion: z.number().nullable(),
  alde_FechaEliminacion: z.string().nullable(), // Date in ISO format
  alde_Estado: z.boolean(),
})

export const ciudadSchema = z.object({
  id: z.string(),
  ciudad: z.string(),
  subRows: z.array(aldeaSchema),
  // status: z.string(),
  // label: z.string(),
  // priority: z.string(),
})

export type Ciudad = z.infer<typeof ciudadSchema>
