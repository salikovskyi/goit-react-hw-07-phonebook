import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addContactApi,
  removeContactApi,
  editContactApi,
  getContactsApi,
} from '../utils/mockAPI'

export const addContact = createAsyncThunk(
    "addContact",
    async (contact, { rejectWithValue }) => {
      try {
        const respContact = await addContactApi(contact);
        return respContact;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const getContacts = createAsyncThunk(
    "getContacts",
    async (_, { rejectWithValue }) => {
      try {
        const respContacts = await getContactsApi();
        return respContacts;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const removeContact = createAsyncThunk(
    "removeContact",
    async (id, { rejectWithValue }) => {
      try {
        const respId = await removeContactApi(id);
        return respId;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const editContact = createAsyncThunk(
    "editContact",
    async ({ name, phone, id }, { rejectWithValue }) => {
      try {
        const contactForEdit = await editContactApi({ name, phone, id });
        return { ...contactForEdit, id };
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );