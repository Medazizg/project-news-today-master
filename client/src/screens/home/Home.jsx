import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import PostsList from "../PostList";
import { Box, Container } from "@mantine/core";
import Page404 from "../pageNotfound/Page404";
import { isCategoryValid } from "../../utils/category";

const Home = () => {
  const { category } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const limit = 10;

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1, limit: 10 });
      setPage(1);
    } else {
      setPage(parseInt(searchParams.get("page")));
    }
  }, [setSearchParams, searchParams, category]);

  const { isLoading, isError, data, error } = useQuery(
    [`news_${category}`, page],
    async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/news/${category}?page=${page}&limit=${limit}`
      );
      return data;
    }
  );

  if (!isCategoryValid(category)) {
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
          <Page404 />
        </Box>
      </Container>
    );
  }

  return (
    <>
      <PostsList
        category={category}
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={data}
        setPage={setPage}
        page={page}
        setSearchParams={setSearchParams}
      />
    </>
  );
};

export default Home;
