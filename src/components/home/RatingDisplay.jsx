import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const RatingDisplay = ({ rating }) => {
  const parseFloatRating = parseFloat(rating);
  return (
    <div className="flex items-center gap-2">
      <Rating
        style={{ maxWidth: 110 }}
        value={parseFloatRating}
        readOnly
        fractions={10}
      />
      <span className="text-sm text-gray-600 dark:text-white">
        {rating?.toFixed(1)}
      </span>
    </div>
  );
};

export default RatingDisplay;
