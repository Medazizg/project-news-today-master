import React from "react";
import { Box, Image, Loader } from "@mantine/core";

function LoadingPage() {
  return (
    <Box>
      <Box
        style={{
          width: 200,
          textAlign: "center",
        }}
      >
        <Image
          src="https://scontent.ftun14-1.fna.fbcdn.net/v/t1.15752-9/331660205_725855115713634_6851562038351684894_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=SXd1T9N9slsAX8JM7z1&_nc_ht=scontent.ftun14-1.fna&oh=03_AdRUx6uac8U7zlYRqFftpIKqJxtok4wQ1mvWv6JH6Mlk7Q&oe=6451A832"
          alt="Random unsplash image"
        />
        <Loader
          color="red"
          variant="dots"
          sx={{ position: "relative", top: -50 }}
        />
      </Box>
    </Box>
  );
}

export default LoadingPage;
