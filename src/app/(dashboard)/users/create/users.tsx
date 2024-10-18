import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Snackbar, Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardHeader, FormLabel, Grid, IconButton, MenuItem, TablePagination, Typography, Link, TextFieldProps } from '@mui/material';
import users from '../list/users';
import state from '@/app/api/login/state';
import deleteUser from '@/app/api/login/delete';
import SimpleModal from './modalRegister';
import { useAlert } from '@/components/AlertContext';
import CustomTextField from '@/@core/components/mui/TextField';
import TablePaginationComponent from '@/components/TablePaginationComponent';
import AddUserDrawer from '@/views/property/list/AddUserDrawer';
import TableFilters from '@/views/property/list/TableFilters';
import { ColumnDef, createColumnHelper, FilterFn, flexRender, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { table } from 'console';
import OptionMenu from '@/@core/components/option-menu';
import changeStatus from '@/app/api/captaciones/changeStatus';
import deleteRow from '@/app/api/captaciones/delete';
import { formDataInterface } from '@/components/context/FormDataInterface';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { list } from 'postcss';
import { useDropzone } from 'react-dropzone';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { ThemeColor } from '@/@core/types';
import tableStyles from '@core/styles/table.module.css';
import classnames from 'classnames';





export interface userDataInterface {
    id: number,
    number_document: number,
    name: string,
    email: string,
    role: string,
    state: number
}

const userStatusObj: UserStatusType = {
    publicado: 'success',
    inactivo: 'warning'
}


interface PropertySubmitHouseProps {
    observations_house?: string
}

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

type PropertiesTypeWithAction = userDataInterface & {
    action?: string
}


type UserStatusType = {
    [key: string]: ThemeColor
}

export default function ListUsers() {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const formRef = useRef<{ submit: () => void }>(null);
    const [editUserData, setEditUserData] = useState<userDataInterface | null>(null);
    const [modalMode, setModalMode] = useState<'register' | 'update'>('register');


    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
            console.log(file)
        })
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
    });

    // States
    const [addUserOpen, setAddUserOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [rowId, setRowId] = useState(0)
    const [confirmOpen, setConfirmOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [globalFilter, setGlobalFilter] = useState('')
    const { showMessage } = useAlert()

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

    const handleStateChange = async (id: number) => {
        const response = await state(id);
        getUsers();
        handleClick();
        setMessage(response.data.message);
    };

    const handleSubmitHouse = async (values: PropertySubmitHouseProps) => {
        try {
            const response = await changeStatus(rowId, values)
            if (response.status === 200) {
                showMessage(response.data.message, "success")
            } else {
                showMessage(response.data.message, "error")
            }

        } catch (error: any) {
            showMessage(error, "error")

        } finally {
            setConfirmOpen(false)

        }
    }

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await users()
            const data: userDataInterface[] = response.data
            const formattedData = data.map(user => ({
                id: user.id,
                number_document: user.number_document,
                name: user.name,
                email: user.email,
                role: user.role,
                state: user.state
            }));
            setRows(formattedData);
        } catch (error) {
            setError('Error fetching data')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers();
    }, []);


    const handleClick = () => {
        setOpen(true);
    };

    const handleEdit = (user: userDataInterface) => {
        setEditUserData(user);
        setModalMode('update');
        setModalOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleOpenConfirmDelete = (id: number) => {
        setUserToDelete(id);
        setConfirmDeleteOpen(true);
    };

    const handleRegisterSuccess = () => {
        getUsers();
    };

    const handleSendMessage = (message: string, type: any) => {
        showMessage(message, type)
    }

    const handleDelete = async () => {
        if (userToDelete !== null) {
            try {
                const response = await deleteUser(userToDelete);
                getUsers();
                handleClick();
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
            } finally {
                setConfirmDeleteOpen(false);
                setUserToDelete(null);
            }
        }
    };

    const columnHelper = createColumnHelper<PropertiesTypeWithAction>()


    const columns = useMemo<ColumnDef<PropertiesTypeWithAction, any>[]>(
        () => [
            columnHelper.accessor('id', {
                header: 'Código',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>

                        <div className='flex flex-col'>
                            <Typography color='text.primary' className='font-medium'>
                                {row.original.id}
                            </Typography>
                            {/* <Typography variant='body2'>{row.original.quality}</Typography> */}
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('name', {
                header: 'Nombre',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        {/* <div className={` ${row.original.globaltype == 'comercio' ? 'bg-blue-200' : 'bg-orange-200'}  rounded-full p-2 d-flex w-[40px] h-[40px]`}>
                            <i className={` ${row.original.globaltype == 'casa' ? 'tabler-home-2' : 'tabler-building'}  text-[22px]`} />
                        </div> */}
                        <Typography className='capitalize' color='text.primary'>
                            {row.original.name}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('number_document', {
                header: 'número documento',
                cell: ({ row }) => (
                    <Typography className='capitalize' color='text.primary'>
                        {row.original.number_document}
                    </Typography>
                )
            }),
            columnHelper.accessor('email', {
                header: 'Correo',
                cell: ({ row }) => (
                    <Typography className='capitalize' color='text.primary'>
                        {row.original.email}
                    </Typography>
                )
            }),
            columnHelper.accessor('role', {
                header: 'Rol',
                cell: ({ row }) => (
                    <Typography className='capitalize' color='text.primary'>
                        {row.original.role}
                    </Typography>
                )
            }),
            columnHelper.accessor('state', {
                header: 'Estado',
                cell: ({ row }) => (
                    <Typography className='capitalize' color='text.primary'>
                        {row.original.state === 1 ? "Activo" : "Inactivo"}
                    </Typography>
                )
            }),
            columnHelper.accessor('action', {
                header: 'Acción',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <IconButton disabled={table.getFilteredRowModel().rows.length <= 1}>
                            <Link >
                                <i className='tabler-eye-plus text-[22px] text-textSecondary'

                                    onClick={() => {
                                        const numberRow: any = row.id
                                        handleEdit(table.options.data[numberRow])
                                    }} />
                            </Link>
                        </IconButton>
                        <OptionMenu
                            iconClassName='text-[22px] text-textSecondary'
                            options={[
                                {
                                    text: 'Activar / Desactivar',
                                    icon: 'tabler-arrows-diff text-[22px]',
                                    menuItemProps: { className: 'flex items-center gap-2 text-textSecondary', disabled: table.getFilteredRowModel().rows.length <= 1, onClick: () => handleStateChange(row.original.id) }
                                },
                                {
                                    text: 'Editar usuario',
                                    icon: 'tabler-eye-plus text-[22px]',
                                    menuItemProps: {
                                        className: 'flex items-center gap-2 text-textSecondary', disabled: table.getFilteredRowModel().rows.length <= 1, onClick: () => {
                                            const numberRow: any = row.id
                                            handleEdit(table.options.data[numberRow])
                                        }
                                    }
                                },
                                {
                                    text: 'Eliminar',
                                    icon: 'tabler-trash text-[22px]',
                                    menuItemProps: {
                                        className: 'flex items-center gap-2  text-red-500', disabled: table.getFilteredRowModel().rows.length <= 1, onClick: () => {
                                            handleOpenConfirmDelete(row.original.id)
                                        }
                                    },
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
        data: rows as formDataInterface[],
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

    const formik = useFormik({
        initialValues: {
            observations_house: ""
        },
        onSubmit: (values) => {
            handleSubmitHouse(values)
        },
    });

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



    return (
        <>
            <Card>
                <CardHeader title='Filtros' className='pbe-4' />
                {/* <TableFilters setData={setData} tableData={tableData} /> */}
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
                    <Grid>
                        <Button variant="contained" color="primary" sx={{
                            marginRight: '15px'
                        }} onClick={() => {
                            setEditUserData(null);
                            setModalMode('register');
                            setModalOpen(true);
                        }}>
                            Agregar usuario
                        </Button>
                        <Button
                            variant='contained'
                            onClick={() => {
                                getUsers()
                                showMessage("Actualización de usuarios correcta", 'success')
                            }}
                            className='sm:is-auto'
                        >
                            Refrescar datos
                        </Button>
                    </Grid>

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
                <Dialog
                    open={confirmDeleteOpen}
                    onClose={() => setConfirmDeleteOpen(false)}
                >
                    <DialogTitle>Confirmar Eliminación</DialogTitle>
                    <DialogContent>
                        ¿Estás seguro de que deseas eliminar este usuario?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={() => handleDelete} color="secondary">
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
                <SimpleModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onRegisterSuccess={handleRegisterSuccess}
                    userDataPage={editUserData}
                    ref={formRef}
                    mode={modalMode}
                    onMessage={handleSendMessage}
                />
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
    );
}
