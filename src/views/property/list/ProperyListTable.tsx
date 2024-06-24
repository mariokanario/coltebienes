'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports


// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { PropertiesType } from '@/types/apps/propertyTypes'


// Component Imports
import TableFilters from './TableFilters'
import AddUserDrawer from './AddUserDrawer'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'


// Style Imports
import tableStyles from '@core/styles/table.module.css'
import Link from 'next/link'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type PropertiesTypeWithAction = PropertiesType & {
  action?: string
}

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

type UserStatusType = {
  [key: string]: ThemeColor
}


const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler-crown', color: 'error' },
  author: { icon: 'tabler-device-desktop', color: 'warning' },
  editor: { icon: 'tabler-edit', color: 'info' },
  maintainer: { icon: 'tabler-chart-pie', color: 'success' },
  subscriber: { icon: 'tabler-user', color: 'primary' }
}

const userStatusObj: UserStatusType = {
  publicado: 'success',
  inactivo: 'warning'
}

// Column Definitions
const columnHelper = createColumnHelper<PropertiesTypeWithAction>()

const PropertyListTable = ({ tableData }: { tableData?: PropertiesType[] }) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[tableData])
  const [globalFilter, setGlobalFilter] = useState('')

  // console.log(tableData);


  const columns = useMemo<ColumnDef<PropertiesTypeWithAction, any>[]>(
    () => [

      columnHelper.accessor('code', {
        header: 'Código',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>

            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.code}
              </Typography>
              <Typography variant='body2'>{row.original.quality}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('type', {
        header: 'Tipo',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <div className={` ${row.original.type == 'casa' ? 'bg-blue-200' : 'bg-orange-200'}  rounded-full p-2 d-flex w-[40px] h-[40px]`}>
              <i className={` ${row.original.type == 'casa' ? 'tabler-home-2' : 'tabler-building'}  text-[22px]`} />
            </div>
            <Typography className='capitalize' color='text.primary'>
              {row.original.type}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('charge', {
        header: 'Cargo',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.charge}
          </Typography>
        )
      }),
      columnHelper.accessor('canyon', {
        header: 'Canon',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.canyon}
          </Typography>
        )
      }),
      columnHelper.accessor('salevalue', {
        header: 'Precio venta',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.salevalue}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Estado',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.status}
              color={userStatusObj[row.original.status]}
              size='small'
            />
          </div>
        )
      }),
      columnHelper.accessor('neighborhood', {
        header: 'Barrio',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.neighborhood}
          </Typography>
        )
      }),
      columnHelper.accessor('addressbuild', {
        header: 'Dirección',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.addressbuild}
          </Typography>
        )
      }),
      columnHelper.accessor('adviser', {
        header: 'Asesor',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.adviser}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Acción',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={`propertiesDetail/${row.original.id}`}>
                <i className='tabler-eye-plus text-[22px] text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton>
              {/* <Link href={getLocalizedUrl('apps/user/view', locale as Locale)} className='flex'>
                <i className='tabler-eye text-[22px] text-textSecondary' />
              </Link> */}
            </IconButton>
            <OptionMenu
              iconClassName='text-[22px] text-textSecondary'
              options={[
                {
                  text: 'Activar / Desactivar',
                  icon: 'tabler-arrows-diff text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Pasar a propiedad',
                  icon: 'tabler-home-move text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Eliminar',
                  icon: 'tabler-trash text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2  text-red-500' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as PropertiesType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })



  return (
    <>
      <Card>
        <CardHeader title='Filtros' className='pbe-4' />
        <TableFilters setData={setData} tableData={tableData} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Buscar por palabra clave'
            className='is-full sm:is-auto lg:w-[500px]'
          />
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setAddUserOpen(!addUserOpen)}
            className='is-full sm:is-auto'
          >
            Crear nueva captación
          </Button>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No hay datos disponibles
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <AddUserDrawer open={addUserOpen} handleClose={() => setAddUserOpen(!addUserOpen)} />
    </>
  )
}

export default PropertyListTable
