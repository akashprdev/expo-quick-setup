/* ============================
   Request / Response Types
============================ */

import { BaseResponse } from '@/services/@types/types';
import { api } from '@/services/axiosConfig';
import { useMutation } from '@tanstack/react-query';

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
  fcmtoken: string;
  device_type: string;
  ip_address: string;
  user_agent: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  user_name: string;
  phone: string;
  phone_prefix: string;
  dob: string;
  referred_by_code: string | null;
  image: string;
  is_signup_complete?: boolean;
  is_category_selected?: boolean;
}

export interface FollowedCategory {
  catalog_category_id: string;
  name: string;
  image: string;
  description: string;
  url_key: string;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
}

export interface FollowedUser {
  id: string;
  name: string;
  email: string;
  phone_prefix: string;
  phone: string;
  dob: string;
  image: string;
  referral_code: string;
  referred_by_code: string | null;
  user_name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiData {
  decryptedPhone: string;
  is_signup_complete: boolean;
  is_category_selected: boolean;
  is_followers_selected: boolean;
  user_details: User;
  followed_categories_details: FollowedCategory[];
  followed_user_details: FollowedUser[];
  followed_brand_details: any[];
}

type VerifyOtpResponse = BaseResponse<ApiData>;

type VerifyOtpMutationArgs = {
  payload: VerifyOtpRequest;
};

const verifyOtpAction = async ({ payload }: VerifyOtpMutationArgs): Promise<VerifyOtpResponse> => {
  const response = await api.post<VerifyOtpResponse>('/user/auth/otp/verification', payload, {
    withCredentials: true,
    headers: {
      'User-Agent': payload.user_agent,
    },
  });

  return response.data;
};

export const useVerifyOtpMutation = () =>
  useMutation({
    mutationFn: verifyOtpAction,
  });
