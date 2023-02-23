import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const URL = "http://localhost:3001";

const priceSchema = yup.object().shape({
    price: yup.string().required("Required"),
});

const initialValuesPrice = {
    price: "",
};

const PriceForm = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const stationId = window.location.pathname.split("/")[2];
    const userId = useSelector((state) => state.user._id);

    // patch a new price for a station with this path /:stationId/prices/:userId
    const addPrice = async (values, onSubmitProps) => {
        const priceResponse = await fetch(`${URL}/stations/${stationId}/prices/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        priceResponse.json();
        onSubmitProps.resetForm();
        navigate(`/home`);
        setTimeout(() => {
            navigate(`/station/${stationId}`);
        }, 1);
    }

    const handleFormSubmit = (values, onSubmitProps) => {
        addPrice(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesPrice}
            validationSchema={priceSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        alignItems={"center"}
                        gap="30px"
                        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 5" }
                        }}
                    >

                        <TextField
                            label="New Price"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.price}
                            name="price"
                            error={Boolean(touched.price) && Boolean(errors.price)}
                            helperText={touched.price && errors.price}
                            sx={{ gridColumn: "span 3" }}
                        />
                        <Button
                            // fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                                gridColumn: "span 2"
                            }}
                        >
                            Submit Price
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default PriceForm;