import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const empleadoSchema = z.object({
  empl_Id: z.number(),
  empl_Nombres: z.string(),
  empl_Apellidos: z.string(),
  empl_DNI: z.string(),
  escv_Id: z.number(),
  escv_Nombre: z.string(),
  empl_NombreCompleto: z.string(),
  empl_Sexo: z.string(),
  empl_FechaNacimiento: z.string(), // Date in ISO format
  empl_Telefono: z.string(),
  empl_DireccionExacta: z.string(),
  pvin_Id: z.number(),
  pvin_Nombre: z.string(),
  pais_Id: z.number(),
  pais_Codigo: z.string(),
  pais_Nombre: z.string(),
  empl_CorreoElectronico: z.string(),
  carg_Id: z.number(),
  carg_Nombre: z.string(),
  empl_EsAduana: z.boolean(),
  usua_UsuarioCreacion: z.number(),
  usuarioCreacionNombre: z.string(),
  empl_FechaCreacion: z.string(), // Date in ISO format
  usua_UsuarioModificacion: z.number(),
  usuarioModificacionNombre: z.string(),
  empl_FechaModificacion: z.string(), // Date in ISO format
  usua_UsuarioEliminacion: z.number().nullable(),
  usuarioEliminacionNombre: z.string().nullable(),
  empl_FechaEliminacion: z.string().nullable(), // Date in ISO format
  empl_Estado: z.boolean(),
  usua_UsuarioActivacion: z.number().nullable(),
  usuarioActivacionNombre: z.string().nullable(),
  empl_FechaActivacion: z.string().nullable(), // Date in ISO format
})

export const cargosSchema = z.object({
  id: z.string(),
  cargo: z.string(),
  subRows: z.array(empleadoSchema),
  // status: z.string(),
  // label: z.string(),
  // priority: z.string(),
})

export type Cargo = z.infer<typeof cargosSchema>
