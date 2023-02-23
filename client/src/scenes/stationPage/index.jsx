import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Divider, Typography, useTheme, useMediaQuery } from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Navbar from "scenes/navbar";
import React from 'react';
import Map from "components/Map"
import PriceForm from "scenes/stationPage/PriceForm";
import ReviewForm from "scenes/stationPage/ReviewForm";
import WidgetWrapper from "components/WidgetWrapper";

const StationPage = () => {
    const stations = useSelector((state) => state.stations);
    const stationId = window.location.pathname.split("/")[2];

    const currentStation = stations.find((station) => station._id === stationId);

    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    const { palette } = useTheme();
    const main = palette.primary.main
    const mainBackground = palette.neutral.light
    const mainMedium = palette.neutral.medium

    const getAllPrices = () => {
        let allPrices = [];
        let currentStationPrices = currentStation.prices;
        for (let i = 0; i < currentStationPrices.length; i++) {
            allPrices.push(parseFloat(currentStationPrices[i].price));
        }
        return allPrices;
    }

    const currentPrice = () => {
        if (currentStation.prices.length === 0) return parseFloat(0).toFixed(2);
        return parseFloat(currentStation.prices[currentStation.prices.length - 1].price).toFixed(2);
    };

    const averageReview = () => {
        if (currentStation.reviews.length === 0) return 0;
        let total = 0;
        currentStation.reviews.forEach((review) => {
            total += review.rating;
        });
        return parseFloat(total / currentStation.reviews.length);
    };

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
        <>
        <Navbar />
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
        <WidgetWrapper
            sx={{
                backgroundColor: mainBackground,
                width: "60%",
                maxHeight: "85vh",
                m: "2rem 1rem",
                overflowY: "auto",
            }}
        >
            <WidgetWrapper
                sx={{
                    width: "100%",
                    height: "100%",
                    p: "2rem 1rem",
                }}
            >   
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >   
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            fontSize="4rem"
                            fontWeight="bold"
                            color={main}
                        >
                            {currentStation.name}
                        </Typography>
                        <Typography
                            fontSize="1.5rem"
                        >
                            {currentStation.address}
                        </Typography>
                    </Box>
                    <Box
                        height="100%"
                        width="80%"
                    >
                        <Sparklines height={30} width={150} data={getAllPrices()} limit={5}>
                            <SparklinesLine color={main} />
                        </Sparklines>
                    </Box>
                    <Typography
                        fontSize="1.5rem"
                        paddingTop="2rem"
                    >
                        Current Price ${currentPrice()}
                    </Typography>
                    <PriceForm />
                </Box>

                <Divider />

                {/* REVIEW SECTION */}
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    paddingTop="2rem"
                >
                    <Typography
                        fontSize="3rem"
                        fontWeight="bold"
                        color={main}
                    >
                        Reviews
                    </Typography>
                    <Typography
                        fontSize="1rem"
                    >
                        {currentStation.reviews.length} reviews
                    </Typography>
                    <Typography
                        fontSize="2rem"
                        paddingTop="1rem"
                        paddingBottom="2rem"
                    >
                        {drawStars(averageReview())}
                    </Typography>

                    <ReviewForm />
                    
                    {currentStation.reviews.map((review) => (
                        <WidgetWrapper
                            key={review.reviewId}
                            sx={{
                                width: "100%",
                                height: "100%",
                                p: "1rem 1rem",
                                m: "0.5rem 0",
                                backgroundColor: mainBackground,
                            }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                            >
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        fontSize="1.5rem"
                                    >
                                        {review.user.username}
                                    </Typography>
                                    <Typography
                                    fontSize="1rem"
                                    >   
                                    {review.time.split("T")[0]}
                                </Typography>
                                </Box>
                                <Typography
                                        fontSize="1rem"
                                >
                                    {drawStars(review.rating)} 
                                </Typography>
                                <Divider />
                                <Typography
                                    fontSize="1.5rem"
                                    paddingTop="1rem"
                                >
                                    {review.review}
                                </Typography>

                            </Box>
                        </WidgetWrapper>
                    ))}
                </Box>
            </WidgetWrapper>
        </WidgetWrapper>
        <Map />
        </div>
        </>
    );
};

export default StationPage;