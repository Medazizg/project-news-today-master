import React from "react";
import { Carousel } from "@mantine/carousel";
import { Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CarouselItem from "./CarouselItem";

function CarouselPage() {
  const matches = useMediaQuery("(max-width: 960px)");

  return (
    <Carousel mx="auto" controlSize={38} height={"100vh "}>
      <CarouselItem
        backgroundImg="url('https://images.pexels.com/photos/3944425/pexels-photo-3944425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
        title={
          <Title
            ta="center"
            size={matches ? "50px" : "60px"}
            span
            c="white"
            inherit
          >
            <Text span c="#FF3F4B" inherit>
              Dive
            </Text>
            Into The Depths
          </Title>
        }
      />
      <CarouselItem
        backgroundImg="url('https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
        title={
          <Title
            ta="center"
            size={matches ? "50px" : "60px"}
            span
            c="white"
            inherit
          >
            <Text span c="#FF3F4B" inherit>
              Dive
            </Text>
            Into The Depths
          </Title>
        }
      />

      <CarouselItem
        backgroundImg="url('https://images.pexels.com/photos/935979/pexels-photo-935979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
        title={
          <Title
            ta="center"
            size={matches ? "50px" : "60px"}
            span
            c="white"
            inherit
          >
            <Text span c="#FF3F4B" inherit>
              Dive
            </Text>
            Into The Depths
          </Title>
        }
      />
    </Carousel>
  );
}

export default CarouselPage;
