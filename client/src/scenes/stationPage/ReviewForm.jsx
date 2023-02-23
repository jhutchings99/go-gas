import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const URL = "http://localhost:3001";

const reviewSchema = yup.object().shape({
    review: yup.string().required("Required"),
    rating: yup.string().required("Required"),
});

const initialValuesReview = {
    review: "",
    rating: "",
};

const ReviewForm = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const stationId = window.location.pathname.split("/")[2];
    const userId = useSelector((state) => state.user._id);

    const addReview = async (values, onSubmitProps) => {
        const reviewResponse = await fetch(`${URL}/stations/${stationId}/reviews/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const savedReview = await reviewResponse.json();
        onSubmitProps.resetForm();
        // navigate(`/home`);
        // navigate`/station/${stationId}`
    }

    const handleFormSubmit = (values, onSubmitProps) => {
        addReview(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesReview}
            validationSchema={reviewSchema}
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
                        gap="30px"
                        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 5" }
                        }}
                    >

                        <TextField
                            label="Review"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.review}
                            name="review"
                            error={Boolean(touched.review) && Boolean(errors.review)}
                            helperText={touched.review && errors.review}
                            sx={{ gridColumn: "span 3" }}
                        />

                        <TextField
                            label="Rating"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.rating}
                            name="rating"
                            error={Boolean(touched.rating) && Boolean(errors.rating)}
                            helperText={touched.rating && errors.rating}
                            sx={{ gridColumn: "span 2" }}
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 5 } }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            Submit Review
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default ReviewForm;