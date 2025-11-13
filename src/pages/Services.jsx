import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ServiceCard from "../components/ServiceCard";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Services = () => {
  const axiosPublic = useAxiosPublic();
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = {};

    if (category && category !== "all") params.category = category;
    if (search) params.search = search;
    axiosPublic
      .get("/services", { params })
      .then((data) => {
        setAllServices(data.data);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      });
  }, [axiosPublic, category, search]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* search input */}
      <div className="flex items-center justify-center">
        <label className="input items-center gap-2 border focus-within:outline-0 focus-within:border-cyan-600 rounded-lg">
          <FaSearch className="text-gray-500" />
          <input
            type="search"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=""
          />
        </label>
      </div>
      <h2 className="text-center text-3xl font-bold py-4">
        Available Services: ({allServices.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-5">
        <div className="flex flex-col items-center col-span-2">
          <div className="w-full">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Categories</option>
              <option value="cleaning">Cleaning</option>
              <option value="plumbing">Plumbing</option>
              <option value="repair">Repair</option>
              <option value="electrical">Electrical</option>
            </select>
          </div>
          <div>Search by Price Range</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 col-span-10">
          {allServices.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
