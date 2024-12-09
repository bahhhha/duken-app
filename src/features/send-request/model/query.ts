import { $cart } from "@/features/product/add-to-cart/model";
import { createQuery } from "@farfetched/core";

const fetchSendRequest = createQuery({
  name: "sendRequest",
  async handler(data) {
    const formattedData = {
      name: data.name,
      phone: data.phoneNumber,
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
