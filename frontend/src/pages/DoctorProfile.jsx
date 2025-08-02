import React, { useState, useMemo } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Header from "../components/Header";
import { doctors } from "../assets/assets";
import { useParams } from "react-router-dom";
import verified_icon from "../assets/verified_icon.svg";

const DoctorProfile = () => {
  const { id } = useParams();
  const selectedDoctor = doctors.find((eachDoc) => eachDoc._id === id);

  const [selectedDate, setSelectedDate] = useState(null);
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
      `Appointment booked for ${
        formData.name
      } on ${selectedDate.toDateString()} at ${selectedTime}. A confirmation has been sent to ${
        formData.email
      }.`
    );

    setShowForm(false);
    setFormData({ name: "", email: "" }); // Reset form fields
    setSelectedDate(null); // reset calendar
    setSelectedTime(""); // Deselect time

    // Clear confirmation after 3 seconds
    setTimeout(() => {
      setConfirmation("");
    }, 3000); // changed to 3000 ms (3 sec)
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

  //Memoized time slots
  const timeSlots = useMemo(() => {
    return selectedDate ? generateTimeSlots(selectedDate) : [];
  }, [selectedDate]);

  return (
    <div>
      <Header />
      <div className="flex flex-col lg:flex-row p-4 md:p-6 lg:p-8 justify-center items-center lg:items-start gap-4">
        <div className="bg-blue-300 w-full sm:w-2/3 md:w-1/2 lg:w-[20%] h-[250px] lg:mt-5 rounded-lg overflow-hidden">
          <img
            src={selectedDoctor.image}
            alt="doctor-img"
            className="h-full w-full lg:w-[90%] object-cover object-top"
          />
        </div>
        <div className="flex flex-col w-full lg:w-[55%] p-2 sm:p-4 md:p-6">
          <div className="flex flex-col p-4 sm:p-6 border border-gray-300 shadow-md rounded-lg bg-white">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">
                {selectedDoctor.name}
              </h1>
              <img src={verified_icon} alt="verified" className="w-4 sm:w-5" />
            </div>
            <p className="text-sm sm:text-base mb-2 sm:mb-3">
              {selectedDoctor.degree} - {selectedDoctor.speciality}
              <span className="ml-2 px-2 text-xs sm:text-sm border border-gray-300 rounded-lg">
                {selectedDoctor.experience}
              </span>
            </p>
            <p className="font-semibold mb-1">About</p>
            <p className="text-sm sm:text-base mb-3">{selectedDoctor.about}</p>
            <p>
              Appointment fee:{" "}
              <span className="font-bold">${selectedDoctor.fees}</span>
            </p>
          </div>
          <div className="flex flex-col mt-6">
            <p className="mb-2 text-base font-semibold">Booking slots</p>
            <Calendar
              onChange={(value) => setSelectedDate(value)}
              value={selectedDate}
              minDate={new Date()} // only allow today & future dates
              tileDisabled={({ date }) => date.getDay() === 0} // disable Sundays
              tileClassName={({ date }) =>
                date.getDay() === 0
                  ? "bg-red-200 text-gray-400 cursor-not-allowed"
                  : ""
              }
            />

            {/* Time slots for selected date */}
            {selectedDate && (
              <ul className="flex overflow-x-auto scrollbar-hide whitespace-nowrap space-x-3 px-3 py-2 max-w-full">
                {timeSlots.map((time, idx) =>
                  time === "No slots today" ? (
                    <p key={idx} className="text-red-600 text-sm">
                      {time}
                    </p>
                  ) : (
                    <li key={idx}>
                      <button
                        className={`min-w-[80px] px-3 py-2 border rounded-md text-xs sm:text-sm bg-gray-100 ${
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

            {selectedTime && selectedDate && (
              <button
                type="button"
                className="bg-blue-500 rounded-lg text-white text-sm mt-3 h-10 w-full sm:w-1/2 lg:w-1/3 disabled:opacity-50"
                disabled={!selectedTime}
                onClick={() => setShowForm(true)}
              >
                Book Appointment
              </button>
            )}

            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md">
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        className="bg-gray-400 text-white px-4 py-2 rounded text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded text-sm sm:text-base sm:px-4 sm:py-2 px-2 py-1"
                      >
                        Confirm Appointment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {confirmation && (
              <p className="mt-4 text-green-600 font-semibold text-sm sm:text-base">
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
