import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useContext, useEffect, useState } from 'react'
import { getProcesos, guardarProceso } from './data/data'
import { Button } from '@/components/custom/button'
import { IconPlus, IconArrowBack } from '@tabler/icons-react'
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
import { Proceso } from './data/schema'
import { useToast } from '@/components/ui/use-toast'
import { ThemeProviderContext } from '@/components/theme-provider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function PagProcesos({
  title = 'Procesos',
}: {
  title?: string
}) {
  const context = useContext(ThemeProviderContext)
  const [procesos, setProcesos] = useState<Proceso[]>()
  const [dialogState, setDialogState] = useState(false)
  const { toast } = useToast()
  const [proceso, setProceso] = useState<Proceso>({
    proc_Id: 0,
    proc_Descripcion: '',
    proc_CodigoHtml: '',
    modu_Id: 0,
    modu_Nombre: '',
    usua_UsuarioCreacion: 1,
    usuarioCreacion: '',
    proc_FechaCreacion: new Date().toISOString(),
    usua_UsuarioModificacion: 1,
    usuarioModificacion: '',
    proc_FechaModificacion: new Date().toISOString(),
    usua_UsuarioEliminacion: 1,
    usuarioEliminacion: '',
    proc_FechaEliminacion: new Date().toISOString(),
    proc_Estado: true,
  })
  useEffect(() => {
    context.setMostrarDetalle(0)
    getProcesos()
      .then((data) => {
        setProcesos(data)
      })
      .catch((err) => {
        console.log('Error al cargar los oficios & profesiones:' + err)
      })
  }, [context.refrescar])

  useEffect(() => {
    const procEncontrado = procesos?.find(
      (item) => item.proc_Id === context.procId
    )

    if (procEncontrado) {
      setProceso(procEncontrado)
    }
    if (context.procId) {
      setDialogState(true)
    }
  }, [context.procId])

  useEffect(() => {
    const procEncontrado = procesos?.find(
      (item) => item.proc_Id === context.mostrarDetalle
    )

    if (procEncontrado) {
      setProceso(procEncontrado)
    }
  }, [context.mostrarDetalle])

  const toggleDialogState = () => {
    if (dialogState) {
      context.setProcId(0)
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
          {proceso && (
            <div className='mb-2 flex flex-col items-center justify-between space-y-8 rounded border bg-slate-900 p-8'>
              <div className='grid min-w-[100%] grid-cols-3 gap-3'>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Id</div>
                  <div>{proceso.proc_Id}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Proceso</div>
                  <div>{proceso.proc_Descripcion}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>
                    Código del color
                  </div>
                  <div>{proceso.proc_CodigoHtml}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Color</div>
                  <div
                    style={{ backgroundColor: proceso.proc_CodigoHtml }}
                    className={`h-[20px] w-[70px]`}
                  ></div>
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
                  {proceso.usuarioCreacion ?? ''}
                </div>
                <div className='border-t py-2'>
                  {proceso.proc_FechaCreacion ?? ''}
                </div>
                <div className='border-t py-2 font-medium text-[#94a3b8]'>
                  Modifica
                </div>
                <div className='border-t py-2'>
                  {proceso.usuarioModificacion ?? ''}
                </div>
                <div className='border-t py-2'>
                  {proceso.proc_FechaModificacion ?? ''}
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
          {procesos && (
            <>
              <div className='mb-2 flex items-center justify-between space-y-2'>
                <Dialog open={dialogState} onOpenChange={toggleDialogState}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() =>
                        setProceso({
                          proc_Id: 0,
                          proc_Descripcion: '',
                          proc_CodigoHtml: '#000000',
                          modu_Id: 0,
                          modu_Nombre: '',
                          usua_UsuarioCreacion: 1,
                          usuarioCreacion: '',
                          proc_FechaCreacion: new Date().toISOString(),
                          usua_UsuarioModificacion: 1,
                          usuarioModificacion: '',
                          proc_FechaModificacion: new Date().toISOString(),
                          usua_UsuarioEliminacion: 1,
                          usuarioEliminacion: '',
                          proc_FechaEliminacion: new Date().toISOString(),
                          proc_Estado: true,
                        })
                      }
                    >
                      <IconPlus stroke={1.5} className='mr-1 h-5 w-5' /> Nuevo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>
                        {proceso.proc_Id ? 'Editar' : 'Nuevo'} proceso
                      </DialogTitle>
                    </DialogHeader>
                    <div className='grid grid-cols-2 gap-4 py-4'>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='name' className='text-left'>
                          Proceso
                        </Label>
                        <Input
                          id='name'
                          defaultValue={proceso.proc_Descripcion ?? 'Corte'}
                          className='col-span-3'
                          onChange={(e) => {
                            setProceso((proc) => {
                              return {
                                ...proc,
                                proc_Descripcion: e.target.value,
                              }
                            })
                          }}
                        />
                      </div>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='name' className='text-left'>
                          Color
                        </Label>
                        <Input
                          id='name'
                          type='color'
                          defaultValue={proceso.proc_CodigoHtml ?? '#fff'}
                          className='col-span-4 cursor-pointer'
                          onChange={(e) => {
                            setProceso((proc) => {
                              return {
                                ...proc,
                                proc_CodigoHtml: e.target.value,
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
                          if (!proceso.proc_Descripcion) {
                            toast({
                              title: 'Error: ',
                              variant: 'destructive',
                              description:
                                'Por favor ingrese el nombre del proceso',
                            })
                            return
                          }
                          guardarProceso(proceso)
                            .then((exito) => {
                              if (!exito) {
                                toast({
                                  title: 'Error: ',
                                  variant: 'destructive',
                                  description:
                                    'Ya existe un proceso con ese nombre',
                                })
                                return
                              }
                              toast({
                                title: 'Guardado',
                                description: 'Proceso guardado exitosamente!',
                              })
                              toggleDialogState()
                              getProcesos()
                                .then((data) => {
                                  setProcesos(data)
                                })
                                .catch((err) => {
                                  console.log(
                                    'Error al cargar los procesos: ' + err
                                  )
                                })
                            })
                            .catch((err) => {
                              console.log(
                                'Error al cargar los procesos: ' + err
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
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <DataTable data={procesos} columns={columns} />
              </div>
            </>
          )}
        </LayoutBody>
      )}
    </Layout>
  )
}
