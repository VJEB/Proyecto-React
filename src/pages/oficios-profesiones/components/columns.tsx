import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Oficio_Profesion } from '../data/schema'

export const columns: ColumnDef<Oficio_Profesion>[] = [
  {
    accessorKey: 'ofpr_Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('ofpr_Id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ofpr_Nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Oficio o Profesion' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('ofpr_Nombre')}
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
