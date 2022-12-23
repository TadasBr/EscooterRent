import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom"
import { Api, authConfig } from "../components/Api";
import RentPointList from "../components/RentPointList";
import AddScooter from "./AddScooter";
import EditPost from "./EditPost";
import EditRentPoint from "./EditRentPoint";
import Scooter from "./Scooter";
import RentPoint from "./RentPoint";
import AddRentPoint from "./AddRentPoint";

const RentPoints = () => {
    const match = useRouteMatch();

    return (
        <>
            <Switch>
                <Route exact path={`${match.path}/add`}>
                    <AddRentPoint />
                </Route>
                <Route exact path={`${match.path}/:rentPointId`}>
                    <RentPoint />
                </Route>
                <Route exact path={`${match.path}/:rentPointId/edit`}>
                    <EditRentPoint />
                </Route>
                <Route exact path={match.path}>
                    <RentPointList />
                </Route>
                <Route exact path={`${match.path}/:rentPointId/scooters/add`}>
                    <AddScooter />
                </Route>
                <Route exact path={`${match.path}/:rentPointId/scooters/:scooterId`}>
                    <Scooter />
                </Route>
                <Route exact path={`${match.path}/:rentPointId/scooters/:scooterId/edit`}>
                    <EditPost />
                </Route>
            </Switch>
        </>
    );
}

export default RentPoints;