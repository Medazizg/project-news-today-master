import React from "react";
import { Alert, Box, Container, Group, Pagination, Text } from "@mantine/core";
import Post from "../../screens/Post";
import {
  IconAugmentedReality2,
  IconBallFootball,
  IconPlant,
  IconActivity,
  IconBusinessplan,
  IconDeviceTv,
  IconAlertCircle,
} from "@tabler/icons-react";
import LoadingPage from "../../screens/LoadingPage/LoadingPage";
import { categories } from "../../utils/category";
import ScrollToTop from "react-scroll-to-top";
import { Link } from "react-router-dom";

const PostsList = ({
  category,
  isLoading,
  isError,
  error,
  data,
  setPage,
  page,
  setSearchParams,
}) => {
  if (isLoading) {
    return (
      <Container size="md" px="xl">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <LoadingPage />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  const totalPages = data?.[category]?.totalPages || 1;
  if (isNaN(page) || page < 1 || page > totalPages) {
    return (
      <Container size="md" px="xl">
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <Alert
            icon={<IconAlertCircle size="3rem" />}
            title="Bummer!"
            color="red"
            variant="filled"
          >
            Invalid page number
          </Alert>
        </Box>
      </Container>
    );
  }

  const categoryIcons = {
    sports: IconBallFootball,
    business: IconBusinessplan,
    technology: IconAugmentedReality2,
    science: IconPlant,
    health: IconActivity,
    entertainment: IconDeviceTv,
  };

  if (category === "latest") {
    return (
      <Container size="md" px="xl">
        {categories.map((categoryItem) => {
          if (!data?.[categoryItem]) return null;
          const IconComponent = categoryIcons[categoryItem];
          return (
            <Box key={categoryItem}>
              <Group sx={{ marginBottom: 10, paddingTop: 20 }}>
                <IconComponent size="3rem" stroke={0.9} color="red" />
                <Link
                  to={`/${categoryItem}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Text fz="xl">{categoryItem}</Text>
                </Link>
              </Group>
              {data?.[categoryItem]?.data?.map((post, index) => (
                <Post
                  key={index}
                  post={post}
                  category={categoryItem}
                  isFromLatest={true}
                />
              ))}
            </Box>
          );
        })}
      </Container>
    );
  }

  return (
    <Container size="md" px="xl">
      <Box>
        {data?.[category]?.data?.map((post, index) => (
          <Post
            key={index}
            post={post}
            category={category}
            isLoading={isLoading}
          />
        ))}
      </Box>

      <Box
        mt="lg"
        justifyContent="center"
        sx={{
          paddingTop: 20,
          marginBottom: 30,
        }}
      >
        <ScrollToTop smooth color="red" />
        <Pagination
          color="red"
          total={data?.[category]?.totalPages || 1}
          page={page}
          onChange={(pageNum) => {
            setSearchParams({ page: pageNum, limit: 10 });
            setPage(pageNum);
          }}
          radius="md"
          size="lg"
          position="center"
        />
      </Box>
    </Container>
  );
};

export default PostsList;
