import axios from "axios";

axios.defaults.baseURL = "https://61e0225d0f3bdb0017934de0.mockapi.io/api/v1";

const path = {
  CONTACTS: "/contacts",
};

export const addContactApi = async (contact) => {
  try {
    const { data } = await axios.post(path.CONTACTS, contact);

    return data;
  } catch (err) {
    throw err.message;
  }
};

export const getContactsApi = async () => {
  try {
    const { data } = await axios.get(path.CONTACTS);

    return data;
  } catch (err) {
    throw err.message;
  }
};

export const removeContactApi = async (id) => {
  try {
    await axios.delete(path.CONTACTS + "/" + id);

    return id;
  } catch (err) {
    throw err.message;
  }
};

export const editContactApi = async (props) => {
  const { id } = props;
  try {
    const { data } = await axios.put(path.CONTACTS + "/" + id, props);
    return data;
  } catch (err) {
    throw err.message;
  }
};
