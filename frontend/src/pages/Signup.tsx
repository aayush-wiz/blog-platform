import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await signup(values);
        navigate("/login");
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  });

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...formik.getFieldProps("username")}
            className="w-full p-2 border rounded"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500">{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            className="w-full p-2 border rounded"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            className="w-full p-2 border rounded"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
