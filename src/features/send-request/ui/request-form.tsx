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
  name: string;
  phone: string;
  comments: string;
}

const RequestForm: React.FC = () => {
  const [sendRequest, requestStatus] = useUnit([
    submitRequest,
    fetchSendRequest.$status,
  ]);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      phone: "",
      comments: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      name: Yup.string().required("Требуется имя"),
      phone: Yup.string().required("Требуется номер телефона"),
    }),
    onSubmit: (values, { resetForm }) => {
      sendRequest({
        name: values.name,
        phoneNumber: values.phone,
        message: values.comments,
      });
      resetForm();
    },
  });

  if (requestStatus === "pending") {
    return (
      <Card className="h-[25rem] flex items-center justify-center shadow-md">
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <Card className="h-[25rem] shadow-md">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <Input
            label="Имя"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ваше имя"
            name="name"
          />
          {formik.errors.name && (
            <p className="mt-1 text-xs text-red-500">{formik.errors.name}</p>
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
        <div>
          <Textarea
            label="Комментарии"
            value={formik.values.comments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ваши комментарии"
            name="comments"
          />
          {formik.errors.comments && (
            <p className="mt-1 text-xs text-red-500">
              {formik.errors.comments}
            </p>
          )}
        </div>

        <div className="w-24">
          <Button
            type="default"
            htmlType="submit"
            disabled={formik.isSubmitting}
          >
            Отправить
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RequestForm;
