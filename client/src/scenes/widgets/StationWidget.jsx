import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStation } from "state";
import { useNavigate } from "react-router-dom";

const StationWidget = ({
    stationId,
    name,
    address,
    prices,
    reviews,
}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    const { palette } = useTheme();
    const main = palette.primary.main
    const mainBackground = palette.neutral.light
    const mainMedium = palette.neutral.medium

    const currentPrice = () => {
        if (prices.length === 0) return parseFloat(0).toFixed(2);
        return parseFloat(prices[prices.length - 1].price).toFixed(2);
    };

    // calculate average review and display it as a star rating
    const averageReview = () => {
        if (reviews.length === 0) return 0;
        let total = 0;
        reviews.forEach((review) => {
            total += review.rating;
        });
        return parseFloat(total / reviews.length);
    };


    // create a function that takes in a number and draw that many filled stars and the rest empty
    const drawStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} color={main} />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} color={mainMedium} />);
            }
        }
        return stars;
    };


    return (
        <WidgetWrapper

            sx={{
                "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "mainBackground",
                },
                backgroundColor: "mainMedium",
            }}
            onClick={() => {
                navigate(`/station/${stationId}`);
            }}
            maxWidth="100%"
            backgroundColor={mainBackground}
        >
            <FlexBetween
                padding="2rem"
                alignItems="center"
                backgroundColor={mainBackground}
            >
                <Box>
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 1.5rem, 2rem)"
                        color={main}
                    >
                        {name}
                    </Typography>
                    <Typography
                        fontSize="clamp(1rem, 1.5rem, 1.75rem)"
                        color={main}
                    >
                        {address}
                    </Typography>
                </Box>

            </FlexBetween>

            <Divider />

            <FlexBetween
                padding="2rem"
                alignItems="center"
                backgroundColor={mainBackground}
            >
                <Box>
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 1.5rem, 2rem)"
                        color={main}
                    >
                        Current Price
                    </Typography>
                    <Typography
                        fontSize="clamp(1rem, 1.5rem, 1.75rem)"
                        color={main}
                    >
                        ${currentPrice()}
                    </Typography>
                </Box>

                <Box>
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 1.5rem, 2rem)"
                        color={main}
                    >
                        Average Review
                    </Typography>
                    <Typography

                        fontSize="clamp(1rem, 1.5rem, 1.75rem)"
                    >
                        {drawStars(averageReview())}
                    </Typography>

                </Box>

            </FlexBetween>

        </WidgetWrapper >
    )
}

export default StationWidget;