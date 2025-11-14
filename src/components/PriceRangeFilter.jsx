import { useEffect, useState } from "react";
import { Range } from "react-range";

function PriceRangeFilter({ min = 0, max = 1000, onChange }) {
  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  const handleChange = (newValues) => {
    setValues(newValues);
    if (onChange) onChange(newValues[0], newValues[1]);
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-base-100">
      <h3 className="font-semibold mb-3">Price Range</h3>

      <Range
        step={50}
        min={min}
        max={max}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 rounded-full bg-gray-200" // Tailwind base
            style={{
              background: `linear-gradient( to right, 
              #eee ${((values[0] - min) / (max - min)) * 100}%, 
              #06b6d4 ${((values[0] - min) / (max - min)) * 100}%, 
              #06b6d4 ${((values[1] - min) / (max - min)) * 100}%, 
              #eee ${((values[1] - min) / (max - min)) * 100}%)`,
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 bg-cyan-600 rounded-full border-2 border-white shadow-md"
          />
        )}
      />

      <div className="flex justify-between mt-4">
        <input
          type="number"
          value={values[0]}
          onChange={(e) => handleChange([+e.target.value, values[1]])}
          className="input input-bordered w-24 text-center"
        />
        <input
          type="number"
          value={values[1]}
          onChange={(e) => handleChange([values[0], +e.target.value])}
          className="input input-bordered w-24 text-center"
        />
      </div>
    </div>
  );
}

export default PriceRangeFilter;
