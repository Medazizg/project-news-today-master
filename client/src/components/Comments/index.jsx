import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import api from "../../utils/api";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Text,
  Textarea,
} from "@mantine/core";
import { IconMessageCircle, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function Comment({
  comments,
  isLoading,
  id,
  category,
  source = "list",
  isFromLatest,
}) {
  const numComments = comments ? comments?.length : 0;
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const navigate = useNavigate();

  const { isLoading: isCommentAdding, mutate: addComment } = useMutation(
    (commentText) =>
      api.post(`http://localhost:5000/api/news/${category}/${id}/addcomment`, {
        text: commentText,
      }),
    {
      onSuccess: () => {
        if (source === "post") queryClient.invalidateQueries(`post_${id}`);
        else if (source === "list")
          queryClient.invalidateQueries(
            `news_${isFromLatest ? "latest" : category}`
          );
      },
      onError: (error, variables, context) => {
        console.log({ error });
        if (error?.response?.data?.message === "Beware, you are unauthorized") {
          navigate("/sign");
        }
      },
    }
  );

  const {
    isLoading: isCommentDeleting,
    mutate: deleteComment,
    variables,
  } = useMutation(
    (commentId) =>
      api.delete(
        `http://localhost:5000/api/news/${category}/${id}/deletecomment/${commentId}`
      ),
    {
      onSuccess: () => {
        if (source === "post") queryClient.invalidateQueries(`post_${id}`);
        else if (source === "list")
          queryClient.invalidateQueries(
            `news_${isFromLatest ? "latest" : category}`
          );
      },
      onError: (error, variables, context) => {
        console.log({ error });
        if (error?.response?.data?.message === "Beware, you are unauthorized") {
          navigate("/sign");
        }
      },
    }
  );

  const handleCommentSubmit = () => {
    addComment(commentText);
    setCommentText("");
  };
  const handleCommentDelete = (commentId) => {
    if (profile) {
      deleteComment(commentId);
    }
  };

  return (
    <>
      <Group
        position="center"
        sx={{
          marginLeft: -15,
          marginRight: -15,
          marginTop: 10,
        }}
      >
        <Button
          size="xs"
          variant="#1877f2"
          color="#1877f2"
          radius="sm"
          style={{
            background: "none",
            border: "none",
            color: "#f21856",
            marginBottom: "0.5rem",
          }}
        >
          <IconMessageCircle size={18} />
          <span style={{ marginLeft: 5 }}>
            {numComments} {numComments === 1 ? "Comment" : "Comments"}
          </span>
        </Button>
      </Group>

      <Box style={{ display: "flex" }}>
        <Textarea
          placeholder="Your comment"
          labelFontSize="sm"
          radius="lg"
          size="xs"
          withAsterisk
          style={{ marginBottom: "0.8rem", marginRight: "0.4rem", flex: 1 }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <Button
          size="xs"
          variant="red"
          color="red"
          radius="sm"
          style={{ marginBottom: "0.4rem" }}
          disabled={isCommentAdding || !commentText}
          onClick={handleCommentSubmit}
        >
          {isCommentAdding ? "Adding..." : "Save"}
        </Button>
      </Box>
      <Box style={{ marginTop: 40, paddingRight: 10 }}>
        <Box maxheight={300} position="relative">
          <LoadingOverlay
            visible={isCommentDeleting || isCommentAdding || isLoading}
            overlayBlur={2}
          />
        </Box>
        {comments &&
          comments.map((comment) => (
            <Grid key={comment._id} sx={{ marginBottom: 3 }}>
              <Grid.Col span={2}>
                <Avatar name={comment.name} size={32} />
              </Grid.Col>
              <Grid.Col span={8}>
                <Text fz="sm" fw={500} c="red" sx={{ marginBottom: 1 }}>
                  <strong>{comment.name}</strong>
                </Text>
                <Text fz="sm" c="dimmed">
                  {comment.text}
                </Text>
              </Grid.Col>
              {profile.id === comment.user && (
                <Grid.Col span={2} sx={{ textAlign: "right" }}>
                  <Button
                    variant="link"
                    size="xs"
                    color="red"
                    radius="sm"
                    disabled={isCommentDeleting && variables === comment._id}
                    onClick={() =>
                      handleCommentDelete(comment._id, comment.user)
                    }
                  >
                    <IconTrash size={11} style={{ marginRight: 2 }} />
                  </Button>
                </Grid.Col>
              )}
            </Grid>
          ))}
      </Box>
    </>
  );
}

export default Comment;
