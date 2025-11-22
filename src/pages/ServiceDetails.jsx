import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import RatingDisplay from "../components/RatingDisplay";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ServiceDetails = () => {
  const [service, setService] = useState("");
  const { id } = useParams();
  const modalRef = useRef(null);
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();
  const {
    category,
    description,
    email,
    image_URL,
    price,
    provider_name,
    service_name,
    reviews,
  } = service;
  function getAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );
    return Number((total / reviews.length).toFixed(1)); // returns 1 decimal
  }
  const rating = getAverageRating(reviews);
  useEffect(() => {
    axiosSecure
      .get(`/service/${id}`)
      .then((data) => {
        setService(data.data);
        reset();
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [id, axiosSecure, reset]);

  const handleModalOpen = () => {
    modalRef.current.showModal();
  };
  const handleModalClose = () => {
    modalRef.current.close();
  };

  const handleBooking = (data) => {
    setLoading(true);
    data.service_id = id;
    if (user.email === email) {
      setLoading(false);
      toast.error("You can't book your own service");
      modalRef.current.close();
    } else {
      axiosSecure.post("/bookings", data).then((res) => {
        console.log(res.data);
        modalRef.current.close();
        setLoading(false);
        navigate("/my-bookings");
      });
    }
  };
  if (dataLoading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );
  return (
    <div>
      <section className="py-5 md:py-10 bg-cyan-50 dark:bg-gray-800 flex justify-center">
        <div className="w-11/12 lg:w-8/12 bg-white dark:bg-gray-700 border border-cyan-200 rounded-2xl shadow-xl p-4 md:p-8 flex flex-col lg:flex-row gap-8 transition-all">
          {/* Left Image */}
          <img
            className="w-full lg:w-1/2 rounded-2xl object-cover shadow-sm"
            src={image_URL}
            alt={service_name}
          />

          {/* Right Section */}
          <div className="flex flex-col justify-between w-full lg:w-1/2 py-2">
            <div className="space-y-3">
              {/* Title */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-1">
                  {service_name}
                </h1>

                {/* Provider */}
                <p className="text-gray-600 dark:text-gray-200 text-sm ">
                  by: <span className="font-medium">{provider_name}</span>
                </p>
              </div>

              {/* Price */}
              <p className="text-2xl font-semibold text-cyan-600 dark:text-cyan-300 ">
                ${price}
              </p>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed  text-justify">
                {description}
              </p>
              {/* Rating Button */}
              <button>
                <RatingDisplay rating={rating} />
              </button>
              {/* Reviews */}
              <div className="space-y-2 bg-cyan-50 dark:bg-gray-600 p-2 rounded-sm w-fit">
                {reviews.slice(0, 2).map((review, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                      {review.comment}

                      <span className="pl-4 font-semibold text-cyan-600 dark:text-cyan-300">
                        ★ {review.rating}
                      </span>
                    </p>
                    <p></p>
                  </div>
                ))}
              </div>
              {/* Category */}
              <p className="text-gray-600 dark:text-gray-200 text-sm">
                Category:{" "}
                <span className="font-medium">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </p>
            </div>

            {/* Book Now Button */}
            <div className="flex mt-6">
              <Link
                to={"/services"}
                className="btn bg-transparent  text-black dark:text-white border-0 "
              >
                <FaArrowCircleLeft size={30} />
              </Link>
              <button
                onClick={handleModalOpen}
                className="btn bg-cyan-600 hover:bg-cyan-700 text-white grow "
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(handleBooking)}
            className="space-y-4 p-5 shadow-md border border-cyan-200 rounded-xl"
          >
            {/* Service Name */}
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Service Name
              </label>
              <input
                {...register("service_name")}
                type="text"
                defaultValue={service.service_name}
                className="input w-full focus:border-cyan-600"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-gray-700 dark:text-gray-200">Price</label>
              <input
                {...register("price")}
                type="number"
                defaultValue={service.price}
                className="input w-full focus:border-cyan-600"
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Date & Time
              </label>
              <input
                {...register("date_time")}
                required
                type="datetime-local"
                className="input w-full focus:border-cyan-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700 dark:text-gray-200">Email</label>
              <input
                {...register("email")}
                type="email"
                defaultValue={user?.email}
                readOnly
                className="input w-full focus:border-cyan-600 bg-gray-100 dark:bg-gray-600"
              />
            </div>

            <div className="flex">
              <input
                type="submit"
                value={loading ? "Processing..." : "Confirm Booking"}
                className="btn bg-cyan-600 hover:bg-cyan-700 text-white w-1/2"
              />
              <input
                onClick={handleModalClose}
                type="button"
                value="Cancel"
                className="btn bg-transparent border border-red-600 hover:bg-red-700 hover:text-white text-red-600 w-1/2"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
