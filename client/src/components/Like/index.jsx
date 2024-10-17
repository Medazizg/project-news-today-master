import { Button, Group } from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { isPostLiked } from "../../utils/post";

const Like = ({ category, post, id, source = "list", isFromLatest }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  console.log({ category });

  const { isLoading: isLikeLoading, mutate: likeMutate } = useMutation(
    () => {
      return api.post(
        `http://localhost:5000/api/news/${category}/${post._id}/like`,
        {}
      );
    },
    {
      // add onSuccess
      onSuccess: () => {
        if (source === "post") queryClient.invalidateQueries(`post_${id}`);
        else if (source === "list")
          queryClient.invalidateQueries(
            `news_${isFromLatest ? "latest" : category}`
          );
      },
    }
  );
  const { mutate: UnlikeMutate, isLoading: isUnlikeLoading } = useMutation(
    () => {
      return api.post(
        `http://localhost:5000/api/news/${category}/${post._id}/unlike`
      );
    },
    {
      // onSuccess
      onSuccess: () => {
        if (source === "post") queryClient.invalidateQueries(`post_${id}`);
        else if (source === "list")
          queryClient.invalidateQueries(
            `news_${isFromLatest ? "latest" : category}`
          );
      },
    }
  );

  return (
    <Group
      position="center"
      sx={{
        marginLeft: -15,
        marginRight: -15,
        marginTop: 10,
      }}
    >
      <Button
        variant="subtle"
        color={isPostLiked(post, profile?.id) ? "red" : "green"}
        radius="sm"
        disabled={isLikeLoading || isUnlikeLoading}
        sx={{
          marginRight: 10,
          backgroundColor: "none!important",
          ":disabled": {
            backgroundColor: "#fff!important",
          },
        }}
        onClick={() => {
          if (isPostLiked(post, profile?.id)) {
            UnlikeMutate(null, {
              onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries(`post_${post?._id}`);
              },
              onError: (error, variables, context) => {
                console.log({ error });
                if (
                  error?.response?.data?.message ===
                  "Beware, you are unauthorized"
                ) {
                  navigate("/sign");
                }
              },
            });
          } else {
            likeMutate(null, {
              onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries(`post_${post?._id}`);
              },
              onError: (error, variables, context) => {
                console.log({ error });
                if (
                  error?.response?.data?.message ===
                  "Beware, you are unauthorized"
                ) {
                  navigate("/sign");
                }
              },
            });
          }
        }}
      >
        {isPostLiked(post, profile?.id) ? (
          <>
            <IconThumbDown size={18} />
            <span style={{ marginLeft: 5 }}> {post.likes.length} Unlike</span>
          </>
        ) : (
          <>
            <IconThumbUp size={18} />
            <span style={{ marginLeft: 5 }}> {post.likes.length} Like</span>
          </>
        )}
      </Button>
    </Group>
  );
};

export default Like;
