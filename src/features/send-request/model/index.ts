import { createEvent, sample } from "effector";
import { fetchSendRequest } from "./query";
import { resetCart } from "@/features/product/add-to-cart/model";

export interface SubmitData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  houseNumber: string;
  apartmentNumber?: string;
  floor?: string;
  message?: string;
}

const submitRequest = createEvent<SubmitData>();

sample({
  source: submitRequest,
  target: fetchSendRequest.start,
});

sample({
  clock: fetchSendRequest.finished.success,
  target: resetCart,
});

export { submitRequest };
