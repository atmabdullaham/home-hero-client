import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
const AddService = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const handleSendData = (data) => {
    const serviceInfo = { ...data, reviews: [] };
    axiosSecure
      .post("/services", serviceInfo)
      .then((res) => {
        console.log("Response:", res.data);
        if (res.data.insertedId) {
          toast.success("Services added successfully");
          reset();
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div className="bg-cyan-50 pt-8 pb-20">
      <form
        onSubmit={handleSubmit(handleSendData)}
        className="w-11/12 lg:w-6/12 mx-auto p-6 rounded-2xl shadow-lg bg-white border border-cyan-200"
      >
        <h2 className="text-center text-3xl font-bold text-cyan-600 mb-6">
          Add Service
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Service Name
            </label>
            <input
              {...register("service_name")}
              placeholder="Service Name"
              className="input w-full border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Category
            </label>
            <select
              required
              {...register("category")}
              defaultValue=""
              className="select w-full border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" disabled>
                Select a Category
              </option>
              <option value="cleaning">Cleaning</option>
              <option value="plumbing">Plumbing</option>
              <option value="repair">Repair</option>
              <option value="electrical">Electrical</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Price
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              placeholder="Price"
              className="input w-full border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="number"
            />
          </div>

          {/* Provider Name */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Provider Name
            </label>
            <input
              {...register("provider_name")}
              placeholder="Provider Name"
              className="input w-full border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="text-gray-700 font-medium block mb-1">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="Email"
              className="input w-full border border-cyan-300 rounded-md bg-gray-100"
              type="email"
              defaultValue={user?.email}
              readOnly
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="text-gray-700 font-medium block mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="textarea w-full border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 h-28"
          />
        </div>

        {/* Photo URL */}
        <div className="mt-4">
          <label className="text-gray-700 font-medium block mb-1">
            Photo URL
          </label>
          <input
            {...register("image_URL")}
            placeholder="Image URL"
            className="input w-full border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="url"
          />
        </div>

        {/* Button */}

        <input
          type="submit"
          value="Add Service"
          className="btn bg-cyan-600 hover:bg-cyan-700 text-white btn-block mt-6 rounded-md"
        />
      </form>
    </div>
  );
};

export default AddService;
