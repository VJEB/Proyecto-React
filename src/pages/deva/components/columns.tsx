import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Deva } from '../data/schema'

export const columns: ColumnDef<Deva>[] = [
  {
    accessorKey: 'deva_Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('deva_Id')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'adua_IngresoNombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Aduana de ingreso' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('adua_IngresoNombre')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'adua_DespachoNombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Aduana de despacho' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('adua_DespachoNombre')}
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
