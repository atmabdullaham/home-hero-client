import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookigs] = useState();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/my-bookings?email=${user.email}`).then((data) => {
      setBookigs(data.data);
    });
  }, [user, axiosSecure]);
  console.log(bookings);

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
        axiosSecure.delete(`/bookings/${id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            const updatedService = bookings.filter(
              (service) => service._id !== id
            );
            setBookigs(updatedService);
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

  return (
    <div className="bg-cyan-50 py-10">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100  w-11/12 lg:w-10/12 mx-auto p-5 ">
        <h2 className="text-cyan-600 text-3xl font-bold text-center pb-8">
          Manage My Bookings: ({bookings?.length})
        </h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Provider Name</th>
              <th>Booking Date and Time</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((service, i) => (
              <tr key={service._id}>
                <th>{i + 1}</th>
                {/* <td>{service.service_name}</td>
                <td>{service.category}</td>
                <td>${service.price}</td>
                <td>{service.provider_name}</td>
                <td>
                  <span
                    onClick={() => handleDelete(service._id)}
                    className="btn bg-transparent hover:border-0 border-0 text-red-700"
                  >
                    <MdOutlineDelete size={24} />
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
