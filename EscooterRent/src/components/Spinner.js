import { Backdrop, CircularProgress } from "@mui/material"

const Spinner = ({ isOpen }) => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
};

export default Spinner;