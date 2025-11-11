import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateService = () => {
  const [service, setService] = useState("");
  const { user } = useAuth();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/service/${id}`).then((data) => {
      setService(data.data);
      reset(data.data);
    });
  }, [id, axiosSecure, reset]);

  const handleUpdate = (data) => {
    const changedFields = {};

    // Compare each field
    for (const key in data) {
      if (data[key] !== service[key]) {
        changedFields[key] = data[key];
      }
    }

    if (Object.keys(changedFields).length === 0) {
      toast.error("No fields changed, nothing to update.");
      return;
    }

    axiosSecure
      .patch(`/service-update?id=${id}`, changedFields)
      .then((res) => {
        console.log("Response:", res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  if (!service) return <p className="text-center py-10">Loading...</p>;
  return (
    <div className="bg-cyan-50 pt-5 pb-20">
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="w-11/12 md:w-6/12  mx-auto space-y-2 shadow-md shadow-cyan-600 p-4 rounded-xl"
      >
        <h2 className="text-center text-2xl font-bold text-cyan-600">
          Edit Service
        </h2>
        {/* 1. Service Name */}
        <div>
          <legend className="text-gray-700">Service Name</legend>
          <input
            {...register("service_name")}
            placeholder="Service Name"
            className="w-full input focus:outline-0 focus:border-cyan-600"
            type="text"
            defaultValue={service.service_name}
          />
        </div>
        {/* 2. Category */}
        <div>
          <legend className="text-gray-700">Category</legend>
          <select
            required
            {...register("category")}
            defaultValue={service.category}
            className="select w-full input focus:outline-0 focus:border-cyan-600"
          >
            <option disabled>Select a Category</option>
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
            defaultValue={service.price}
          />
        </div>
        {/* 4. Description */}
        <div>
          <legend className="text-gray-700">Description</legend>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full textarea focus:outline-0 focus:border-cyan-600"
            defaultValue={service.description}
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
            defaultValue={service.image_URL}
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
            defaultValue={service.provider_name}
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

        <input
          type="submit"
          value={"Update"}
          className="btn bg-cyan-600 text-white btn-block"
        />
      </form>
    </div>
  );
};

export default UpdateService;
