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

interface Empleado {
  empl_Id: number
  empl_Nombres: string
  empl_Apellidos: string
  empl_DNI: string
  escv_Id: number
  escv_Nombre: string
  empl_NombreCompleto: string
  empl_Sexo: string
  empl_FechaNacimiento: string
  empl_Telefono: string
  empl_DireccionExacta: string
  pvin_Nombre: string
  pais_Nombre: string
  empl_CorreoElectronico: string
  carg_Id: number
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
                      <TableCell key={row.id + 2} className='pl-[2%]'>Id</TableCell>
                      <TableCell key={row.id + 3}>Codigo</TableCell>
                      <TableCell key={row.id + 4}>Nombre</TableCell>
                    </TableRow>
                  )}
                  {row.getIsExpanded() &&
                    row.original.subRows.map(
                      (empleado: Empleado, index: number) => (
                        <TableRow key={empleado.carg_Id + index}>
                          <TableCell
                            className='pl-[2%]'
                            key={empleado.empl_Id + index}
                          >
                            {empleado.empl_Id}
                          </TableCell>
                          <TableCell key={empleado.empl_DNI + index}>
                            {empleado.empl_DNI}
                          </TableCell>
                          <TableCell
                            key={
                              empleado.empl_Nombres +
                              ' ' +
                              empleado.empl_Apellidos +
                              index
                            }
                          >
                            <div className='flex items-center'>
                              <span
                                className={`${empleado.empl_Sexo.substring(0, 1) === 'F' ? 'mr-[10px]' : 'mr-[5px]'} min-w-[27px] rounded border-2 p-[2px] text-center`}
                              >
                                {empleado.empl_Sexo.substring(0, 1)}
                              </span>
                              {empleado.empl_Nombres +
                                ' ' +
                                empleado.empl_Apellidos}
                            </div>
                          </TableCell>
                          <TableCell key={empleado.empl_Telefono + index}>
                            {empleado.empl_Telefono}
                          </TableCell>
                          <TableCell
                            key={empleado.empl_CorreoElectronico + index}
                          >
                            {empleado.empl_CorreoElectronico}
                          </TableCell>
                          <TableCell
                            key={empleado.empl_FechaNacimiento + index}
                          >
                            {empleado.empl_FechaNacimiento.split('T')[0]}
                          </TableCell>
                          <TableCell key={empleado.escv_Nombre + index}>
                            {empleado.escv_Nombre}
                          </TableCell>
                          <TableCell key={empleado.pais_Nombre + index}>
                            {empleado.pais_Nombre}
                          </TableCell>
                          <TableCell key={empleado.pvin_Nombre + index}>
                            {empleado.pvin_Nombre}
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
