import posthog from "posthog-js";
import { Product } from "@/shared/interfaces/product";
import { SubmitData } from "@/features/send-request/model";
import { CartItem } from "@/features/product/add-to-cart/model";

export const useAnalytics = () => {
  const trackProductView = (product: Product) => {
    posthog.capture("product_viewed", {
      product_id: product.id,
      name: product.name,
      price: product.price,
      hot_price: product.hotPrice,
      categories: [
        product.category1,
        product.category2,
        product.category3,
        product.category4,
      ].filter(Boolean),
      is_recommended: product.recommended,
      quantity_available: product.quantity,
    });
  };

  const trackAddToCart = (product: Product, quantity: number) => {
    posthog.capture("add_to_cart", {
      product_id: product.id,
      name: product.name,
      quantity,
      price: product.price,
      hot_price: product.hotPrice,
    });
  };

  const trackRemoveFromCart = (product: Product, quantity: number) => {
    posthog.capture("remove_from_cart", {
      product_id: product.id,
      name: product.name,
      quantity,
    });
  };

  const trackCheckout = (orderData: SubmitData) => {
    posthog.capture("checkout_completed", {
      ...orderData,
      timestamp: new Date().toISOString(),
    });
  };

  const trackFavoriteToggle = (product: Product, isFavorite: boolean) => {
    posthog.capture("favorite_toggled", {
      product_id: product.id,
      name: product.name,
      is_favorite: isFavorite,
    });
  };

  const trackCheckoutOpened = (cartTotal: number, itemCount: number) => {
    posthog.capture("checkout_opened", {
      cart_total: cartTotal,
      item_count: itemCount,
      timestamp: new Date().toISOString(),
    });
  };

  const trackCatalogueOpened = () => {
    posthog.capture("catalogue_opened", {
      timestamp: new Date().toISOString(),
    });
  };

  const trackCartOpened = () => {
    posthog.capture("cart_opened", {
      timestamp: new Date().toISOString(),
    });
  };

  const trackCheckoutStarted = (firstInteractionField: string) => {
    posthog.capture("checkout_started", {
      first_interaction_field: firstInteractionField,
      timestamp: new Date().toISOString(),
    });
  };

  const trackCheckoutCompleted = (formData: SubmitData, cart: CartItem[]) => {
    posthog.capture("checkout_completed", {
      order_details: {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
        },
        shipping_address: {
          street: formData.streetAddress,
          house: formData.houseNumber,
          apartment: formData.apartmentNumber,
          floor: formData.floor,
        },
        has_comments: Boolean(formData.message),
      },
      cart_info: cart,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackProductView,
    trackAddToCart,
    trackRemoveFromCart,
    trackCheckout,
    trackFavoriteToggle,
    trackCheckoutOpened,
    trackCatalogueOpened,
    trackCartOpened,
    trackCheckoutStarted,
    trackCheckoutCompleted,
  };
};
