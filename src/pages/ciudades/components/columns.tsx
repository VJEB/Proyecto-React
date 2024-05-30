import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/custom/button'
import { CaretRightIcon, CaretDownIcon } from '@radix-ui/react-icons'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { labels, priorities, statuses } from '../data/data'
import { Ciudad } from '../data/schema'

export const columns: ColumnDef<Ciudad>[] = [
  {
    id: 'expand',
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={
    //       table.getIsAllPageRowsSelected() ||
    //       (table.getIsSomePageRowsSelected() && 'indeterminate')
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label='Select all'
    //     className='translate-y-[2px]'
    //   />
    // ),
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
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ciudad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ciudad' />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className='flex space-x-2'>
          {/* {label && <Badge variant='outline'>{label.label}</Badge>} */}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('ciudad')}
            {/* {row.getIsExpanded().toString()} */}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'pais',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Pais' />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className='flex space-x-2'>
          {/* {label && <Badge variant='outline'>{label.label}</Badge>} */}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('pais')}
            {/* {row.getIsExpanded().toString()} */}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'provincia',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Provincia' />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className='flex space-x-2'>
          {/* {label && <Badge variant='outline'>{label.label}</Badge>} */}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('provincia')}
            {/* {row.getIsExpanded().toString()} */}
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
