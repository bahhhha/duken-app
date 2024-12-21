import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Card, Spin } from "antd";
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
    validateOnBlur: false,
    validateOnChange: false,
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
      <Card className="h-full flex items-center justify-center shadow-md">
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <Card className="p-2 h-full">
      <form onSubmit={formik.handleSubmit} className="space-y-6 h-full">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              label="Имя"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваше имя"
              name="firstName"
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
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваша фамилия"
              name="lastName"
            />
            {formik.errors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваш email"
              name="email"
              type="email"
            />
            {formik.errors.email && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <Input
              label="Номер телефона"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваш номер телефона"
              name="phone"
              type="tel"
            />
            {formik.errors.phone && (
              <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
            )}
          </div>
        </div>
        <div>
          <Input
            label="Адрес"
            value={formik.values.streetAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Улица"
            name="streetAddress"
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
              value={formik.values.houseNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="№"
              name="houseNumber"
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
              value={formik.values.apartmentNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="№"
              name="apartmentNumber"
            />
          </div>
          <div>
            <Input
              label="Этаж"
              value={formik.values.floor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="№"
              name="floor"
            />
          </div>
        </div>

        <div>
          <Textarea
            label="Комментарии"
            value={formik.values.comments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ваши комментарии"
            name="comments"
          />
        </div>

        <div className="w-full flex justify-end">
          <div className="w-24">
            <Button
              type="primary"
              htmlType="submit"
              disabled={formik.isSubmitting}
            >
              Отправить
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default RequestForm;
