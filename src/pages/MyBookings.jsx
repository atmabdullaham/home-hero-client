import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookigs] = useState();
  const axiosSecure = useAxiosSecure();
  const [dataLoading, setDataLoading] = useState(true);
  const modalRef = useRef(null);
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const [serviceId, setServiceId] = useState();

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

  const handleModalOpen = (id) => {
    setServiceId(id);
    modalRef.current.showModal();
  };

  const handleModalClose = () => {
    modalRef.current.close();
  };

  const onSubmit = async (data) => {
    const reviewInfo = {
      userEmail: user.email,
      rating: rating,
      comment: data.comment,
    };

    try {
      const res = await axiosSecure.patch(
        `/services/${serviceId}/reviews`,
        reviewInfo
      );

      if (res.data.success && res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Review submitted!", "success");
        reset();
        setRating(0);
        handleModalClose();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (dataLoading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );

  return (
    <div className="bg-cyan-50 py-10">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-11/12 lg:w-10/12 mx-auto p-5">
        <h2 className="text-cyan-600 text-3xl font-bold text-center pb-8">
          Manage Bookings: ({bookings?.length})
        </h2>
        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
          <table className="table min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900">
                <th>Sl.</th>
                <th className="px-3 py-2 whitespace-nowrap">Name</th>
                <th className="px-3 py-2 whitespace-nowrap">Price</th>
                <th className="px-3 py-2 whitespace-nowrap">
                  Booking Date and Time
                </th>
                <th className="px-3 py-2 whitespace-nowrap">Review</th>
                <th className="px-3 py-2 whitespace-nowrap">Action</th>
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
                      onClick={() => handleModalOpen(booking.service_id)}
                      className="btn bg-transparent hover:border-0 border-0 p-0 text-yellow-500"
                    >
                      Add Review
                    </span>
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

        {/* review modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h2
              id="modalTitle"
              className="text-xl font-bold text-gray-900 sm:text-2xl"
            >
              Rating and Review
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-10">
              <div className="mb-4">
                <h3 className="mb-1">Your Rating:</h3>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={rating}
                  onChange={setRating}
                  fractions={10}
                />
              </div>

              <textarea
                {...register("comment", { required: true })}
                className="textarea mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
                rows="4"
                placeholder="Write your review..."
              ></textarea>

              <footer className="mt-6 flex justify-end gap-2">
                <button
                  onClick={handleModalClose}
                  type="button"
                  className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </footer>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyBookings;
