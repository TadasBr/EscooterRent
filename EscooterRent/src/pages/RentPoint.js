import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom"
import { Api, authConfig } from "../components/Api";
import ScootersList from "../components/ScootersList";
import Spinner from "../components/Spinner";

const RentPoint = () => {
    const { rentPointId } = useParams();
    const [rentPoint, setRentPoint] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        const getRentPoint = async () => {
            setIsLoading(true);
            const response = await Api.get(`/RentPoint/RentPointsById/${rentPointId}`, authConfig);
            setRentPoint(response.data);
            setIsLoading(false);
        }

        getRentPoint();
    }, []);

    if (rentPoint) {
        return (
            <>
                <Spinner isOpen={isLoading} />
                <ScootersList rentPointAddress={rentPoint.address} rentPointId={rentPointId} />
            </>
        );
    }

}

export default RentPoint;