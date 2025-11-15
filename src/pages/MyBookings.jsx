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
        <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
          <table className="table min-w-full divide-y-2 divide-gray-200">
            {/* head */}
            <thead class="ltr:text-left rtl:text-right">
              <tr class="*:font-medium *:text-gray-900">
                <th>Sl.</th>
                <th class="px-3 py-2 whitespace-nowrap">Name</th>
                <th class="px-3 py-2 whitespace-nowrap">Price</th>
                <th class="px-3 py-2 whitespace-nowrap">
                  Booking Date and Time
                </th>
                <th class="px-3 py-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {bookings?.map((booking, i) => (
                <tr
                  key={booking._id}
                  className="*:text-gray-900 *:first:font-medium"
                >
                  <th className="px-3 py-2 whitespace-nowrap">{i + 1}</th>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {booking.service_name}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    ${booking.price}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {booking.date_time}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
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
    </div>
  );
};

export default MyBookings;
