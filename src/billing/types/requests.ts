import { Customer } from "./objects";

export type BaseResponse = {
  meta: {
    request_id: string;
  };
};

export type GetCustomerResponse = BaseResponse & {
  data: Customer;
};