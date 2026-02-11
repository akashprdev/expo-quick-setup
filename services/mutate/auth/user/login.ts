import { api } from '@/services/axiosConfig';
import { useMutation } from '@tanstack/react-query';

interface SignInRequest {
  phone: string;
  phone_prefix: string;
}

const signInAction = async ({ phone, phone_prefix }: SignInRequest) => {
  const response = await api.post('/user/auth/otp', {
    phone,
    phone_prefix,
  });
  return response.data;
};

export const useLogInMutation = () =>
  useMutation({
    mutationFn: signInAction,
  });
