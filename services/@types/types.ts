export type Option = {
  label: string;
  value: string;
  children?: Option[];
};

export interface BaseResponse<T> {
  message: string;
  status: string;
  data: T;
}
