import { useState, useEffect } from "react";
import API from "../api/api";

function Grounds() {

  const [grounds, setGrounds] = useState([]);

  const fetchGrounds = async () => {

    try {

      const res = await API.get("/grounds");
      setGrounds(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchGrounds();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Cricket Grounds
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {grounds.map((ground) => (

          <div
            key={ground._id}
            className="bg-white p-6 rounded-lg shadow"
          >

            <h2 className="text-lg font-bold mb-2">
              {ground.name}
            </h2>

            <p className="text-gray-500 mb-2">
              Location: {ground.location}
            </p>

            <p className="text-gray-500">
              ₹{ground.pricePerHour} / hour
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Grounds;