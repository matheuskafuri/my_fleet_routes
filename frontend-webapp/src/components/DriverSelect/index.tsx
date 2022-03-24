import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import { DriverContainer } from './style';
import { useRouteInfo, RouteInfo } from '../../hooks/route';

import { api } from '../../service';

export interface Route {
  route: RouteInfo;
}

export interface UserType {
  id: string;
  username: string;
  password: string;
  email: string;
  isDriver: boolean;
  isAdmin: boolean;
  isEnterprise: boolean;
  created_at: string;
  avatar?: string;
}

interface DriverSelectProps {
  drivers: UserType[];
}

export default function DriverSelect({ drivers }: DriverSelectProps) {
  const [driver, setDriver] = useState<UserType | null>();
  const { setRouteInfo } = useRouteInfo();


  const sendDriver = useCallback(async (driver: UserType) => {
    try {
      const response = await api.post('routes', { driver_id: driver.id });
      const route: RouteInfo = response.data;
      setRouteInfo(route);
      console.log(route);
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <DriverContainer>
      <Autocomplete
        id="driver select"
        sx={{ width: 300 }}
        options={drivers}
        autoHighlight
        getOptionLabel={(option) => option.username}
        onChange={(_event, value) => {
          setDriver(value);
        }}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`${option.avatar}`}
              srcSet={`${option.avatar} 2x`}
              alt=""
            />
            {option.username}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecione um motorista"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
      <Box>
        {driver && (
          <Button variant="contained" size='large' onClick={() => {driver && sendDriver(driver)}} style={{ marginRight: "4px" }}>
            Confirmar Motorista
          </Button>
        )}
      </Box>
    </DriverContainer>
  );
}

