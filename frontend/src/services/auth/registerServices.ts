import apiClient from '../api/api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const registerService = {
  async register(userData: RegisterData) {
    const response = await apiClient.post('/register ', userData);
    return response.data;
  },
};

export default registerService;
