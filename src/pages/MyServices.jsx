import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyServices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dataLoading, setDataLoading] = useState(true);

  const [services, setServices] = useState([]);
  useEffect(() => {
    axiosSecure
      .get(`/my-services?email=${user.email}`)
      .then((data) => {
        setServices(data.data);
      })
      .finally(() => {
        setTimeout(() => {
          setDataLoading(false);
        }, 100);
      });
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            const updatedService = services.filter(
              (service) => service._id !== id
            );
            setServices(updatedService);
            Swal.fire({
              title: "Deleted!",
              text: "Your service has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (dataLoading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );

  return (
    <div className="bg-cyan-50 py-10">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100  w-11/12 lg:w-10/12 mx-auto p-5 ">
        <h2 className="text-cyan-600 text-3xl font-bold text-center pb-8">
          Manage Services: ({services.length})
        </h2>
        <table className="table">
          {/* head */}
          <thead className="bg-cyan-100">
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Provider Name</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => (
              <tr key={service._id}>
                <th>{i + 1}</th>
                <td>{service.service_name}</td>
                <td>{service.category}</td>
                <td>${service.price}</td>
                <td>{service.provider_name}</td>
                <td>
                  <Link
                    to={`/service/${service._id}`}
                    className="btn bg-transparent hover:border-0 border-0"
                  >
                    <CiEdit size={24} />
                  </Link>
                  <span
                    onClick={() => handleDelete(service._id)}
                    className="btn bg-transparent hover:border-0 border-0 text-red-700"
                  >
                    <MdOutlineDelete size={24} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;
