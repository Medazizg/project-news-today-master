export const getAudibleText = (post) => {
  const { title, content, description } = post;

  const titleTxt = title ? `title: ${title}` : "";
  const contentTxt = content ? `content: ${content}` : "";
  const descriptionText = description ? `description: ${description}` : "";

  return titleTxt + " " + contentTxt + " " + descriptionText;
};

