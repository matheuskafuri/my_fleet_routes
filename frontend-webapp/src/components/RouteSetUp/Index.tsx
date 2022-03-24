import { useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, TextField } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { LocationInfo, useLocationInfo } from '../../hooks/location';
import { RouteInfo, useRouteInfo } from '../../hooks/route';

import { api } from '../../service';


type Inputs = {
    city: string;
    state: string;
};

type RouteData = {
    route_id: string,
    initLat: number,
    finalLat?: number,
    initLong: number,
    finalLong?: number,
    isInitial: number,
    isFinal: number
}

export default function RouteSetUp() {
    const { route } = useRouteInfo();
    const { location } = useLocationInfo();
    const [locationArray, setLocationArray] = useState<LocationInfo[]>([]);

    let routesArray: RouteData[] = [];
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            data.city = location.city;
            data.state = location.principalSubdivision;
            generateRoutesArray(locationArray);
            console.log(routesArray);
            await postRoutes(routesArray);
        } catch (error) {
            console.log(error);
        }

    };

    const handleAddPath = (location: LocationInfo) => {
        setLocationArray([...locationArray, location]);
    }

    const handleDeletePath = (location: LocationInfo) => {
        setLocationArray(locationArray.filter(item => item !== location));
    }


    function handleGenerateNewRouteFields() {
        handleAddPath(location);
        reset({
            city: '',
            state: ''
        });
    }

    const generateRoutesArray = (locationArray: LocationInfo[]) => {
        locationArray.forEach((location, index) => {
            if (index === 0) {
                routesArray.push({
                    route_id: route.id,
                    initLat: location.latitude,
                    finalLat: locationArray[index + 1].latitude,
                    initLong: location.longitude,
                    finalLong: locationArray[index + 1].longitude,
                    isInitial: 1,
                    isFinal: 0
                });
            } else if (index === locationArray.length - 1) {
                routesArray.push({
                    route_id: route.id,
                    initLat: location.latitude,
                    initLong: location.longitude,
                    isInitial: 0,
                    isFinal: 1
                });
            } else {
                routesArray.push({
                    route_id: route.id,
                    initLat: location.latitude,
                    finalLat: locationArray[index + 1].latitude,
                    initLong: location.longitude,
                    finalLong: locationArray[index + 1].longitude,
                    isInitial: 0,
                    isFinal: 0
                });
            }
        })

        return routesArray;
    }

    const callApi = useCallback(async (route: RouteData) => {
        const response = await api.post('paths',
            {
                route_id: route.route_id,
                initLat: route.initLat,
                finalLat: route.finalLat,
                initLong: route.initLong,
                finalLong: route.finalLong,
                isInitial: route.isInitial,
                isFinal: route.isFinal
            }
        );
    }, []);


    const postRoutes = async (routesArray: RouteData[]) => {
        try {
            await Promise.all(
                routesArray.map(async (route) => {
                    await callApi(route);
                })
            );
            refreshPage();
        } catch (error) {
            console.log(error);
        }
    }

    const refreshPage = () => {
        alert('Viagem cadastrada com sucesso!')
        window.location.reload();
    }


    return (
        <Grid
            container
            padding={2}
            width="100%"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={2} >
                <Button variant="contained" size='large' onClick={handleGenerateNewRouteFields} style={{ marginRight: "4px" }}>
                    <AddLocationIcon />
                </Button>
            </Grid>
            <Grid item xs={4} >
                <TextField
                    label="Cidade"
                    variant="filled"
                    {...register("city")}
                    error={errors.city ? true : false}
                    value={location.city}
                />
            </Grid>
            <Grid item xs={4} >
                <TextField
                    label="Estado"
                    {...register("state")}
                    variant="filled"
                    error={errors.state ? true : false}
                    value={location.principalSubdivision}
                />
            </Grid>
            {locationArray.length >= 1 ?
                <Grid
                    container
                    spacing={2}
                    paddingX={4}
                    style={{ marginTop: "20px" }}
                >
                    <h2>Sua Rota Atual</h2>
                </Grid>
                : null}
            {locationArray.map((location, index) => (
                <Grid
                    container
                    padding={2}
                    width="100%"
                    key={index}
                    spacing={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={2} >
                        <Button
                            variant="contained"
                            size='large'
                            onClick={() => {
                                handleDeletePath(location);
                            }}
                            style={{ marginRight: "4px", backgroundColor: "#DC143C" }}>
                            <DeleteIcon />
                        </Button>

                    </Grid>
                    <Grid item xs={4} >
                        <TextField label={`${location.city}`} variant="filled" disabled />
                    </Grid>
                    <Grid item xs={4} >
                        <TextField label={`${location.principalSubdivision}`} variant="filled" disabled />
                    </Grid>

                </Grid>
            ))
            }
            <Grid item xs={12} display="flex" justifyContent="center" style={{ marginTop: "20px", height: "60px" }}>
                <Button variant="contained" type="submit" size="large">Finalizar Rota</Button>
            </Grid>
        </Grid>
    )
}