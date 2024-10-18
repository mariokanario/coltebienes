'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react';

import Link from 'next/link';
import * as yup from 'yup';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Switch } from '@mui/material';

// MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import type { TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

// Third-party Imports
import classnames from 'classnames';
import { rankItem } from '@tanstack/match-sorter-utils';
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
} from '@tanstack/react-table';
import type { ColumnDef, FilterFn } from '@tanstack/react-table';
import type { RankingInfo } from '@tanstack/match-sorter-utils';

// Type Imports
import type { ThemeColor } from '@core/types';

// Component Imports
import TableFilters from './TableFilters';
import AddUserDrawer from './AddUserDrawer';
import OptionMenu from '@core/components/option-menu';
import TablePaginationComponent from '@components/TablePaginationComponent';
import CustomTextField from '@core/components/mui/TextField';

// Style Imports
import tableStyles from '@core/styles/table.module.css';
import { useRouter } from 'next/navigation';
import { formDataInterface } from '@/components/context/FormDataInterface';
import deleteRow from '@/app/api/captaciones/delete';
import Cookies from 'js-cookie';
import { useAlert } from '@/components/AlertContext';
import list from '@/app/api/captaciones/list'
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import { useFormik } from 'formik';
import changeStatus from '@/app/api/captaciones/changeStatus';
import storePhotos from '@/app/api/captaciones/storePhotos';
import getPortals from '@/app/api/captaciones/getPortals';
import publishPortal from '@/app/api/captaciones/publishProperty';
import unPublishPortal from '@/app/api/captaciones/unPublishPropery';



declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type PropertiesTypeWithAction = formDataInterface & {
  action?: string
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

interface PropertyListTableProps {
  tableData?: formDataInterface[]
  isHouse: boolean
}

interface PropertySubmitHouseProps {
  observations_house?: string
  base64Images?: string[]
}

export interface RequestBodyPropertyPortal {
  id_portals?: number[];
  property_data_id?: number;
  type_management?: string;
}

// Column Definitions
const columnHelper = createColumnHelper<PropertiesTypeWithAction>()

const PropertyListTable = ({ tableData, isHouse }: PropertyListTableProps) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [rowId, setRowId] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [data, setData] = useState(...[tableData])
  const [row, setRow] = useState<formDataInterface>()
  const [open, setOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter()
  const { showMessage } = useAlert()
  const [portals, setPortals] = useState<any[]>([]);
  const [selectedPortals, setSelectedPortals] = useState<number[]>([])

  useEffect(() => {
    getAllPortals()
  }, [])

  const getAllPortals = async () => {
    try {
      const response = await getPortals();
      if (response?.data && Array.isArray(response.data.data)) {
        setPortals(response?.data.data);
      } else {
        console.error("La respuesta no contiene un array válido.");
        setPortals([]);
      }
    } catch (error) {
      console.error('Error al obtener portales:', error);
      setPortals([]);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (selectedPortals.includes(value)) {
      setSelectedPortals(selectedPortals.filter(portal => portal !== value));
    } else {
      setSelectedPortals([...selectedPortals, value]);
    }
  };


  const handleSave = async () => {
    try {
      const body: RequestBodyPropertyPortal = {
        id_portals: selectedPortals,
        property_data_id: row?.id,
        type_management: row?.charge,
      };

      const response = await publishPortal(body);

      if (response?.data.status) {
        showMessage(response.data.message, "success");
        handleClose();
        setSelectedPortals([]);
      } else {
        response?.data.infoPublicado?.forEach((value: any) => {
          showMessage(`${response.data.message}: ${value} ya se encuentra publicada`, "info");
        });
      }
      console.log(response);
    } catch (error) {
      console.error('Error al guardar:', error);
      showMessage('Ocurrió un error al guardar. Intente nuevamente.', 'error');
      Cookies.remove("auth_token")
      router.push("/login")
    }
  };


  const handleOpen = (rowData: any) => {
    if (rowData?.authorizes_publishing === "no") {
      showMessage("No estás autorizado por el usuario para publicar esta propiedad", "error")
    } else {
      setRow(rowData)
      setOpen(true)
    }
  };
  const handleClose = () => setOpen(false);

  const unPublishPropertyFun = async (id: any) => {
    try {
      const response = await unPublishPortal(id)
      if (response) {
        refreshData(response.data.message)
      } else {
        showMessage("Error a, intentar despublicar", "error")
      }
    } catch (error) {

    }
  }

  async function handleDeleteRow(id: number | undefined) {
    try {
      const response = await deleteRow(id)
      if (response.status === 200) {
        refreshData(response.data.message)
      } else if (response.status === 404) {
        window.location.reload()
      }


    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        showMessage("Error, vuelve a iniciar sesión", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      } else {
        console.error("Error fetching incomplete data:", error)
        showMessage("Ocurrió un error al obtener los datos.", "error")
      }
    }
  }

  async function refreshData(message: string) {
    try {
      setData([])
      const responseList = await list(isHouse === true ? 1 : 0)
      setData(responseList.data)
      showMessage(message, "success")
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        showMessage("Error, vuelve a iniciar sesión", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      } else {
        console.error("Error fetching incomplete data:", error)
        showMessage("Ocurrió un error al obtener los datos.", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      }
    }

  }

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
      columnHelper.accessor('globaltype', {
        header: 'Tipo',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <div className={` ${row.original.globaltype == 'comercio' ? 'bg-blue-200' : 'bg-orange-200'}  rounded-full p-2 d-flex w-[40px] h-[40px]`}>
              <i className={` ${row.original.globaltype == 'casa' ? 'tabler-home-2' : 'tabler-building'}  text-[22px]`} />
            </div>
            <Typography className='capitalize' color='text.primary'>
              {row.original.globaltype}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('charge', {
        header: 'Gestión',
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
      columnHelper.accessor('sale_value', {
        header: 'Precio venta',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.sale_value}
          </Typography>
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
      columnHelper.accessor('address', {
        header: 'Dirección',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.address}
          </Typography>
        )
      }),
      ...(isHouse
        ? [
          columnHelper.accessor('publication_status', {
            header: 'Publicado',
            cell: ({ row }) => (
              <Typography className='capitalize' color='text.primary'>
                {row.original.publication_status}
              </Typography>
            )
          })
        ]
        : []),
      columnHelper.accessor('collector_name', {
        header: 'Asesor',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.collector_name}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Acción',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={`/properties/detail/${row.original.id}`}>
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
                  text: 'Pasar a propiedad',
                  icon: 'tabler-home-move text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary', disabled: isHouse ? true : false, onClick: () => handleOpenModalHouse(row.original.id) }
                },
                {
                  text: 'Publicar',
                  icon: 'tabler-briefcase text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary', disabled: !isHouse ? true : false, onClick: () => handleOpen(row.original) }
                },
                {
                  text: 'Despubilcar',
                  icon: 'tabler-trash text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary', disabled: !isHouse ? true : false, onClick: () => unPublishPropertyFun(row.original.id) }
                },
                {
                  text: 'Eliminar',
                  icon: 'tabler-trash text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2  text-red-500', onClick: () => handleDeleteRow(row.original.id) },
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
    data: data as formDataInterface[],
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
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

  })

  const formik = useFormik({
    initialValues: {
      observations_house: "",
      selectedFiles: []
    },
    validationSchema: yup.object({
      observations_house: yup
        .string()
        .required("Escriba otras características")
        .min(5, "Debe de tener mínimo 5 letras")
    }),

    onSubmit: (values) => {
      handleSubmitHouse(values)
    },
  });

  const handleOpenModalHouse = (rowIdHandle: number | undefined) => {
    if (rowIdHandle !== undefined) {
      setRowId(rowIdHandle)
    }
    setConfirmOpen(true)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {

    setSelectedFiles(acceptedFiles)

    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const base64String = reader.result as string
        setBase64Images((prevBase64Images) => [...prevBase64Images, base64String]);
      };

      reader.readAsDataURL(file)
    });
  }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
  });

  const cleanForm = function () {
    setSelectedFiles([])
    setBase64Images([])
    formik.values.observations_house = ''
  }

  const handleSubmitHouse = async (values: PropertySubmitHouseProps) => {
    try {
      const [responseStatus, responsePhotos] = await Promise.all([
        changeStatus(rowId, values),
        storePhotos(base64Images, rowId),
      ]);

      if (responseStatus.data.status && responsePhotos.data.status) {
        showMessage("Cambio de captación a vivienda correctamente.", "success");
        refreshData("Datos actualizados correctamente.");
        cleanForm();
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 500) {
        showMessage("Error, vuelve a iniciar sesión", "error");
      } else {
        showMessage("Ocurrió un error al obtener los datos.", "error");
      }

      Cookies.remove("auth_token");
      router.push("/login");
    } finally {
      setConfirmOpen(false);
    }
  };


  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <Dialog
          open={confirmOpen}
          onClose={() => {
            setConfirmOpen(false)
          }}
          maxWidth="lg"
          fullWidth
        >
          {/* <DialogTitle>Confirmar</DialogTitle> */}
          <DialogContent>
            <Grid item xs={12} md={12}>
              <CustomTextField
                fullWidth
                rows={4}
                multiline
                label='Observaciones'
                placeholder='Ingrese notas respecto al proceso'
                id="observations_house"
                value={formik.values.observations_house}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.observations_house && formik.errors.observations_house ? formik.errors.observations_house : ''}
                error={formik.touched.observations_house && Boolean(formik.errors.observations_house)}
              />
            </Grid>
            <Grid item xs={12} md={12} sx={{
              marginTop: '20px'
            }}>
              <FormLabel component="legend" sx={{ marginBottom: 2 }}>
                Subir imagen
              </FormLabel>
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed #cccccc',
                  padding: 4,
                  borderRadius: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragActive || selectedFiles.length > 0 ? '#d0ffd0' : (isDragActive ? '#f0f0f0' : '#fafafa'),
                  '&:hover': {
                    backgroundColor: isDragActive || selectedFiles.length > 0 ? '#d0ffd0' : '#f0f0f0',
                  },
                }}
              >
                <input {...getInputProps()} />
                <IconButton color="primary">
                  {/* Puedes agregar un ícono aquí si lo deseas */}
                </IconButton>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {isDragActive ? 'Suelta la imagen aquí...' :
                    selectedFiles.length > 0 ?
                      'Imágenes seleccionadas. Haz clic para subir más.' :
                      'Arrastra y suelta imágenes de la propiedad o haz clic para subir'}
                </Typography>
              </Box>
              {formik.touched.selectedFiles && formik.errors.selectedFiles ? (
                <Typography color="error" variant="body2">
                  {formik.errors.selectedFiles}
                </Typography>
              ) : null}
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setSelectedFiles([])
              setBase64Images([])
            }} color="error">
              Eliminar fotos
            </Button>
            <Button onClick={() => {
              setConfirmOpen(false)
              formik.values.observations_house = ''
            }} color="primary">
              Cancelar
            </Button>
            <Button color="secondary" type='submit' onClick={() => {
              formik.handleSubmit()
            }}>
              Pasar
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Seleccionar Portal</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            {portals.length > 0 ? (
              portals.map((portal) => (
                <FormControlLabel
                  key={portal.id}
                  control={
                    <Checkbox
                      checked={selectedPortals.includes(portal.id)}
                      onChange={handleCheckboxChange}
                      value={portal.id.toString()}
                    />
                  }
                  label={portal.name}
                />
              ))
            ) : (
              <p>No hay portales disponibles</p>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" disabled={selectedPortals.length === 0}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
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
            sx={{
              position: 'relative',
              left: isHouse === false ? '50px' : '0px'
            }}
            onClick={() => {
              refreshData("Se ha refrescado correctamente.")
            }}
            className='sm:is-auto'
          >
            Refrescar datos
          </Button>
          {isHouse === false && (
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => {
                router.push("/acquisitions/create")
              }}
              className='is-full sm:is-auto'
            >
              Crear nueva captación
            </Button>
          )}

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

