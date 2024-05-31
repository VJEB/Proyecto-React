import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Reporte } from './data/schema'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { getReporte } from './data/data'
import { useContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { IconPlus, IconArrowBack } from '@tabler/icons-react'
import { Toast } from '@radix-ui/react-toast'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function PagReportes({
    title = 'Reporte Contratos Adeción',
  }: {title?: string}) {
    const { toast } = useToast()
    const [reporte, setReporte] = useState<Reporte>({
        fechaInicio: "",
        fechaFin: "",
        contrato: ""
      })
    
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
         
      <Card>
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
                    setReporte(reporte => {
                    return {
                      ...reporte,
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
                    setReporte(reporte => {
                    return {
                      ...reporte,
                      adua_Nombre: e.target.value,
                    }
                  }
                )
              }
              }
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Direccion Exacta</Label>
              <Input id="name" placeholder="Direccion de la Aduana" className='col-span-3'
              onChange={
                (e)=>{
                    setReporte(reporte => {
                    return {
                      ...reporte,
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
            if((!reporte.fechaInicio)||(!reporte.fechaFin)||(!reporte.contrato)){
              toast({
                title: "Error: ",
                variant: "destructive",
                description: "Error Al ingresar Aduana",
              })
              return;
            }
            getReporte(reporte).then(
                (exito) => {

                }
            )
          }}>Guardar</Button>
        </CardFooter>
        </Card>

          
        </LayoutBody>
    
    </Layout>
  )
}