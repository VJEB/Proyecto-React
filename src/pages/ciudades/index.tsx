import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useContext, useEffect, useState } from 'react'
import {
  cargarCiudades,
  guardarAduana,
  paisddl,
  provinciaddl,
  ciudadesddl,
} from './data/data'

import * as React from 'react'

import { Aduanas, Ciudad, Pais, Provincia, Ciudades } from './data/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { useToast } from '@/components/ui/use-toast'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ThemeProviderContext } from '@/components/theme-provider'
import { IconArrowBack, IconPlus } from '@tabler/icons-react'

export default function PagCiudades({
  title = 'Ciudades por Aduanas',
}: {
  title?: string
}) {
  const context = useContext(ThemeProviderContext)
  const [dialogState, setDialogState] = useState(false)
  const [ciudades, setCiudades] = useState<Ciudad[]>()
  const { toast } = useToast()
  const [paises, setPaises] = useState<Pais[]>([])
  const [ciudad, setCiudad] = useState<Ciudades[]>([])
  const [provin, setProvin] = useState<Provincia[]>([])

  const [mostrarForm, setMostrarForm] = React.useState(false)

  const [pais, setPais] = useState<Pais>({
    pais_Id: 0,
    pais_Nombre: '',
  })
  const [ciudade, setCiudade] = useState<Ciudades>({
    ciud_Id: 0,
    ciud_Nombre: '',
  })
  const [provincia, setProvincia] = useState<Provincia>({
    pvin_Id: 0,
    pvin_Nombre: '',
  })
  const [aduanas, setAduanas] = useState<Aduanas[]>([])

  const [aduana, setAduana] = useState<Aduanas>({
    adua_Id: 0,
    adua_Codigo: '',
    adua_Nombre: '',
    adua_Direccion_Exacta: '',
    pvin_Id: '0',
    ciud_Id: '',
    usua_UsuarioCreacion: 1,
    adua_FechaCreacion: '2024-05-30',
    usua_UsuarioModificacion: 1,
    adua_FechaModificacion: '2024-05-30',
    usua_UsuarioEliminacion: 1,
    adua_FechaEliminacion: '2024-05-30',
    usarioCreacion: "",
    usuarioModificacion: ""
  })
  useEffect(() => {
    cargarCiudades()
      .then((data: Ciudad[]) => {
        setCiudades(data)
        const allAduanas = data.reduce<Aduanas[]>((acc, ciudad: Ciudad[]) => {
          const ciudadAduanas = ciudad.subRows.map((ad) => ({
            ...ad,
            pvin_Id: ad.pvin_Id.toString(),
          }))
          return [...acc, ...ciudadAduanas]
        }, [])
        setAduanas(allAduanas)
      })
      .catch((err) => {
        console.log('Error al cargar las ciudades:' + err)
      })

    paisddl()
      .then((data) => {
        setPaises(data)
      })
      .catch((err) => {
        console.log('Error' + err)
      })
  }, [context.refrescar])

  useEffect(() => {
    const aduaEncontrada = aduanas?.find(
      (item) => item.adua_Id === context.aduaId
    )
    if (aduaEncontrada) {
      setAduana(aduaEncontrada)
      setMostrarForm(true)
    }
    if (context.aduaId) {
      setDialogState(true)
    }
  }, [context.aduaId])

  useEffect(() => {
    const aduaEncontrada = aduanas?.find(
      (item) => item.adua_Id === context.mostrarDetalle
    )
    if (aduaEncontrada) {
      setAduana(aduaEncontrada)
    }
  }, [context.mostrarDetalle])

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

      {context.mostrarDetalle !== 0 ? 
      (
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
          {aduana && (
            <div className='mb-2 flex flex-col items-center justify-between space-y-8 rounded border bg-slate-900 p-8'>
              <div className='grid min-w-[100%] grid-cols-3 gap-3'>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Id</div>
                  <div>{aduana.adua_Id}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Aduana</div>
                  <div>{aduana.adua_Nombre}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>
                    Código de la aduana
                  </div>
                  <div>{aduana.adua_Codigo}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Direccion completa</div>
                  <div>{aduana.adua_Direccion_Exacta}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Ciudad</div>
                  <div>{ciudades?.find(ciud=>ciud.id === aduana.ciud_Id)?.ciudad}</div>
                </div>
                <div>
                  <div className='font-medium text-[#94a3b8]'>Provincia</div>
                  <div>{ciudades?.find(ciud=>ciud.id === aduana.ciud_Id)?.provincia}</div>
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
                  {aduana.usarioCreacion ?? ''}
                </div>
                <div className='border-t py-2'>
                  {aduana.adua_FechaCreacion ?? ''}
                </div>
                <div className='border-t py-2 font-medium text-[#94a3b8]'>
                  Modifica
                </div>
                <div className='border-t py-2'>
                  {aduana.usuarioModificacion ?? ''}
                </div>
                <div className='border-t py-2'>
                  {aduana.adua_FechaModificacion ?? ''}
                </div>
              </div>
            </div>
          )}
        </LayoutBody>
      )
      : mostrarForm ? (
        <LayoutBody className='flex flex-col' fixedHeight>
          <Card>
            <CardHeader>
              <CardTitle>
                {aduana.adua_Id ? 'Editar' : 'Crear'} Aduana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className='grid grid-cols-2 gap-4 py-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='name'>Codigo</Label>
                    <Input
                      id='name'
                      placeholder='Codigo de la Aduana'
                      className='col-sm-6 col-span-3 gap-4'
                      defaultValue={aduana.adua_Codigo ?? 0}
                      onChange={(e) => {
                        setAduana((aduana) => {
                          return {
                            ...aduana,
                            adua_Codigo: e.target.value,
                          }
                        })
                      }}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='name'>Nombre</Label>
                    <Input
                      id='name'
                      placeholder='Nombre de la Aduana'
                      className='col-span-3'
                      defaultValue={aduana.adua_Nombre ?? 0}
                      onChange={(e) => {
                        setAduana((aduana) => {
                          return {
                            ...aduana,
                            adua_Nombre: e.target.value,
                          }
                        })
                      }}
                    />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='framework'>Pais</Label>

                    <Select
                      onValueChange={(value) => {
                        const selectedPais = paises.find(
                          (pais) => pais.pais_Id.toString() === value
                        )
                        if (selectedPais) {
                          provinciaddl(selectedPais.pais_Id)
                            .then((data) => {
                              setProvin(data)
                            })
                            .catch((err) => {
                              console.log(
                                'Error al cargar las Provincias:' + err
                              )
                            })
                        }
                      }}
                    >
                      <SelectTrigger id='framework'>
                        <SelectValue placeholder='Seleccione' />
                      </SelectTrigger>
                      <SelectContent position='popper'>
                        {paises.map((pais) => (
                          <SelectItem
                            key={pais.pais_Id}
                            value={pais.pais_Id.toString()}
                          >
                            {pais.pais_Nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='framework'>Provincia</Label>

                    <Select
                      onValueChange={(valor) => {
                        const provinciaSelect = provin.find(
                          (provincia) => provincia.pvin_Id.toString() === valor
                        )
                        if (provinciaSelect) {
                          ciudadesddl(provinciaSelect.pvin_Id)
                            .then((data) => {
                              setCiudad(data)
                            })
                            .catch((err) => {
                              console.log('Error al cargar las ciudades:' + err)
                            })
                        }
                      }}
                    >
                      <SelectTrigger id='framework'>
                        <SelectValue placeholder='Selecione' />
                      </SelectTrigger>
                      <SelectContent position='popper'>
                        {provin.map((provin) => (
                          <SelectItem
                            key={provin.pvin_Id}
                            value={provin.pvin_Id.toString()}
                          >
                            {provin.pvin_Nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='framework'>Ciudad</Label>

                    <Select
                      onValueChange={(e) => {
                        const ciudadSelect = ciudad.find(
                          (ciud) => ciud.ciud_Id.toString() === e
                        )
                        if (ciudadSelect) {
                          setAduana((aduana) => {
                            return {
                              ...aduana,
                              ciud_Id: e,
                            }
                          })
                        }
                      }}
                    >
                      <SelectTrigger id='framework'>
                        <SelectValue placeholder='Selecione' />
                      </SelectTrigger>
                      <SelectContent position='popper'>
                        {ciudad.map((ciud) => (
                          <SelectItem
                            key={ciud.ciud_Id}
                            value={ciud.ciud_Id.toString()}
                          >
                            {ciud.ciud_Nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='name'>Direccion Exacta</Label>
                    <Input
                      id='name'
                      placeholder='Direccion de la Aduana'
                      className='col-span-3'
                      defaultValue={aduana.adua_Direccion_Exacta ?? 0}
                      onChange={(e) => {
                        setAduana((aduana) => {
                          return {
                            ...aduana,
                            adua_Direccion_Exacta: e.target.value,
                          }
                        })
                      }}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className='flex justify-end gap-2'>
              <Button
                variant={'outline'}
                onClick={() => {
                  context.setAduId(0)
                  setMostrarForm(false)
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (
                    aduana.adua_Codigo == '' ||
                    aduana.adua_Nombre == '' ||
                    aduana.adua_Direccion_Exacta == '' ||
                    aduana.ciud_Id == ''
                  ) {
                    toast({
                      title: 'Error: ',
                      variant: 'destructive',
                      description: 'Todos los valores deven estar llenos',
                    })
                    return
                  }

                  guardarAduana(aduana).then((exito) => {
                    if (exito) {
                      toast({
                        title: 'Error: ',
                        variant: 'destructive',
                        description: 'Todos los valores deven estar llenos',
                      })
                    } else {
                      toast({
                        title: 'Guardado',
                        description: 'Se guardo Con Exito',
                      })
                      setMostrarForm(false)
                      context.setAduId(0)
                      context.setRefrescar(!context.refrescar)
                    }
                  })
                }}
              >
                Guardar
              </Button>
            </CardFooter>
          </Card>
        </LayoutBody>
      ) : (
        <LayoutBody>
          <Card>
            <CardHeader className='flex justify-between'>
              <div className='mb-2 flex items-center justify-between space-y-2'>
                <h2 className='text-2xl font-bold tracking-tight'>
                  Listado de ciudades por aduanas
                </h2>
              </div>
              <Button
                onClick={() => {
                  setAduana({
                    adua_Id: 0,
                    adua_Codigo: '',
                    adua_Nombre: '',
                    adua_Direccion_Exacta: '',
                    pvin_Id: '0',
                    ciud_Id: '',
                    usua_UsuarioCreacion: 1,
                    adua_FechaCreacion: '2024-05-30',
                    usua_UsuarioModificacion: 1,
                    adua_FechaModificacion: '2024-05-30',
                    usua_UsuarioEliminacion: 1,
                    adua_FechaEliminacion: '2024-05-30',
                    usarioCreacion: "",
                    usuarioModificacion: ""
                  })
                  setMostrarForm(true)
                }}
                className='max-w-[100px]'
              >
                <IconPlus stroke={1.5} className='mr-1 h-5 w-5' />
                Nuevo
              </Button>
            </CardHeader>
            <CardContent>
              {ciudades && (
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                  <DataTable data={ciudades} columns={columns} />
                </div>
              )}
            </CardContent>
          </Card>
        </LayoutBody>
      )}
    </Layout>
  )
}
