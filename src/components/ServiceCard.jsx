const ServiceCard = ({ service }) => {
  const {
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
      <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          className="w-full object-cover"
          src={image_URL}
          alt="Service Image"
        />
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            {service_name}
          </h3>
          <p className="text-gray-600 text-sm mt-2">{shortDescription}...</p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-cyan-600">${price}</span>
            <button className="bg-cyan-600 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-200">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
