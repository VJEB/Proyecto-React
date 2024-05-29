import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useContext, useEffect, useState } from 'react'
import { getOficios_Profesiones, guardarOficios_Profesiones } from './data/data'
import { Button } from '@/components/custom/button'
import { IconPlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Oficio_Profesion } from './data/schema'
import { useToast } from '@/components/ui/use-toast'
import { ThemeProviderContext } from '@/components/theme-provider'

export default function PagOficiosProfesiones({ title = 'Oficios & Profesiones' }: { title?: string }) {

  const context = useContext(ThemeProviderContext);

  const [oficios_profesiones, setOficios_profesiones] = useState<Oficio_Profesion[]>()
  const [dialogState, setDialogState] = useState(false);
  const { toast } = useToast()
  const [oficioProfesion, setOficioProfesion] = useState<Oficio_Profesion>({
    ofpr_Id: 0,
    ofpr_Nombre: "",
    usua_UsuarioCreacion: 1,
    ofpr_FechaCreacion: new Date().toISOString(),
    usua_UsuarioModificacion: 1,
    ofpr_FechaModificacion: new Date().toISOString(),
    ofpr_Estado: true,
    usuarioCreacionNombre: "",
    usuarioModificacionNombre: ""
  })
  useEffect(() => {
    getOficios_Profesiones()
      .then((data) => {
        setOficios_profesiones(data)
      })
      .catch((err) => {
        console.log('Error al cargar los oficios & profesiones:' + err)
      })
  }, [])

  useEffect(() => {
    setOficioProfesion(ofiPro => {
      return {
        ...ofiPro,
        ofpr_Id: context.ofiProId,
        ofpr_Nombre: oficios_profesiones?.find(item => item.ofpr_Id === context.ofiProId)?.ofpr_Nombre ?? ""
      }
    }
    )
    if (context.ofiProId) {
      setDialogState(true)
    }
  }, [context.ofiProId])

  const toggleDialogState = () => {
    if (dialogState) {
      context.setOfiProId(0)
    }
    setDialogState(diaState => !diaState)
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

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Listado de {title.toLowerCase()}
            </h2>
          </div>
        </div>
        {oficios_profesiones && (<>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <div>
              <Dialog open={dialogState} onOpenChange={toggleDialogState}>
                <DialogTrigger asChild>
                  <Button>
                    <IconPlus stroke={1.5} className='h-5 w-5 mr-1' /> Nuevo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{oficioProfesion.ofpr_Nombre ? 'Editar' : 'Nuevo'} oficio o profesion</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Oficio o profesión
                      </Label>
                      <Input
                        id="name"
                        defaultValue={oficioProfesion.ofpr_Nombre ?? "Ingeniero en Sistemas de la Computación"}
                        className="col-span-3"
                        onChange={(e) => {
                          setOficioProfesion(ofiPro => {
                            return {
                              ...ofiPro,
                              ofpr_Nombre: e.target.value,
                            }
                          }
                          )
                        }
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => toggleDialogState()} variant='outline'>Cancelar</Button>
                    <Button onClick={() => {
                      if (!oficioProfesion.ofpr_Nombre) {
                        toast({
                          title: "Error: ",
                          variant: "destructive",
                          description: "Por favor ingrese el nombre del oficio o profesión",
                        })
                        return;
                      }
                      guardarOficios_Profesiones(oficioProfesion)
                        .then((exito) => {
                          if (!exito) {
                            toast({
                              title: "Error: ",
                              variant: "destructive",
                              description: "Ya existe un oficio o profesión con ese nombre",
                            })
                            return;
                          }
                          toast({
                            title: "Guardado",
                            description: "Oficio o profesión guardado exitosamente!",
                          })
                          toggleDialogState();
                          getOficios_Profesiones()
                            .then((data) => {
                              setOficios_profesiones(data)
                            })
                            .catch((err) => {
                              console.log('Error al cargar los oficios & profesiones:' + err)
                            })
                        })
                        .catch((err) => {
                          console.log('Error al cargar los oficios & profesiones:' + err)
                        })
                    }}>Guardar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={oficios_profesiones} columns={columns} />
          </div></>
        )}
      </LayoutBody>
    </Layout>
  )
}
