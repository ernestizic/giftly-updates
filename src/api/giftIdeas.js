const { default: axios } = require("axios");
const { base_url_vendors } = require("utils/utils");

export const getGiftIdeas = async (page, filters) => {
  let categoryParam = "";

  if (filters) {
    categoryParam = `&category=${filters.categoryId}`
  }

  try {
    const res = await axios.get(`${base_url_vendors}/market?page=${page}${categoryParam}`);

    if (res.data.status === true) {
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getProductCategories = async (page) => {
  try {
    const res = await axios.get(
      `${base_url_vendors}/market/category?page=${page}`
    );

    if (res.data.status === true) {
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};
