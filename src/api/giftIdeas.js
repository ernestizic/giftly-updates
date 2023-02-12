const { default: axios } = require("axios");
const { base_url_vendors } = require("utils/utils");

export const getGiftIdeas = async (query, page, filters) => {
  let categoryParam = "";

  if (filters) {
    categoryParam = `&category=${filters.categoryId}`
  }
  
  let url = `${base_url_vendors}/market?page=${page}${categoryParam}`
  if(query) {
    url = `${base_url_vendors}/market?page=${page}&search=${query}`
  }
  
  
  try {
    const res = await axios.get(url);

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
