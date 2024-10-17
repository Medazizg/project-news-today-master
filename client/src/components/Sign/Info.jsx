import {
  BackgroundImage,
  Box,
  Center,
  createStyles,
  Text,
  MediaQuery,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  textContainer: {
    height: "100vh",
    paddingLeft: 40,
    paddingRight: 40,
    color: '#ffffff'
  },
}));

const Info = () => {
  const { classes } = useStyles();
  return (
    <MediaQuery>
      <Box>
        <BackgroundImage
          src="https://images.pexels.com/photos/1752724/pexels-photo-1752724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          sx={{ height: "100vh" }}
        >
          <Center className={classes.textContainer}>
            <Text size="68px">
              From art to politics, <br />
              <Text span c="#FF3F4B" inherit>
                anything
              </Text>
              in news
            </Text>
          </Center>
        </BackgroundImage>
      </Box>
    </MediaQuery>
  );
};

export default Info;
