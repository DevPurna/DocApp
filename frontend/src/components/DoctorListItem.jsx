import { useNavigate } from "react-router-dom";

const DoctorListItem = ({ docDetails }) => {
  const { status, _id, name, image, speciality } = docDetails;
  const navigate = useNavigate();

  const getStatusColor = () => {
    if (status === "Available Today") return "text-green-600";
    if (status === "Fully Booked") return "text-red-500";
    if (status === "On Leave") return "text-yellow-500";
    return "text-gray-500";
  };

  return (
    <li
      onClick={() => navigate(`/doctor/${_id}`)}
      className="max-w-[250px] bg-white p-3 m-3 rounded-lg shadow-md cursor-pointer"
    >
      <img
        src={image}
        alt="doctor img"
        className="w-full h-[200px] object-cover riunded-md"
      />
      <p className={`text-sm font-semibold mt-2 ${getStatusColor()}`}>
        <span
          className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor()} bg-current`}
        ></span>
        {status}
      </p>

      <p className="text-basic font-bold">{name}</p>
      <p className="text-gray-600">{speciality}</p>
    </li>
  );
};
export default DoctorListItem;
