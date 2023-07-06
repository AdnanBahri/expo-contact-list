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

export const sortContacts = (contacts) => {
  let array = [];
  let code = "A".charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    let currChar = String.fromCharCode(code + i);
    let obj = {
      title: currChar,
    };
    // console.log(`Filter List for the Letter: ${currChar}`);
    // contacts.map((item) => console.log(item.nom[0]));
    let temp = contacts.filter((item) => {
      return item.nom[0] === currChar;
    });
    if (temp.length > 0) {
      temp.sort((c1, c2) => c1.nom.localeCompare(c2.nom));
      obj.data = temp;
      array.push(obj);
    }
  }
  return array;
};

export const getDetails = async (cle) => {
  const response = await Client.get(`contacts/${cle}`);
  const { contact, entreprise } = await response?.data;
  const { e_mail, telephone_mobile, telephone_fixe } = contact;
  const { nom } = entreprise;
  return { e_mail, telephone_mobile, telephone_fixe, entreprise: nom };
};
