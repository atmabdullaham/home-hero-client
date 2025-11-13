import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookigs] = useState();
  const axiosSecure = useAxiosSecure();
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    axiosSecure
      .get(`/my-bookings?email=${user.email}`)
      .then((data) => {
        setBookigs(data.data);
      })
      .finally(() => {
        setDataLoading(false);
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
            const updatedBookings = bookings.filter(
              (booking) => booking._id !== id
            );
            setBookigs(updatedBookings);
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
          Manage My Bookings: ({bookings?.length})
        </h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Booking Date and Time</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, i) => (
              <tr key={booking._id}>
                <th>{i + 1}</th>
                <td>{booking.service_name}</td>
                <td>${booking.price}</td>
                <td>{booking.date_time}</td>
                <td>
                  <span
                    onClick={() => handleDelete(booking._id)}
                    className="btn bg-transparent hover:border-0 border-0 text-red-700"
                  >
                    Cancel
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

export default MyBookings;
