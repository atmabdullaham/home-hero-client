import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
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
      <section className="flex items-center justify-center bg-cyan-50 bg-opacity-20s h-100vh py-10">
        <div className="flex w-11/12 md:w-8/12 flex-col md:flex-row p-4 md:p-10 bg-cyan-50 border-cyan-400 rounded-xl border-2 shadow-lg shadow-cyan-600 gap-5">
          <img
            className="w-full md:w-1/2  rounded-2xl"
            src={image_URL}
            alt=""
          />
          <div className="flex flex-col justify-between">
            <div className="">
              <div className="flex gap-2 items-center">
                <h1 className="text-3xl font-semibold text-black">
                  {service_name}
                </h1>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="justify-start items-center gap-2 flex">
                  <span className="text-[#191919] text-sm font-normal leading-[21px]">
                    by:
                  </span>
                  <div className="">{provider_name}</div>
                </div>
              </div>

              <div className=" mt-5 justify-start items-center gap-3 inline-flex">
                <div className="justify-start items-center gap-1 flex">
                  <div className="text-cyan-600 text-2xl font-medium leading-9">
                    ${price}
                  </div>
                </div>
              </div>

              <p className="text-justify text-[#7f7f7f] text-sm font-normal mt-4 leading-[21px]">
                {description}
              </p>

              <div className=" mt-6 flex-col justify-start items-start gap-3 inline-flex">
                <div className="justify-start items-start gap-1.5 inline-flex">
                  <span className="text-[#191919] text-sm font-medium leading-[21px]">
                    Category:
                  </span>
                  <span className="text-[#7f7f7f] text-sm font-normal leading-[21px]">
                    {category}
                  </span>
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>
                  {reviews.slice(0, 2).map((review) => (
                    <div className="flex gap-2">
                      <p>{review.comment}</p>
                      <p>{review.rating}</p>
                    </div>
                  ))}
                </div>
                <button className="p-2 rounded-md border hover:bg-gray-50">
                  <RatingDisplay rating={rating}></RatingDisplay>
                </button>
              </div>
            </div>

            <button
              onClick={handleModalOpen}
              className="btn bg-cyan-600 text-white btn-block"
            >
              Book now
            </button>
          </div>
        </div>
      </section>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(handleBooking)}
            className="w-full  mx-auto space-y-2 shadow-md shadow-cyan-600 p-4 rounded-xl"
          >
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
            {/* 2. Price */}
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
            {/* 3. Date and time */}
            <div>
              <legend className="text-gray-700">Date and time</legend>
              <input
                {...register("date_time")}
                required
                type="datetime-local"
                className="input w-full textarea focus:outline-0 focus:border-cyan-600"
              />
            </div>

            {/* 4. Email */}
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
              value={loading ? "Processing..." : "Confirm Booking"}
              className="btn bg-cyan-600 text-white btn-block"
            />
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
