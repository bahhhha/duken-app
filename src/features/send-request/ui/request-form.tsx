import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Spin, Divider } from "antd";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useUnit } from "effector-react";
import { submitRequest } from "../model";
import { fetchSendRequest } from "../model/query";

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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="№"
            />
          </div>
          <div>
            <Input
              label="Этаж"
              name="floor"
              value={formik.values.floor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
