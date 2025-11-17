import { Link } from "react-router";
import RatingDisplay from "./home/RatingDisplay";

const ServiceCard = ({ service }) => {
  console.log(service);
  const {
    avgRating,
    category,
    description,
    image_URL,
    price,
    provider_name,
    service_name,
    _id,
  } = service;

  const shortDescription = description?.slice(0, 60);

  return (
    <div>
      <div className="group max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="overflow-hidden">
          <img
            className="w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            src={image_URL}
            alt="Service Image"
          />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            {service_name}
          </h3>

          {avgRating && (
            <button className="py-2">
              <RatingDisplay rating={avgRating}></RatingDisplay>
            </button>
          )}

          <p className="text-gray-600 text-sm mt-2">{shortDescription}...</p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-gray-700">${price}</span>

            <Link
              to={`/details/${_id}`}
              className="bg-cyan-600 hover:bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-200"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
