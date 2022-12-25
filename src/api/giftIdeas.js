const { default: axios } = require("axios");
const { base_url_vendors } = require("utils/utils");

export const getGiftIdeas = async (page) => {
  try {
    const res = await axios.get(`${base_url_vendors}/market?page=${page}`);

    if (res.data.status === true) {
      return res;
    }
  } catch (e) {
    console.log(e)
  }
};