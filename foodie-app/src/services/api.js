import axios from "axios";

const BASE_URL = "http://192.168.31.129:4000";

export const getFoodList = async () => {
  const res = await axios.get(`${BASE_URL}/api/food/list`);
  return res.data;
};
