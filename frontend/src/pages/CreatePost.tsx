import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await createPost(values);
        navigate("/posts");
      } catch (error) {
        console.error("Failed to create post:", error);
      }
    },
  });

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...formik.getFieldProps("title")}
            className="w-full p-2 border rounded"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500">{formik.errors.title}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="content" className="block">
            Content
          </label>
          <textarea
            id="content"
            {...formik.getFieldProps("content")}
            className="w-full p-2 border rounded"
            rows={5}
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="text-red-500">{formik.errors.content}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
