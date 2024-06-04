import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Factura } from '../data/schema'

export const factColumns: ColumnDef<Factura>[] = [
  {
    accessorKey: 'fact_Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('fact_Id')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fact_Numero',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nro. factura' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('fact_Numero')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'fact_Fecha',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha de aceptación' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('fact_Fecha').split('T')[0]}
          </span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
