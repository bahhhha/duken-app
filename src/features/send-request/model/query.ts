import { $cart } from "@/features/product/add-to-cart/model";
import { createQuery } from "@farfetched/core";

const fetchSendRequest = createQuery({
  name: "sendRequest",
  async handler(data) {
    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phoneNumber,
      address: {
        street: data.streetAddress,
        house: data.houseNumber,
        apartment: data.apartmentNumber,
        floor: data.floor,
      },
      message: data.message,
      cart: $cart.getState(),
    };

    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error(`Error sending request: ${response.statusText}`);
    }

    return await response.json();
  },
});

export { fetchSendRequest };
