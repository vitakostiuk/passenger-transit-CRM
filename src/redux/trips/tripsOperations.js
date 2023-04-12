import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_RTDB_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const createTrip = createAsyncThunk(
  'auth/createTrip',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/trips.json`, body);
      toast.success('User added succeffuly');

      return { id: data.name, ...body };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export { createTrip };
