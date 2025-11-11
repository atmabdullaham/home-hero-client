import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
const AddService = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const handleSendData = (data) => {
    axiosSecure
      .post("/services", data)
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
    <div className="bg-cyan-50 pt-5 pb-20">
      <form
        onSubmit={handleSubmit(handleSendData)}
        className="w-11/12 md:h-10/12 lg:w-6/12  mx-auto space-y-2 shadow-md shadow-cyan-600 p-4 rounded-xl"
      >
        <h2 className="text-center text-2xl font-bold text-cyan-600">
          Add Service
        </h2>
        {/* 1. Service Name */}
        <div>
          <legend className="text-gray-700">Service Name</legend>
          <input
            {...register("service_name")}
            placeholder="Service Name"
            className="w-full input focus:outline-0 focus:border-cyan-600"
            type="text"
          />
        </div>
        {/* 2. Category */}
        <div>
          <legend className="text-gray-700">Category</legend>
          <select
            required
            {...register("category")}
            defaultValue=""
            className="select w-full input focus:outline-0 focus:border-cyan-600"
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
        {/* 3. Price */}
        <div>
          <legend className="text-gray-700">Price</legend>
          <input
            {...register("price")}
            placeholder="Price"
            className="w-full input focus:outline-0 focus:border-cyan-600"
            type="number"
          />
        </div>
        {/* 4. Description */}
        <div>
          <legend className="text-gray-700">Description</legend>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full textarea focus:outline-0 focus:border-cyan-600"
          />
        </div>
        {/* 5. Photo URL */}
        <div>
          <legend className="text-gray-700">Photo URL</legend>
          <input
            {...register("image_URL")}
            placeholder="Image URL"
            className="w-full input focus:outline-0 focus:border-cyan-600"
            type="url"
          />
        </div>
        {/* 6. Provider Name */}
        <div>
          <legend className="text-gray-700">Provider Name</legend>
          <input
            {...register("provider_name")}
            placeholder="Provider Name"
            className="w-full input focus:outline-0 focus:border-cyan-600"
            type="text"
          />
        </div>
        {/* 7. Email */}
        <div>
          <legend className="text-gray-700">Email</legend>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full input focus:outline-0 focus:border-cyan-600"
            type="email"
            defaultValue={user?.email}
            readOnly
          />
        </div>

        <input type="submit" className="btn bg-cyan-600 text-white btn-block" />
      </form>
    </div>
  );
};

export default AddService;
