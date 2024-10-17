import React from "react";
import PropTypes from "prop-types";
import { Carousel } from "@mantine/carousel";
import { Box, Button, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";

const CarouselItem = ({ backgroundImg, title }) => {
  const matches = useMediaQuery("(max-width: 960px)");

  return (
    <Carousel.Slide
      style={{
        backgroundImage: backgroundImg,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div style={{ marginTop: matches ? "200px" : "270px" }}>
        {title}

        <Box sx={{ textAlign: "center", position: "relative" }}>
          <Box
            style={{
              width: "50%",
              position: "relative",
              left: "25%",
              right: "25%",
            }}
          >
            <Divider size="md" my="xl" color="red" />
          </Box>

          <Button
            style={{
              background: "#FF3F4B",
              width: "150px",
              height: "50px",
              borderRadius: "30px",
            }}
            component={Link}
            to="/sign"
          >
            Sign Up
          </Button>
        </Box>
      </div>
      ;
    </Carousel.Slide>
  );
};

CarouselItem.propTypes = {
  backgroundImg: PropTypes.string.isRequired,
  title: PropTypes.object.isRequired,
};

export default CarouselItem;
