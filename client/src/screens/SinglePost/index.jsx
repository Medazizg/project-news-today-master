import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  Card,
  Text,
  Image,
  Button,
  Container,
  Box,
  Tooltip,
} from "@mantine/core";
import { IconCaretLeft } from "@tabler/icons-react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Comment from "../../components/Comments";
import Page404 from "../pageNotfound/Page404";
import Like from "../../components/Like";

const SinglePost = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: post,
  } = useQuery(`post_${id}`, async () => {
    const { data } = await api.get(
      `http://localhost:5000/api/news/${category}/${id}`
    );
    return data.post;
  });

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
    return <span>Error</span>;
  }

  if (!post) {
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
      <Container size="lg" px="xl">
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "90%",
            marginBottom: 10,
          }}
        >
          <Button
            variant="light"
            color="red"
            radius="sm"
            style={{
              background: "none",
              border: "none",
              color: "#f21856",
            }}
            onClick={() => navigate(-1)}
          >
            <IconCaretLeft size={35} />
          </Button>
          <Tooltip
            label={post.title}
            placement="top"
            gutter={6}
            transition="fade"
          >
            <Text
              color="black"
              fz="xl"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.title}
            </Text>
          </Tooltip>
        </Box>
        <Card shadow="sm" p="xs" radius="md" style={{ position: "relative" }}>
          {post.urlToImage && (
            <div style={{ position: "relative" }}>
              <Image
                src={post.urlToImage}
                alt={post.title}
                style={{ width: "100%", borderRadius: "md" }}
              />
            </div>
          )}

          <Tooltip
            label={post.title}
            placement="top"
            gutter={6}
            transition="fade"
            position="bottom-start"
          >
            <Text weight={635} color="black">
              {post.title}
            </Text>
          </Tooltip>

          <Text size="sm" weight={480}>
            {post.description}
          </Text>

          <Text size="sm" weight={480} c="dimmed">
            {post.content}
          </Text>

          <Like category={category} post={post} />

          <Comment
            isLoading={isLoading}
            comments={post?.comments}
            id={id}
            category={category}
            source="post"
          />
        </Card>
      </Container>
    </>
  );
};

export default SinglePost;
