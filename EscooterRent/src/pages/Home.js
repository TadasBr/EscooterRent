import { Typography } from "@mui/material";
import { isAdmin, isLoggedIn } from "../components/Api";
import ScootersList from "../components/ScootersList";
import Login from "./Login"

const Home = () => {
    return (
        <>
            {
                isLoggedIn()
                ? 
                <>
                    <Typography component="h1" variant="h3">Welcome, {sessionStorage.getItem("username")}!</Typography>
                    {/*{isAdmin() && <ScootersList/>}*/}
                </>
                : <Login />
            }
        </>
    )
}

export default Home;