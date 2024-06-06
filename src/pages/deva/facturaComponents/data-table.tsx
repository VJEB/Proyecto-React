import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import { Item } from '../data/schema'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ThemeProviderContext } from '@/components/theme-provider'
import { useContext, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { guardarItem } from '../data/data'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// interface Aldea {
//   alde_Id: string
//   ciud_Id: string
//   alde_Nombre: string
//   pvin_Nombre: string
// }

export function FactDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
    },
    enableRowSelection: true,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  React.useEffect(() => {
    // console.clear()
  }, [])

  const [dialogState, setDialogState] = useState(false)

  const { toast } = useToast()

  const context = useContext(ThemeProviderContext)

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell >
                    </TableCell>
                    <TableCell >
                    </TableCell>
                </TableRow>
                {row.getIsExpanded() && (
                    <TableRow
                      key={row.id + 1}
                      className='bg-[#11141d] font-bold'
                    >
                      <TableCell key={row.id + 2} className='pl-[2%]'>
                        Id
                      </TableCell>
                      <TableCell key={row.id + 3}>Item</TableCell>
                      <TableCell key={row.id + 4}>Cantidad</TableCell>
                      <TableCell key={row.id + 5}>Valor unitario</TableCell>
                      <TableCell key={row.id + 6}>Total</TableCell>
                      <TableCell key={row.id + 7}>Acciones</TableCell>
                    </TableRow>
                  )}
                  {row.getIsExpanded() &&
                    row.original.subRows.map(
                      (item: Item, index: number) => (
                        <TableRow key={item.item_Id + index}>
                          <TableCell
                            className='pl-[2%]'
                            key={item.item_Id + index}
                          >
                            {item.item_Id}
                          </TableCell>
                          <TableCell key={item.item_IdentificacionComercialMercancias + index}>
                            {item.item_IdentificacionComercialMercancias}
                          </TableCell>
                          <TableCell key={item.item_Cantidad + index}>
                            {item.item_Cantidad}
                          </TableCell>
                          <TableCell key={item.item_ValorUnitario + index}>
                            {item.item_ValorUnitario}
                          </TableCell>
                          <TableCell key={item.item_ValorTransaccion + index}>
                            {item.item_ValorTransaccion}
                          </TableCell>
                          <TableCell>
                          <Button
                              onClick={() => {
                                setDialogState(true)
                              }}
                            >
                              <TrashIcon className='h-4 w-4' /> Eliminar
                            </Button>
                          <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Eliminar factura</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-1 items-center gap-4'>
              <p>
                ¿Está seguro de querer eliminar el item{' '}
                {item.item_IdentificacionComercialMercancias}?
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setDialogState(false)} variant='outline'>
              Cancelar
            </Button>
            <Button
              onClick={() =>
                guardarItem(
                  {
                    ...item,
                  },
                  true
                ).then(response=>{
                  if (response === '1') {
                    toast({
                      title: "Éxito",
                      description: 'Item eliminado correctamente' 
                    })
                    context.setRefrescar(!context.refrescar)
                  }
                }).catch(err=>console.log('Error al eliminar el item: ' + err)
                )
              }
            >
              Eliminar item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
                            
                          </TableCell>
                        </TableRow>
                      )
                    )}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No hay datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
