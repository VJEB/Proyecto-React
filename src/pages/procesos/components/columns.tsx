import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Oficio_Profesion } from '../data/schema'

export const columns: ColumnDef<Oficio_Profesion>[] = [
  {
    accessorKey: 'proc_Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('proc_Id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'proc_Descripcion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Proceso' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('proc_Descripcion')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'proc_CodigoHtml',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Codigo del color' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('proc_CodigoHtml')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'proc_Color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Color' />
    ),
    cell: ({ row }) => {
      return (
        <div className={`flex space-x-2`}>
          <span style={{backgroundColor:  row.getValue('proc_CodigoHtml')}} className={`w-[70px] h-[20px]`}>
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
