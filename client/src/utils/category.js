export const categories = [
  "sports",
  "business",
  "technology",
  "science",
  "health",
  "entertainment",
  "latest",
];

  export const isCategoryValid = (category) => {
    const categoryValue = categories.find((cat) => cat === category);
    return categoryValue ? true : false;
  };
   