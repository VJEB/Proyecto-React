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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

interface Ciudad {
  ciud_Id: string 
  ciud_Nombre: string
  pvin_Id: string
  pvin_Nombre: string
  pvin_Codigo: string
  pais_Codigo: string
  pais_Nombre: string
  pais_Id: string
  ciud_EsAduana: boolean
  usua_UsuarioCreacion: number
  usua_UsuarioModificacion: number
  usuarioCreacionNombre: string
  ciud_FechaCreacion: string
  usuarioModificacionNombre: string
  ciud_FechaModificacion: string
  usua_UsuarioEliminacion: string
  ciud_FechaEliminacion: string
  ciud_Estado: boolean
}

export function DataTable<TData, TValue>({
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
                        {cell.column.id === 'aduana' && (
                          <>
                            <TableCell key={cell.id + 1}></TableCell>
                            <TableCell key={cell.id + 2}></TableCell>
                            <TableCell key={cell.id + 3}></TableCell>
                            <TableCell key={cell.id + 4}></TableCell>
                            <TableCell key={cell.id + 5}></TableCell>
                            <TableCell key={cell.id + 6}></TableCell>
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
                      <TableCell key={row.id + 2} ></TableCell>
                      <TableCell key={row.id + 3} className='pl-[2%]' >Codigo</TableCell>
                      <TableCell key={row.id + 4} className='pl-[2%]'>Ciudad</TableCell>
                      <TableCell key={row.id + 5}></TableCell>
                      <TableCell key={row.id + 6}></TableCell>
                    </TableRow>
                  )}
                  {row.getIsExpanded() &&
                    row.original.subRows.map(
                      (ciudad: Ciudad, index: number) => (
                        <TableRow key={ciudad.ciud_Id + index}>
                          <TableCell></TableCell>
                          <TableCell
                            className='pl-[2%]'
                            key={ciudad.ciud_Id + index}
                          >
                            {ciudad.ciud_Id}
                          </TableCell>
                          <TableCell className='pl-[2%]' key={ciudad.ciud_Nombre + index}>
                            {ciudad.ciud_Nombre}
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
