"use client"
import getPortals from "@/app/api/captaciones/getPortals";
import show from "@/app/api/captaciones/show";
import me from "@/app/api/menu/me"
import { Card, CardContent, Typography, CircularProgress, Box, Button, Grid, List, ListItem, ListItemText } from "@mui/material"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAlert } from '@/components/AlertContext';


import { useEffect, useState } from "react"
import showAllData from "@/app/api/captaciones/getAllCap";
import { formDataInterface } from "@/components/context/FormDataInterface";

interface User {
  id: number;
  name: string;
  number_document: number;
  email: string;
  email_verified_at: string | null;
  role: string;
  state: number;
  created_at: string;
  updated_at: string;
}


export default function Page() {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)
  const [nameShipName, setNameShitName] = useState('')
  const [showIncompleteData, setShowIncompleteData] = useState(false)
  const [portals, setPortals] = useState<any[]>([]);
  const [properties, setProperties] = useState<formDataInterface[]>([])
  const router = useRouter()
  const { showMessage } = useAlert()




  useEffect(() => {
    getUserInfo()
    getAllPortals()
    getAllDataFun()
  }, [])

  const getUserInfo = async () => {
    try {
      const response = await me()
      setUser(response.data)
      getImcompleteData(response.data.number_document)
    } catch (error) {

    }
  }

  const getAllDataFun = async () => {
    try {
      const response = await showAllData()
      setProperties(response.data.data)
    } catch (error) {
      showMessage("Error, vuelve a iniciar sesión.", "error")
      Cookies.remove("auth_token")
      router.push("/login")
    } finally {
      setLoading(false);
    }
  }

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

  const getImcompleteData = async (number: any) => {
    try {
      const { status, data } = await show(number)
      setNameShitName(data.coownershipname)
      if (status === 200) {
        setShowIncompleteData(true)
      }
    } catch (error) {
      showMessage("Error, vuelve a iniciar sesión.", "error")
      Cookies.remove("auth_token")
      router.push("/login")
    }
  }

  useEffect(() => {
    console.log(properties)
  }, [properties])

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress size={100} />
        </Box>
      ) : (
        <>
          {/* Grid for the user and incomplete data cards */}
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Usuario activo
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {user?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {user?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Numero de documento:</strong> {user?.number_document}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Rol:</strong> {user?.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {showIncompleteData && (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Tienes un registro incompleto
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ marginTop: 2 }}>
                      ¿Deseas continuar con este registro de la propiedad {nameShipName}?
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        router.push('/acquisitions/create');
                      }}
                      sx={{ marginTop: 3 }}
                    >
                      Continuar Registro
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>

          {/* Grid for the portals list */}
          <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
            <Grid item xs={12} sm={10} md={8}>
              <Card sx={{ maxWidth: '100%', height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                    Tenemos estos portales activos:
                  </Typography>
                  <List>
                    {portals.map((portal) => (
                      <ListItem key={portal.id}>
                        <ListItemText
                          primary={portal.name}
                          secondary={`Creado el: ${new Date(portal.created_at).toLocaleDateString()} | Actualizado el: ${new Date(portal.updated_at).toLocaleDateString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ paddingTop: '50px' }}>
            <Grid item xs={12} sm={10} md={8}>
              <Card sx={{ maxWidth: '100%', height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                    Información de Propiedades
                  </Typography>
                  {properties.slice(0, 4).map((property, index) => ( // Limitar a las primeras 4 propiedades
                    <div key={index}>
                      <Typography variant="h6" component="div">
                        Propiedad {index + 1}
                      </Typography>

                      <Typography gutterBottom variant="subtitle1" component="div" sx={{ marginTop: 1 }}>
                        Canon: {property.canyon}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        <strong>Propietario:</strong> {property.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        <strong>Nombre de la propiedad:</strong> {property.coownershipname}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        <strong>ID Propietario:</strong> {property.owner_identification}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        <strong>Medios de Contacto:</strong> {
                          property.type_contact
                            ? (JSON.parse(property.type_contact) as string[]).join(', ')
                            : 'No hay medios de contacto disponibles.'
                        }
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Autorización de Publicación:</strong> {property.authorizes_publishing === "si" ? '✅ Autorizada' : '❌ No Autorizada'}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        <strong>¿Está publicada?:</strong> {property.publication_status ? property.publication_status.charAt(0).toUpperCase() + property.publication_status.slice(1).toLowerCase() : 'Nombre no disponible'}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        <strong>Observaciones de la propiedad:</strong> {property.observations}
                      </Typography>
                      {/* Separador entre propiedades */}
                      {index < properties.slice(0, 4).length - 1 && <hr style={{ margin: '20px 0' }} />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>


          <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
            <Grid item xs={12} sm={10} md={8}>
              <Card sx={{ maxWidth: '100%', height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                    Resumen de Propiedades
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary={`Total de Propiedades: ${properties.length}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Canon Total: ${properties.reduce((total, property) => total + (property.canyon ?? 0), 0)}`}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </>
      )}
    </>
  );
}
