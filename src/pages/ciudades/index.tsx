import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import { cargarCiudades, guardarAduana, paisddl, provinciaddl, ciudadesddl } from './data/data'

import { Aduanas, Ciudad, Pais, Provincia, Ciudades } from './data/schema'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/custom/button'
import { useToast } from "@/components/ui/use-toast"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PagCiudades({ title = 'Ciudades' }: { title?: string }) {
  const [ciudades, setCiudades] = useState()
  const { toast } = useToast()
  const [paises, setPaises] = useState<Pais[]>([])
  const [ciudad, setCiudad] = useState<Ciudades[]>([])
  const [provin, setProvin] = useState<Provincia[]>([])
  
  const [pais, setPais] = useState<Pais>({
    pais_Id : 0,
    pais_Nombre : "",
  })
  const [ciudade, setCiudade] = useState<Ciudades>({
    ciud_Id: 0,
    ciud_Nombre: ""
  })
  const [provincia, setProvincia] = useState<Provincia>({
    pvin_Id : 0,
    pvin_Nombre : ""
  })

  const [aduana, setAduana] = useState<Aduanas>({
    adua_Id: 0,
    adua_Codigo: "",
    adua_Nombre: "",
    adua_Direccion_Exacta: "",
    pvin_Id: "0",
    ciud_Id: "",
    usua_UsuarioCreacion: 1,
    adua_FechaCreacion: "2024-05-30",
    usua_UsuarioModificacion: 1,
    adua_FechaModificacion: "2024-05-30",
    usua_UsuarioEliminacion: 1,
    adua_FechaEliminacion: "2024-05-30",
  })
  useEffect(() => {
    cargarCiudades()
      .then((data) => {
        setCiudades(data)
      })
      .catch((err) => {
        console.log('Error al cargar las ciudades:' + err)
      })

    paisddl()
      .then((data) =>{
        setPaises(data)
        console.log(data)
      })
      .catch((err) =>{
        console.log('Error'+err)
      })

  }, [])

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
              Listado de ciudades de aduanas
            </h2>
          </div>
        </div>


      <Card>
      <CardHeader>
        <CardTitle>Crear Aduana</CardTitle>
      </CardHeader>
      <CardContent>
      <form>
          <div className="grid w-full items-center gap-4">
            <div className="col col-md-6  space-y-1.5">
              <Label htmlFor="name">Codigo</Label>
              <Input id="name" placeholder="Codigo de la Aduana" className='col-span-3'
              onChange={
                (e)=>{
                  setAduana(aduana => {
                    return {
                      ...aduana,
                      adua_Codigo: e.target.value,
                    }
                  }
                )
              }
              }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Nombre de la Aduana" className='col-span-3'
              onChange={
                (e)=>{
                  setAduana(aduana => {
                    return {
                      ...aduana,
                      adua_Nombre: e.target.value,
                    }
                  }
                )
              }
              }
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Pais</Label>
              
              <Select onValueChange={(value) => {
                const selectedPais = paises.find(pais => pais.pais_Id.toString() === value);
                if (selectedPais) {
                  console.log(`Selected: ${selectedPais.pais_Nombre} with ID: ${selectedPais.pais_Id}`);
                  provinciaddl(selectedPais.pais_Id)
                    .then((data) => {
                      setProvin(data);
                      console.log(selectedPais.pais_Id);
                    })
                    .catch((err) => {
                      console.log('Error al cargar las Provincias:' + err);
                    });
                }
              }}>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent position="popper">
                {paises.map(pais => (
                  <SelectItem key={pais.pais_Id} value={pais.pais_Id.toString()}>
                    {pais.pais_Nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Provincia</Label>
              
              <Select onValueChange={(valor) => {
                const provinciaSelect = provin.find(provincia => provincia.pvin_Id.toString() === valor);
                if (provinciaSelect){
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
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent position="popper">{provin.map(provin => (
                  <SelectItem key={provin.pvin_Id}
                   value={provin.pvin_Id.toString()}>{provin.pvin_Nombre}
                   </SelectItem>
                ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Ciudad</Label>
              
              <Select
              onValueChange={(e) => {
                const ciudadSelect = ciudad.find(ciud => ciud.ciud_Id.toString() === e);
                if (ciudadSelect){
                  setAduana(aduana => {
                    return {
                      ...aduana,
                      ciud_Id: e,
                    }
                  })
                }
              }}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent position="popper">{ciudad.map(ciud => (
                  <SelectItem key={ciud.ciud_Id}
                   value={ciud.ciud_Id.toString()}>{ciud.ciud_Nombre}
                   </SelectItem>
                ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Direccion Exacta</Label>
              <Input id="name" placeholder="Direccion de la Aduana" className='col-span-3'
              onChange={
                (e)=>{
                  setAduana(aduana => {
                    return {
                      ...aduana,
                      adua_Direccion_Exacta: e.target.value,
                    }
                  }
                )
              }
              }
              />
            </div>
          </div>
        </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
          <Button onClick={() =>{
            if((aduana.adua_Codigo == "")||(aduana.adua_Nombre == "")||(aduana.adua_Direccion_Exacta == "")||(aduana.ciud_Id == "")){
              toast({
                title: "Error: ",
                variant: "destructive",
                description: "Todos los valores deven estar llenos",
              })
              return;
            }
            guardarAduana(aduana)
            .then((exito) => {
              if(!exito){
              console.log(exito)

                toast({
                  title: "Error: ",
                  variant: "destructive",
                  description: "Error Al ingresar Aduana",
                })
                return;
              }
              toast({
                title: "Guardado",
                description: "Se guardo Con Exito",
              })
              cargarCiudades()
              .then((data) => {
                setCiudades(data)
              })
              .catch((err) => {
                console.log('Error al cargar las ciudades:' + err)
              })


            })
          }}>Guardar</Button>
        </CardFooter>
        </Card>

        {ciudades && (
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={ciudades} columns={columns} />
          </div>
        )}
      </LayoutBody>
    </Layout>
  )
}
