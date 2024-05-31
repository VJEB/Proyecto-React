import { nullable, z } from 'zod'

const reporteschema = z.object ({
    fechaInicio: z.string(),
    fechaFin: z.string(),
    contrato: z.string()
})

export type Reporte = z.infer<typeof reporteschema>