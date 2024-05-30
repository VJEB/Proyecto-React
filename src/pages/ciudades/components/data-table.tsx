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

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

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
import { eliminarAduana } from '../data/data'

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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

interface Aduana {
  adua_Id: number
  adua_Codigo: string
  adua_Nombre: string
  adua_Direccion_Exacta: string
  pvin_Nombre: string
  pvin_Id: number
  ciud_Id: number
  ciud_Nombre: string
  usua_UsuarioCreacion: number
  adua_FechaCreacion: string
  usua_UsuarioModificacion: number
  adua_FechaModificacion: string
  usua_UsuarioEliminacion: number
  adua_FechaEliminacion: string
  adua_Estado: boolean
  usarioCreacion: string
  usuarioModificacion: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [dialogState, setDialogState] = useState(false)

  const { toast } = useToast()

  const context = useContext(ThemeProviderContext)
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
    console.clear()
  }, [])

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
                      <>
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                        {cell.column.id === 'pais' && (
                          <>
                            <TableCell key={cell.id + 1}></TableCell>
                          </>
                        )}
                      </>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow
                      key={row.id + 1}
                      className='bg-[#11141d] font-bold'
                    >
                      <TableCell key={row.id + 2} className='pl-[2%]'>
                        Id
                      </TableCell>
                      <TableCell key={row.id + 3}>codigo</TableCell>
                      <TableCell key={row.id + 4}>Aduana</TableCell>
                      <TableCell key={row.id + 5} colSpan={3}>
                        Direccion Exacta
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                  {row.getIsExpanded() &&
                    row.original.subRows.map(
                      (aduana: Aduana, index: number) => (
                        <TableRow key={aduana.ciud_Id + index}>
                          <TableCell
                            className='pl-[2%]'
                            key={aduana.adua_Id + index}
                          >
                            {aduana.adua_Id}
                          </TableCell>
                          <TableCell key={aduana.adua_Codigo + index}>
                            {aduana.adua_Codigo}
                          </TableCell>
                          <TableCell key={aduana.adua_Nombre + index}>
                            {aduana.adua_Nombre}
                          </TableCell>
                          <TableCell
                            key={aduana.adua_Direccion_Exacta + index}
                            colSpan={3}
                          >
                            {aduana.adua_Direccion_Exacta}
                          </TableCell>
                          <TableCell>
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
                              <DropdownMenuContent
                                align='end'
                                className='w-[160px]'
                              >
                                <DropdownMenuItem
                                  onClick={() =>
                                    context.setAduId(aduana.adua_Id)
                                  }
                                >
                                  {' '}
                                  <IconEdit
                                    stroke={1.5}
                                    className='mr-1 h-5 w-5'
                                  />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                onClick={() =>
                                  context.setMostrarDetalle(aduana.adua_Id)
                                }
                                >
                                  <IconEye
                                    stroke={1.5}
                                    className='mr-1 h-5 w-5'
                                  />
                                  Ver detalle
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() => setDialogState(true)}
                                >
                                  <IconTrash
                                    stroke={1.5}
                                    className='mr-1 h-5 w-5'
                                  />
                                  Eliminar Aduana
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Dialog
                              open={dialogState}
                              onOpenChange={setDialogState}
                            >
                              <DialogContent className='sm:max-w-[425px]'>
                                <DialogHeader>
                                  <DialogTitle>Eliminar Aduana</DialogTitle>
                                </DialogHeader>
                                <div className='grid gap-4 py-4'>
                                  <div className='grid grid-cols-1 items-center gap-4'>
                                    <p>
                                      ¿Está seguro de querer eliminar la aduana{' '}
                                      <span className='text-teal-200'>
                                        {aduana.adua_Nombre}
                                      </span>
                                      ?
                                    </p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    onClick={() => setDialogState(false)}
                                    variant='outline'
                                  >
                                    Cancelar
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      eliminarAduana(aduana.adua_Id)
                                        .then((exito) => {
                                          if (!exito) {
                                            toast({
                                              title: 'Error: ',
                                              variant: 'destructive',
                                              description:
                                                'Hay registros que dependen de este proceso',
                                            })
                                            return
                                          }
                                          toast({
                                            title: 'Eliminado',
                                            description:
                                              'Proceso eliminado exitosamente!',
                                          })
                                          row.toggleExpanded()
                                          setDialogState(false)
                                          context.setRefrescar(
                                            !context.refrescar
                                          )
                                        })
                                        .catch((err) => {
                                          console.log(
                                            'Error al cargar los procesos: ' +
                                              err
                                          )
                                        })
                                    }}
                                  >
                                    Eliminar
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
