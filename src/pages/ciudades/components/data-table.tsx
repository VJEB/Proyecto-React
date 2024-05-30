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

interface Aldea {
  alde_Id: string
  ciud_Id: string
  alde_Nombre: string
  pvin_Nombre: string
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
                        {cell.column.id === 'ciudad' && (
                          <>
                            {/* <TableCell key={cell.id + 1}></TableCell> */}
                            {/* <TableCell key={cell.id + 2}></TableCell> */}
                            {/* <TableCell key={cell.id + 3}></TableCell> */}
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
                      <TableCell key={row.id + 3}>Aldea</TableCell>
                      <TableCell key={row.id + 4}>Provincia</TableCell>
                    </TableRow>
                  )}
                  {row.getIsExpanded() &&
                    row.original.subRows.map((aldea: Aldea, index: number) => (
                      <TableRow key={aldea.ciud_Id + index}>
                        <TableCell
                          className='pl-[2%]'
                          key={aldea.alde_Id + index}
                        >
                          {aldea.alde_Id}
                        </TableCell>
                        <TableCell key={aldea.alde_Nombre + index}>
                          {aldea.alde_Nombre}
                        </TableCell>

                        <TableCell key={aldea.pvin_Nombre + index}>
                          {aldea.pvin_Nombre}
                        </TableCell>
                      </TableRow>
                    ))}
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
