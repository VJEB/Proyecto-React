import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeProviderContext } from '@/components/theme-provider'
import { useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { cancelarDeva, guardarFactura } from '../data/data'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [dialogState, setDialogState] = useState(false)

  const { toast } = useToast()

  const context = useContext(ThemeProviderContext)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Abrir menú</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => context.setFactId(row.original.fact_Id)}
          >
            <IconEdit stroke={1.5} className='mr-1 h-5 w-5' />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogState(true)}>
            <IconTrash stroke={1.5} className='mr-1 h-5 w-5' />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Eliminar factura</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-1 items-center gap-4'>
              <p>
                ¿Está seguro de querer cancelar la factura número{' '}
                {row.original.fact_Numero}?
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setDialogState(false)} variant='outline'>
              Cancelar
            </Button>
            <Button
              onClick={() =>
                guardarFactura(
                  {
                    ...row.original,
                  },
                  true
                ).then(response=>{
                  if (response === '1') {
                    toast({
                      title: "Éxito",
                      description: 'Factura eliminada correctamente' 
                    })
                    context.setRefrescar(!context.refrescar)
                  }
                }).catch(err=>console.log('Error al eliminar la factura: ' + err)
                )
              }
            >
              Eliminar factura
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
