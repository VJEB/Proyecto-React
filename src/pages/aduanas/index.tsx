import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import { cargarAduanas, guardarAduana } from './data/data'
import { Aduanas } from './data/schema'
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
import { Toast } from '@radix-ui/react-toast'

export default function PagAduanas({ title = 'Aduanas' }: { title?: string }) {
  const [aduanas, setAduanas] = useState()
  const { toast } = useToast()
  const [aduana, setAduana] = useState<Aduanas>({
    adua_Id: 0,
    adua_Codigo: "0",
    adua_Nombre: "0",
    adua_Direccion_Exacta: "ahi meror simon",
    pvin_Nombre: "0",
    pvin_Id: "83",
    ciud_Id: "301",
    ciud_Nombre: "0",
    usua_UsuarioCreacion: 1,
    adua_FechaCreacion: "2024-05-29",
    usua_UsuarioModificacion: 1,
    adua_FechaModificacion: "2024-05-29",
    usua_UsuarioEliminacion: 0,
    adua_FechaEliminacion: "2024-05-29",
    adua_Estado: true,
    usarioCreacion: "0",
    usuarioModificacion: "0"
  })
  useEffect(() => {
    cargarAduanas()
      .then((data) => {
        console.log(data);
        setAduanas(data)
      })
      .catch((err) => {
        console.log('Error al cargar las aduanas: ' + err)
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

      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Crear Aduana</CardTitle>
      </CardHeader>
      <CardContent>
      <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
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
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
          <Button onClick={() =>{
            if((!aduana.adua_Codigo)||(!aduana.adua_Nombre)){
              toast({
                title: "Error: ",
                variant: "destructive",
                description: "Error Al ingresar Aduana",
              })
              return;
            }
            guardarAduana(aduana)
            .then((exito) => {
              if(!exito){
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
                duration: 50,
              })
              cargarAduanas()
              .then((data) => {
                console.log(data);
                setAduanas(data)
              })
              .catch((err) => {
                console.log('Error al cargar las aduanas: ' + err)
              })


            })
          }}>Guardar</Button>
        </CardFooter>
        </Card>

        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Listado de {title.toLowerCase()}
            </h2>
          </div>
        </div>
        {aduanas && (
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={aduanas} columns={columns} />
          </div>
        )}
      </LayoutBody>
    </Layout>
  )
}
