export const isPostLiked = (post, userId) => {
    const { likes } = post
    if (!likes) return false
    const userLike = likes.find((like) => like.user = userId)
    return userLike ? true : false
}
export const isunPostLiked = (post, userId) => {
  const { unlikes } = post;
  if (!unlikes) return false;
  const userLike = unlikes.find((unlike) => (unlike.user = userId));
  return userLike ? false : true;
};