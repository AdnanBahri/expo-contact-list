import { Client } from "../api/Client";

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getAllContacts = async (page = 1) => {
  const query = `contacts?page=${page}`;
  const response = await Client.get(query);
  const data = await response?.data?.data;
  // console.log(data);

  if (data.length > page) {
    return data.concat(await getAllContacts(page + 1));
  } else {
    return data;
  }
};
