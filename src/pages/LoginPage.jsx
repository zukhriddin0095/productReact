import axios from "axios";
import { useFormik } from "formik";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";


const LoginPage = () => {

    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .email("Email bolishi kerak")
          .required("Emailingizni kiriting"),
        password: yup
          .string("Password must be string")
          .required("Parolingizni kiriting")
          .min(8, "parolingzini soni 8 tadan kop bolishi kerak"),
      }),
      onSubmit: (values) => {
        axios
          .post("https://reqres.in/api/login", values)
          .then(() => {
            formik.resetForm();
            navigate("/categories");
          })
          .catch(() => {
            toast("Email yoki Parolingiz notogri!")
          });
      },
    });
  return (
    <Fragment>
      <div className="container">
        <div className="login">
          <form className="form" onSubmit={formik.handleSubmit}>
          <div className="form__email">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-danger">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="form__password">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-danger">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="submit">
            <input
              value="Send"
              type="submit"
              className="btn btn-primary"
            />
          </div>
        </form>
        </div>
        
      </div>
    </Fragment>
  );
};

export default LoginPage;
