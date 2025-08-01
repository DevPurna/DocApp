import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import { doctors } from "../assets/assets";
import { useParams } from "react-router-dom";
import verified_icon from "../assets/verified_icon.svg";

const DoctorProfile = () => {
  const { id } = useParams();
  const selectedDoctor = doctors.find((eachDoc) => eachDoc._id === id);

  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [confirmation, setConfirmation] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setConfirmation(
      `Appointment booked for ${formData.name} on ${new Date(
        Date.now() + selectedDateIndex * 86400000
      ).toDateString()} at ${selectedTime}. A confirmation has been sent to ${
        formData.email
      }.`
    );
    setShowForm(false);
    setFormData({ name: "", email: "" }); // Reset form fields
    setSelectedDateIndex(null); // Deselect date
    setSelectedTime(""); // Deselect time

    // Clear confirmation after 5 seconds
    setTimeout(() => {
      setConfirmation("");
    }, 5000); // changed to 5000 ms (5 sec)
  };

  const generateTimeSlots = (selectedDate) => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    const now = new Date();
    const selected = new Date(selectedDate);
    const isToday = now.toDateString() === selected.toDateString();

    let currentHour = startHour;
    let currentMinute = 0;

    if (isToday) {
      if (
        now.getHours() > endHour ||
        (now.getHours() === endHour && now.getMinutes() > 0)
      ) {
        return ["No slots today"];
      }

      if (now.getHours() >= startHour) {
        currentHour = now.getHours();
        currentMinute = now.getMinutes() > 30 ? 0 : 30;
        if (now.getMinutes() > 30) currentHour += 1;
      }
    }

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute === 0)
    ) {
      const formattedTime = formatAMPM(currentHour, currentMinute);
      slots.push(formattedTime);

      currentMinute += 30;
      if (currentMinute === 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }

    return slots;
  };

  const formatAMPM = (hour, minute) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const h = hour % 12 || 12;
    const m = minute === 0 ? "00" : minute;
    return `${h}:${m} ${ampm}`;
  };

  //Memoized booking dates
  const bookingDates = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);

      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short",
      });
      const dateNum = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });

      return { index, dayName, dateNum, date };
    });
  }, []);

  //Memoized selected date
  const selectedDate = useMemo(() => {
    if (selectedDateIndex === null) return null;
    const date = new Date();
    date.setDate(date.getDate() + selectedDateIndex);
    return date;
  }, [selectedDateIndex]);

  //Memoized time slots
  const timeSlots = useMemo(() => {
    return selectedDate ? generateTimeSlots(selectedDate) : [];
  }, [selectedDate]);

  return (
    <div>
      <Header />
      <div className="flex p-5 justify-center">
        <div className="bg-blue-300 w-[35%] mt-4 h-[250px] rounded-lg">
          <img
            src={selectedDoctor.image}
            alt="doctor-img"
            className="h-[250px]"
          />
        </div>
        <div className="flex flex-col p-5">
          <div className="flex flex-col p-5 border border-gray-300 shadow-md rounded-lg">
            <div className="flex gap-2">
              <h1 className="text-2xl font-bold">{selectedDoctor.name}</h1>
              <img
                src={verified_icon}
                alt="verified img"
                className="w-[20px]"
              />
            </div>
            <p className="text-base mb-3">
              {selectedDoctor.degree} - {selectedDoctor.speciality}
              <span className="px-2 text-sm border border-gray-300 rounded-lg ml-2">
                {selectedDoctor.experience}
              </span>
            </p>
            <p className="font-bold">About</p>
            <p className="w-[80%] mb-3">{selectedDoctor.about}</p>
            <p>
              Appointment fee:{" "}
              <span className="font-bold">${selectedDoctor.fees}</span>{" "}
            </p>
          </div>
          <div className="flex flex-col mt-[40px]">
            <p>Booking slots</p>
            <ul className="flex gap-3 p-5">
              {bookingDates.map(({ index, dayName, dateNum }) => (
                <li key={index}>
                  <button
                    className={`px-4 py-2 border rounded-lg hover:bg-blue-200 ${
                      selectedDateIndex === index ? "bg-blue-300" : ""
                    }`}
                    onClick={() => setSelectedDateIndex(index)}
                  >
                    <p>{dayName}</p>
                    <p>{dateNum}</p>
                  </button>
                </li>
              ))}
            </ul>

            {/* Time slots for selected date */}
            {selectedDate && (
              <ul className="flex overflow-x-auto scrollbar-hide whitespace-nowrap space-x-4 px-4 py-2 max-w-[700px]">
                {timeSlots.map((time, idx) =>
                  time === "No slots today" ? (
                    <p key={idx} className="text-red-600">
                      {time}
                    </p>
                  ) : (
                    <li key={idx}>
                      <button
                        className={`flex-shrink-0 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm cursor-pointer ${
                          selectedTime === time ? "bg-green-300" : ""
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}

            {selectedTime && selectedDateIndex !== null && (
              <button
                type="button"
                className="bg-blue-500 rounded-lg text-sm align-start h-[30px] w-[20%] text-white mt-3"
                onClick={() => setShowForm(true)}
              >
                Book Appointment
              </button>
            )}

            {showForm && (
              <form
                onSubmit={handleFormSubmit}
                className="mt-4 border p-4 rounded-md bg-gray-100 w-[80%]"
              >
                <div className="mb-2">
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Confirm Appointment
                </button>
              </form>
            )}

            {confirmation && (
              <p className="mt-4 text-green-600 font-semibold">
                {confirmation}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
