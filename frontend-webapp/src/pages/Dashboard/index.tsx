import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { ContainerTest, FormContainer, MapBox } from "./style";

import { useRouteInfo } from '../../hooks/route';
import Map from '../../components/Map';
import { Sidebar } from "../../components/SideBar";
import RouteSetUp from '../../components/RouteSetUp/Index';
import DriverSelect, { UserType } from '../../components/DriverSelect';

export function Dashboard() {
  const usersExample: UserType[] = [
    { id: "a6004dcb-f6d3-42b6-9b21-30cc58a01558", username: "Kafuri", password: "$2a$08$5V9xVCau/3xxNj36oVfPUO2Jo4lDOqPP95rW7zQGrDlkEUxzM/KSe", email: "kafurimatheus@gmail.com", isDriver: true, isAdmin: true, isEnterprise: true, created_at: "2022-03-23 11:48:23.665166", avatar: "https://github.com/matheuskafuri.png" },
    { id: "de1098d3-6502-48bd-aeb0-9f3b9e216a17", username: "Matheus", password: "$2a$08$3Es0BJ8oy8EaGUCme7XlDuCe4TVceK5.rndg8KRtI.urM02f0AJfe", email: "matheus10.rk@gmail.com", isDriver: true, isAdmin: false, isEnterprise: false, created_at: "2022-03-23 00:14:25.347937", avatar: "https://github.com/matheuskafuri.png" },
    { id: "5b2a6ffa-8cb8-4261-b4e9-08ebf3ec16c4", username: "Felipe", password: "$2a$08$DLhSCE01o/8ZRcuVwvmS7OMXbrgQwWMaLGJ.RXFukd5ivkxoP0ZOy", email: "felipe11.rk@gmail.com", isDriver: false, isAdmin: false, isEnterprise: false, created_at: "2022-03-23 15:15:18.087737", avatar: "https://github.com/matheuskafuri.png" },
    { id: "4f80046d-0358-4800-bd5f-5671f366798d", username: "Jonas", password: "$2a$08$2j2cVovj2nqnxWlqvRaDJOFIVCqgylEHJlftrwFzob6rZa9scjnzO", email: "candida.kafuri@gmail.com", isDriver: false, isAdmin: false, isEnterprise: false, created_at: "2022-03-23 15:17:05.668655", avatar: "https://github.com/matheuskafuri.png" },
  ]

  const { route } = useRouteInfo();

  const [users, setUsers] = useState<UserType[]>([]);
  const [drivers, setDrivers] = useState<UserType[]>([]);

  // const getUsers = async () => {
  //   const response = await api.get('/users');
  //   setUsers(response.data);
  // }

  const getDrivers = (users: UserType[]) => {
    const drivers = users.filter(user => user.isDriver);
    setDrivers(drivers);
  }

  useEffect(() => {
    // getUsers();
    setUsers(usersExample);
    getDrivers(users);
  }, [])


  return (
    <ContainerTest maxWidth="xl">
      <FormContainer>
        <Sidebar />
        <Grid
          container
          padding={4}
          spacing={2}
        >
          <h1>Cadastre uma viagem</h1>
        </Grid>
        <Grid
          container
          padding={2}
          width="100%"
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            {drivers ?
              <DriverSelect drivers={drivers} /> :
              <CircularProgress />
            }
          </Grid>
        </Grid>
        { route.id ? <RouteSetUp /> : null }
      </FormContainer>
      <MapBox>
        <Map />
      </MapBox>
    </ContainerTest>
  )
}

