import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Factura } from '../data/schema'
import { Button } from '@/components/custom/button'
import { CaretDownIcon, CaretRightIcon } from '@radix-ui/react-icons'

export const factColumns: ColumnDef<Factura>[] = [
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
