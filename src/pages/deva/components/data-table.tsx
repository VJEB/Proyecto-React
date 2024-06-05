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

interface Factura {
  fact_Id: number,
  deva_Id: number,
  fact_Numero: string,
  fact_Fecha: string,
  usua_UsuarioCreacion: number,
  fact_FechaCreacion: string,
  usua_UsuarioModificacion: number,
  fact_FechaModificacion: string,
  fact_Estado: boolean,
  usuarioCreacionNombre: string,
  usuarioModificacionNombre: string,
  deva: string,
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
    // console.clear()
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
                        {cell.column.id === 'adua_Id' && (
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
                      className='bg-[#192138] font-bold'
                    >
                      <TableCell key={row.id + 2} ></TableCell>
                      <TableCell key={row.id + 3} className='pl-[2%]' >Factura Id</TableCell>
                      <TableCell key={row.id + 4} className='pl-[2%]'>Número de factura</TableCell>
                      <TableCell key={row.id + 5}>Fecha Emicion</TableCell>
                      <TableCell key={row.id + 6}></TableCell>
                      <TableCell key={row.id + 7}></TableCell>
                      <TableCell key={row.id + 8}></TableCell>
                    </TableRow>
                  )}
                  {row.getIsExpanded() &&
                    row.original.subRows.map(
                      (ciudad: Factura, index: number) => (
                        <TableRow key={ciudad.fact_Id + index} className='bg-[#23315c] font-bold'>
                          <TableCell></TableCell>
                          <TableCell
                            className='pl-[2%]'
                            key={ciudad.fact_Id + index}
                          >
                            {ciudad.fact_Id}
                          </TableCell>
                          <TableCell className='pl-[2%]' key={ciudad.fact_Numero + index}>
                            {ciudad.fact_Numero}
                          </TableCell>
                          
                          <TableCell className='pl-[2%]' key={ciudad.fact_FechaCreacion + index}>
                            {ciudad.fact_FechaCreacion.split('T')[0]}
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>

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
