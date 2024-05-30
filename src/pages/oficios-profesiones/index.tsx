import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useContext, useEffect, useState } from 'react'
import { getOficios_Profesiones, guardarOficios_Profesiones } from './data/data'
import { Button } from '@/components/custom/button'
import { IconArrowBack, IconPlus } from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Oficio_Profesion } from './data/schema'
import { useToast } from '@/components/ui/use-toast'
import { ThemeProviderContext } from '@/components/theme-provider'

export default function PagOficiosProfesiones({
  title = 'Oficios & Profesiones',
}: {
  title?: string
}) {
  const context = useContext(ThemeProviderContext)

  const [oficios_profesiones, setOficios_profesiones] =
    useState<Oficio_Profesion[]>()
  const [dialogState, setDialogState] = useState(false)
  const { toast } = useToast()
  const [oficioProfesion, setOficioProfesion] = useState<Oficio_Profesion>({
    ofpr_Id: 0,
    ofpr_Nombre: '',
    usua_UsuarioCreacion: 1,
    ofpr_FechaCreacion: new Date().toISOString(),
    usua_UsuarioModificacion: 1,
    ofpr_FechaModificacion: new Date().toISOString(),
    ofpr_Estado: true,
    usuarioCreacionNombre: '',
    usuarioModificacionNombre: '',
  })
  useEffect(() => {
    context.setMostrarDetalle(0)

    getOficios_Profesiones()
      .then((data) => {
        setOficios_profesiones(data)
      })
      .catch((err) => {
        console.log('Error al cargar los oficios & profesiones:' + err)
      })
  }, [context.refrescar])

  useEffect(() => {
    const ofiProEncontrado = oficios_profesiones?.find(
      (item) => item.ofpr_Id === context.ofiProId
    )

    if (ofiProEncontrado) {
      setOficioProfesion(ofiProEncontrado)
    }
    if (context.ofiProId) {
      setDialogState(true)
    }
  }, [context.ofiProId])

  useEffect(() => {
    const ofiProEncontrado = oficios_profesiones?.find(
      (item) => item.ofpr_Id === context.mostrarDetalle
    )

    if (ofiProEncontrado) {
      setOficioProfesion(ofiProEncontrado)
    }
  }, [context.mostrarDetalle])

  const toggleDialogState = () => {
    if (dialogState) {
      context.setOfiProId(0)
    }
    setDialogState((diaState) => !diaState)
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        {/* <Search /> */}
        <h1 className='text-4xl'>{title}</h1>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      {context.mostrarDetalle !== 0 ? (
        <LayoutBody className='flex flex-col' fixedHeight>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h2 className='text-2xl font-bold tracking-tight'>Detalle</h2>
            <Button
              variant={'outline'}
              onClick={() => context.setMostrarDetalle(0)}
            >
              <IconArrowBack stroke={1.5} className='mr-1 h-5 w-5' />
              Regresar
            </Button>
          </div>
          {oficioProfesion && (
            <div className='mb-2 flex flex-col items-center justify-between space-y-8 rounded border bg-slate-900 p-8'>
              <div className='grid min-w-[100%] grid-cols-3 gap-3'>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Id</div>
                  <div>{oficioProfesion.ofpr_Id}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>
                    Oficio o profesión
                  </div>
                  <div>{oficioProfesion.ofpr_Nombre}</div>
                </div>
              </div>

              <div className='grid min-w-[100%] grid-cols-3 rounded bg-slate-950 p-4'>
                <div></div>
                <div className='font-medium text-[#94a3b8]'>Usuario</div>
                <div className='font-medium text-[#94a3b8]'>Fecha</div>

                <div className='border-t py-2 font-medium text-[#94a3b8]'>
                  Creacion
                </div>
                <div className='border-t py-2'>
                  {oficioProfesion.usuarioCreacionNombre ?? ''}
                </div>
                <div className='border-t py-2'>
                  {oficioProfesion.ofpr_FechaCreacion ?? ''}
                </div>
                <div className='border-t py-2 font-medium text-[#94a3b8]'>
                  Modifica
                </div>
                <div className='border-t py-2'>
                  {oficioProfesion.usuarioModificacionNombre ?? ''}
                </div>
                <div className='border-t py-2'>
                  {oficioProfesion.ofpr_FechaModificacion ?? ''}
                </div>
              </div>
            </div>
          )}
        </LayoutBody>
      ) : (
        <LayoutBody className='flex flex-col' fixedHeight>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Listado de {title.toLowerCase()}
              </h2>
            </div>
          </div>
          {oficios_profesiones && (
            <>
              <div className='mb-2 flex items-center justify-between space-y-2'>
                <div>
                  <Dialog open={dialogState} onOpenChange={toggleDialogState}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() =>
                          setOficioProfesion({
                            ofpr_Id: 0,
                            ofpr_Nombre: '',
                            usua_UsuarioCreacion: 1,
                            ofpr_FechaCreacion: new Date().toISOString(),
                            usua_UsuarioModificacion: 1,
                            ofpr_FechaModificacion: new Date().toISOString(),
                            ofpr_Estado: true,
                            usuarioCreacionNombre: '',
                            usuarioModificacionNombre: '',
                          })
                        }
                      >
                        <IconPlus stroke={1.5} className='mr-1 h-5 w-5' /> Nuevo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>
                          {oficioProfesion.ofpr_Id ? 'Editar' : 'Nuevo'} oficio
                          o profesion
                        </DialogTitle>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-3 items-center gap-4'>
                          <Label htmlFor='name' className='text-right'>
                            Oficio o profesión
                          </Label>
                          <Input
                            id='name'
                            defaultValue={
                              oficioProfesion.ofpr_Nombre ??
                              'Ingeniero en Sistemas de la Computación'
                            }
                            className='col-span-3'
                            onChange={(e) => {
                              setOficioProfesion((ofiPro) => {
                                return {
                                  ...ofiPro,
                                  ofpr_Nombre: e.target.value,
                                }
                              })
                            }}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => toggleDialogState()}
                          variant='outline'
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={() => {
                            if (!oficioProfesion.ofpr_Nombre) {
                              toast({
                                title: 'Error: ',
                                variant: 'destructive',
                                description:
                                  'Por favor ingrese el nombre del oficio o profesión',
                              })
                              return
                            }
                            guardarOficios_Profesiones(oficioProfesion)
                              .then((exito) => {
                                if (!exito) {
                                  toast({
                                    title: 'Error: ',
                                    variant: 'destructive',
                                    description:
                                      'Ya existe un oficio o profesión con ese nombre',
                                  })
                                  return
                                }
                                toast({
                                  title: 'Guardado',
                                  description:
                                    'Oficio o profesión guardado exitosamente!',
                                })
                                toggleDialogState()
                                getOficios_Profesiones()
                                  .then((data) => {
                                    setOficios_profesiones(data)
                                  })
                                  .catch((err) => {
                                    console.log(
                                      'Error al cargar los oficios & profesiones:' +
                                        err
                                    )
                                  })
                              })
                              .catch((err) => {
                                console.log(
                                  'Error al cargar los oficios & profesiones:' +
                                    err
                                )
                              })
                          }}
                        >
                          Guardar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <DataTable data={oficios_profesiones} columns={columns} />
              </div>
            </>
          )}
        </LayoutBody>
      )}
    </Layout>
  )
}
