import Header from "../components/Header";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { doctors, specialityData } from "../assets/assets";
import DoctorListItem from "../components/DoctorListItem";

const Home = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [inputName, setInputName] = useState("");

  const navigate = useNavigate();

  const toggleSpecialization = (speciality) => {
    if (selectedSpeciality === null) {
      setSelectedSpeciality(speciality);
    } else {
      setSelectedSpeciality(null);
    }
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSpeciality = selectedSpeciality
        ? doc.speciality.toLowerCase() === selectedSpeciality.toLowerCase()
        : true;

      const input = inputName.toLowerCase();
      const matchesNameOrSpeciality =
        doc.name.toLowerCase().includes(input) ||
        doc.speciality.toLowerCase().includes(input);

      return matchesSpeciality && matchesNameOrSpeciality;
    });
  }, [selectedSpeciality, inputName, doctors]);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      <Header />
      <div className="p-4 flex-grow">
        <div className="flex gap-5 h-[calc(100vh-100px)]">
          <div className="hidden md:block bg-white w-2/4 max-w-[250px] p-4 shadow rounded-lg">
            <p className="text-base font-bold mb-4">Choose Specialization</p>
            <ul>
              {specialityData.map((each) => (
                <li
                  key={each.speciality}
                  className={`font-[500] mt-2 mb-2 ml-5 text-gray-700 border border-gray-300 rounded-md p-2 cursor-pointer hover:text-blue-500 ${
                    selectedSpeciality === each.speciality ? "bg-blue-200" : ""
                  }`}
                  onClick={() => toggleSpecialization(each.speciality)}
                >
                  {each.speciality}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-grow overflow-y-auto scrollbar-hide p-4 bg-gray-100 rounded-lg shadow">
            <input
              type="text"
              placeholder="Search Doctor Name..."
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="sm:w-[90%] md:w-[60%] lg:w-[30%] h-[40px] outline-none rounded-lg text-sm px-4 mb-4 border border-gray-300"
            />
            {filteredDoctors.length === 0 ? (
              <p className="text-center text-gray-500 mt-6">
                No doctors found.
              </p>
            ) : (
              <ul className="flex flex-wrap justify-center gap-4">
                {filteredDoctors.map((eachDoc) => (
                  <DoctorListItem
                    key={eachDoc.id}
                    docDetails={eachDoc}
                    onClick={() => navigate(`/doctor/${eachDoc.id}`)}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
