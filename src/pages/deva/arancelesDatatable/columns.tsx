import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Arancel } from '../data/schema'
import { CaretRightIcon, CaretDownIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/custom/button'

export const aranColumns: ColumnDef<Arancel>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      row.original.subRows.length > 0 && (
        <Button
          onClick={() => {
            row.toggleExpanded()
          }}
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          {row.getIsExpanded() ? (
            <CaretDownIcon className='h-4 w-4' />
          ) : (
            <CaretRightIcon className='h-4 w-4' />
          )}
          <span className='sr-only'>Desplegar menú</span>
        </Button>
      ),

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'aran_Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('aran_Id')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'aran_Codigo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Codigo' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('aran_Codigo')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'aran_Descripcion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Categoría' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('aran_Descripcion')}
          </span>
        </div>
      )
    },
  },
]
