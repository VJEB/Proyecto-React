import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const ciudadSchema = z.object({
  ciud_Id: z.string(),
  ciud_Nombre: z.string(),
  pvin_Id: z.number(),
  pvin_Nombre: z.string(),
  pvin_Codigo: z.string(),
  pais_Codigo: z.string(),
  pais_Nombre: z.string(),
  pais_Id: z.number(),
  ciud_EsAduana: z.string(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacionNombre: z.string(),
  ciud_FechaCreacion: z.string(), // Date in ISO format
  usua_UsuarioModificacion: z.number(),
  usuarioModificacionNombre: z.string(),
  ciud_FechaModificacion: z.string(), // Date in ISO format
  usua_UsuarioEliminacion: z.number().nullable(),
  usuarioEliminacionNombre: z.string().nullable(),
  ciud_FechaEliminacion: z.string().nullable(), // Date in ISO format
  ciud_Estado: z.boolean(),
})

export const aduanaSchema = z.object({
  id: z.string(),
  aduana: z.string(),
  subRows: z.array(ciudadSchema),
  // status: z.string(),
  // label: z.string(),
  // priority: z.string(),
})

export type Aduana = z.infer<typeof aduanaSchema>
