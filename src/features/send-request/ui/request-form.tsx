import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Spin, Divider } from "antd";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useUnit } from "effector-react";
import { submitRequest } from "../model";
import { fetchSendRequest } from "../model/query";
import { useAnalytics } from "@/shared/hooks/useAnalytics";
import { $cart } from "@/features/product/add-to-cart/model";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  houseNumber: string;
  apartmentNumber?: string;
  floor?: string;
  comments?: string;
}

const RequestForm: React.FC = () => {
  const [sendRequest, requestStatus] = useUnit([
    submitRequest,
    fetchSendRequest.$status,
  ]);

  const { trackCheckoutStarted, trackCheckoutCompleted } = useAnalytics();
  const hasStartedRef = useRef(false);
  const cart = useUnit($cart);
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      houseNumber: "",
      apartmentNumber: "",
      floor: "",
      comments: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Требуется имя"),
      lastName: Yup.string().required("Требуется фамилия"),
      email: Yup.string()
        .email("Некорректный email адрес")
        .required("Требуется email"),
      phone: Yup.string().required("Требуется номер телефона"),
      streetAddress: Yup.string().required("Требуется адрес"),
      houseNumber: Yup.string().required("Требуется номер дома"),
    }),
    onSubmit: (values, { resetForm }) => {
      trackCheckoutCompleted(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phone,
          streetAddress: values.streetAddress,
          houseNumber: values.houseNumber,
          apartmentNumber: values.apartmentNumber,
          floor: values.floor,
          message: values.comments,
        },
        cart
      );

      sendRequest({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phone,
        streetAddress: values.streetAddress,
        houseNumber: values.houseNumber,
        apartmentNumber: values.apartmentNumber,
        floor: values.floor,
        message: values.comments,
      });
      resetForm();
    },
  });

  const handleFieldInteraction = (
    e:
      | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!hasStartedRef.current) {
      trackCheckoutStarted(e.target.name);
      hasStartedRef.current = true;
    }

    if (e.type === "blur") {
      formik.handleBlur(e);
    } else if (e.type === "change") {
      formik.handleChange(e);
    }
  };

  if (requestStatus === "pending") {
    return (
      <Card className="h-full flex items-center justify-center shadow-sm">
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-gray-100">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Имя"
              name="firstName"
              value={formik.values.firstName}
              onChange={handleFieldInteraction}
              onBlur={handleFieldInteraction}
              placeholder="Ваше имя"
            />
            {formik.errors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.firstName}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Фамилия"
              name="lastName"
              value={formik.values.lastName}
              onChange={handleFieldInteraction}
              onBlur={handleFieldInteraction}
              placeholder="Ваша фамилия"
            />
            {formik.errors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>

        <Divider />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={handleFieldInteraction}
              onBlur={handleFieldInteraction}
              placeholder="Ваш email"
            />
            {formik.errors.email && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <Input
              label="Номер телефона"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={handleFieldInteraction}
              onBlur={handleFieldInteraction}
              placeholder="Ваш номер телефона"
            />
            {formik.errors.phone && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        <Divider />

        <div>
          <Input
            label="Улица"
            name="streetAddress"
            value={formik.values.streetAddress}
            onChange={handleFieldInteraction}
            onBlur={handleFieldInteraction}
            placeholder="Улица"
          />
          {formik.errors.streetAddress && (
            <p className="mt-1 text-xs text-red-500">
              {formik.errors.streetAddress}
            </p>
          )}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <Input
              label="Дом"
              name="houseNumber"
              value={formik.values.houseNumber}
              onChange={handleFieldInteraction}
              onBlur={handleFieldInteraction}
              placeholder="№"
            />
            {formik.errors.houseNumber && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.houseNumber}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Квартира"
              name="apartmentNumber"
              value={formik.values.apartmentNumber}
              onChange={handleFieldInteraction}
              onBlur={handleFieldInteraction}
              placeholder="№"
            />
          </div>
          <div>
            <Input
              label="Этаж"
              name="floor"
              value={formik.values.floor}
              onChange={handleFieldInteraction}
              onBlur={handleFieldInteraction}
              placeholder="№"
            />
          </div>
        </div>

        <Divider />

        <div>
          <Textarea
            label="Комментарии"
            name="comments"
            value={formik.values.comments}
            onChange={handleFieldInteraction}
            onBlur={handleFieldInteraction}
            placeholder="Ваши комментарии (при необходимости)"
          />
        </div>

        <div className="w-full flex justify-end mt-4">
          <Button
            type="primary"
            htmlType="submit"
            disabled={formik.isSubmitting}
            className="px-6"
          >
            Отправить
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RequestForm;
