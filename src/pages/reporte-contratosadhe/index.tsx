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
import PDFGenerator from './components/pdf'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from "@/components/ui/calendar"
  
import { cn } from "@/lib/utils"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
export default function PagReportes({
    title = 'Reporte Contratos Adeción',
  }: {title?: string}) {
    const { toast } = useToast()
    const [reporte, setReporte] = useState<Reporte>({
        fechaInicio: "",
        fechaFin: "",
        contrato: ""
      })
    
      const [resultado, setResultado] = useState<any>(null); 


    const clickea = async () =>{
      if((!reporte.fechaInicio)){
        toast({
          title: "Error: ",
          variant: "destructive",
          description: "La fecha inicio debe estar llena",
        })
        return;
      }
      if((!reporte.fechaFin)){
        toast({
          title: "Error: ",
          variant: "destructive",
          description: "La fecha fin debe estar llena",
        })
        return;
      }
      if((!reporte.contrato)){
        toast({
          title: "Error: ",
          variant: "destructive",
          description: "El contrato debe estar seleccionado",
        })
        return;
      }
      var aja = await getReporte(reporte);

      setResultado(aja);

      console.log("que pedo?:",JSON.stringify(aja, null, 2));
     
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
         
      <Card>
      <CardHeader>
        <CardTitle>Mostrar reporte</CardTitle>
      </CardHeader>
      <CardContent>
      <form>
      <div className='grid grid-cols-2 gap-4 py-4'>
                  <div className='flex flex-col space-y-1.5'>
              <Label htmlFor="name">fecha inicio</Label>
              <Input type='calendary' id="name" placeholder="fecha inicio" className='col-span-3'
              onChange={
                (e)=>{
                    setReporte(reporte => {
                    return {
                      ...reporte,
                      fechaInicio: e.target.value,
                    }
                  }
                )
              }
              }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">fecha fin</Label>
              <Input id="name" placeholder="fecha fin" className='col-span-3'
              onChange={
                (e)=>{
                    setReporte(reporte => {
                    return {
                      ...reporte,
                      fechaFin: e.target.value,
                    }
                  }
                )
              }
              }
              />

            </div>
             
            <div className='flex flex-col gap-1'>
                <Label>Fecha de fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[200px] justify-start text-left font-normal',
                        !reporte.fechaFin &&
                          'text-muted-foreground'
                      )}
                      data-selected={
                        reporte.fechaFin
                          ? true
                          : false
                      }
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={
                        reporte.fechaFin
                          ? new Date(
                              reporte.fechaFin
                            )
                          : undefined
                      }
                      onSelect={(e) =>
                        setReporte((reporte) => {
                          return {
                            ...reporte,
                            fechaFin : e
                            
                          }
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div> 

    <div className='grid grid-cols-1 gap-4 py-4'>
              <div className="">
              <label>Tipo de Contrato</label>
                <RadioGroup
                  onValueChange={(value)=>{
                    setReporte(reporte => {
                    return {
                      ...reporte,
                      contrato: value
                    }
                  }
                )
              }
              }
                  className='col-span-3'  
                >
                    <label>
                      <RadioGroupItem value="PJ" />
                      _Persona Juridica
                    </label>
                    <Label>
                      <RadioGroupItem value="PN" />
                      _Persona Natural
                    </Label>
                    <Label >
                    <RadioGroupItem value="CI" />
                      _Comerciante Individual
                      </Label>
                </RadioGroup>
              </div>
            </div>
            
          </div>
        </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={clickea}>Generar PDF</Button>
        </CardFooter>
        </Card>
          <Card>
          <CardContent>
              
          {resultado && <PDFGenerator data={resultado} />}
            </CardContent>
          </Card>
          
        </LayoutBody>
    
    </Layout>
  )
}