import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { IoMdClose } from "react-icons/io";
import { cities } from "../../../common/cities";
import { addJobPost } from "../../../Services/jobService";
import { toast } from "react-toastify";

const typeOfStaffOptions = [
  { value: "Dishwasher", label: "Dishwasher" },
  { value: "Busser", label: "Busser" },
  { value: "Kitchen Helper", label: "Kitchen Helper" },
  { value: "Prep Cook", label: "Prep Cook" },
  { value: "Line Cook", label: "Line Cook" },
  { value: "Assistant Chef", label: "Assistant Chef" },
  { value: "Sous Chef", label: "Sous Chef" },
  { value: "Head Chef / Executive Chef", label: "Head Chef / Executive Chef" },
  { value: "Pastry Chef", label: "Pastry Chef" },
  { value: "Restaurant Manager", label: "Restaurant Manager" },
  { value: "Assistant Manager", label: "Assistant Manager" },
  { value: "Floor Supervisor", label: "Floor Supervisor" },
  { value: "Steward", label: "Steward" },
  { value: "Waiter / Waitress", label: "Waiter / Waitress" },
  { value: "Bartender", label: "Bartender" },
  { value: "Host / Hostess", label: "Host / Hostess" },
  { value: "Barista", label: "Barista" },
  { value: "Cashier", label: "Cashier" },
  { value: "Sommelier", label: "Sommelier" },
  { value: "Cleaner / Janitor", label: "Cleaner / Janitor" },
  { value: "Delivery Driver", label: "Delivery Driver" },
  { value: "Event Coordinator", label: "Event Coordinator" },
  { value: "Purchasing Manager", label: "Purchasing Manager" },
  { value: "Quality Control Manager", label: "Quality Control Manager" },
];

const numberOfStaffOptions = [
  ...Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  })),
  { value: "10+", label: "Above 10" },
];

const salaryRangeOptions = [
  { value: "10000-15000", label: "INR 10,000-15,000" },
  { value: "15000-20000", label: "INR 15,000-20,000" },
  { value: "20000-25000", label: "INR 20,000-25,000" },
  { value: "25000-30000", label: "INR 25,000-30,000" },
  { value: "30000+", label: "INR 30,000 and above" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    fontSize: "14px",
    borderRadius: "0.5rem",
    padding: "4px",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#FEF3C7" : "white",
    color: "#111827",
    cursor: "pointer",
  }),
};

const PostJobForm = () => {
  const [jobs, setJobs] = useState([
    {
      typeOfStaff: null,
      numberOfStaff: null,
      salaryRange: null,
      jobDetails: "",
    },
  ]);

  const [restaurant, setRestaurant] = useState({
    name: "",
    email: "",
    contactNo: "",
    body: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    jobs: [],
    restaurant: {},
  });

  const handleJobChange = (index, field, value) => {
    const newJobs = [...jobs];
    newJobs[index][field] = value;
    setJobs(newJobs);

    const newJobErrors = [...errors.jobs];
    if (newJobErrors[index]) {
      newJobErrors[index][field] = "";
      setErrors({ ...errors, jobs: newJobErrors });
    }
  };

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        typeOfStaff: null,
        numberOfStaff: null,
        salaryRange: null,
        jobDetails: "",
      },
    ]);
    setErrors({ ...errors, jobs: [...errors.jobs, {}] });
  };

  const handleRestaurantChange = (field, value) => {
    setRestaurant({ ...restaurant, [field]: value });

    if (errors.restaurant[field]) {
      setErrors({
        ...errors,
        restaurant: { ...errors.restaurant, [field]: "" },
      });
    }
  };

  const validate = () => {
    let valid = true;
    const jobErrors = [];
    const restaurantErrors = {};

    jobs.forEach((job, idx) => {
      const jobError = {};
      if (!job.typeOfStaff) {
        jobError.typeOfStaff = "Staff type is required";
        valid = false;
      }
      if (!job.numberOfStaff) {
        jobError.numberOfStaff = "Number of staff is required";
        valid = false;
      }
      if (!job.salaryRange) {
        jobError.salaryRange = "Salary range is required";
        valid = false;
      }
      if (!job.jobDetails.trim()) {
        jobError.jobDetails = "Job details are required";
        valid = false;
      }
      jobErrors[idx] = jobError;
    });

    if (!restaurant.name.trim()) {
      restaurantErrors.name = "Restaurant name is required";
      valid = false;
    }
    if (!restaurant.email.trim()) {
      restaurantErrors.email = "Email is required";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(restaurant.email)) {
        restaurantErrors.email = "Invalid email format";
        valid = false;
      }
    }
    if (!restaurant.contactNo.trim()) {
      restaurantErrors.contactNo = "Contact number is required";
      valid = false;
    } else {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(restaurant.contactNo.replace(/\D/g, ""))) {
        restaurantErrors.contactNo = "Invalid contact number";
        valid = false;
      }
    }
    if (!restaurant.city) {
      restaurantErrors.city = "City is required";
      valid = false;
    }
    if (!restaurant.address.trim()) {
      restaurantErrors.address = "Address is required";
      valid = false;
    }

    setErrors({ jobs: jobErrors, restaurant: restaurantErrors });
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill all the mandatory fields");
      return;
    }

    const jobsPayload = jobs.map(
      ({ typeOfStaff, numberOfStaff, salaryRange, jobDetails }) => ({
        typeOfStaff: typeOfStaff.value,
        numberOfStaff: numberOfStaff.value,
        salaryRange: salaryRange.value,
        jobDetails,
      })
    );

    const payload = {
      restaurant,
      jobs: jobsPayload,
    };

    try {
      const result = await addJobPost(payload);
      toast.success(result.message || "Job posting submitted!");
      setJobs([
        {
          typeOfStaff: null,
          numberOfStaff: null,
          salaryRange: null,
          jobDetails: "",
        },
      ]);
      setRestaurant({
        name: "",
        email: "",
        contactNo: "",
        body: "",
        address: "",
        city: "",
      });
      setErrors({ jobs: [], restaurant: {} });
    } catch (error) {
      toast.error("Failed to submit job posting");
    }
  };

  const removeJob = (index) => {
    if (jobs.length === 1) return;
    const newJobs = jobs.filter((_, i) => i !== index);
    setJobs(newJobs);

    const newJobErrors = errors.jobs.filter((_, i) => i !== index);
    setErrors({ ...errors, jobs: newJobErrors });
  };

  return (
    <section className="bg-white/30 backdrop-blur-md border border-yellow-300 rounded-xl p-5 space-y-6 max-w-4xl mx-auto shadow-lg">
      <h2 className="text-gray-900 text-2xl font-extrabold text-center mb-6 tracking-wide">
        Post Job Openings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {jobs.map((job, index) => (
          <div
            key={index}
            className="rounded-xl p-3 bg-white/70 shadow-md border border-gray-300 relative"
          >
            {jobs.length > 1 && (
              <button
                type="button"
                onClick={() => removeJob(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full flex justify-center items-center text-white text-xs font-bold w-5 h-5 z-50 cursor-pointer"
                aria-label={`Delete Job ${index + 1}`}
                title={`Delete Job ${index + 1}`}
              >
                <IoMdClose />
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Select
                  inputId={`typeOfStaff-${index}`}
                  options={typeOfStaffOptions}
                  value={job.typeOfStaff}
                  onChange={(selected) =>
                    handleJobChange(index, "typeOfStaff", selected)
                  }
                  styles={customStyles}
                  placeholder="Staff Type"
                  isSearchable
                />
                {errors.jobs[index]?.typeOfStaff && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.jobs[index].typeOfStaff}
                  </p>
                )}
              </div>

              <div>
                <Select
                  inputId={`numberOfStaff-${index}`}
                  options={numberOfStaffOptions}
                  value={job.numberOfStaff}
                  onChange={(selected) =>
                    handleJobChange(index, "numberOfStaff", selected)
                  }
                  styles={customStyles}
                  placeholder="No of Staff"
                  isSearchable={false}
                />
                {errors.jobs[index]?.numberOfStaff && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.jobs[index].numberOfStaff}
                  </p>
                )}
              </div>

              <div>
                <Select
                  inputId={`salaryRange-${index}`}
                  options={salaryRangeOptions}
                  value={job.salaryRange}
                  onChange={(selected) =>
                    handleJobChange(index, "salaryRange", selected)
                  }
                  styles={customStyles}
                  placeholder="Salary Range"
                  isSearchable={false}
                />
                {errors.jobs[index]?.salaryRange && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.jobs[index].salaryRange}
                  </p>
                )}
              </div>

              <div className="md:col-span-3">
                <input
                  id={`jobDetails-${index}`}
                  value={job.jobDetails}
                  onChange={(e) =>
                    handleJobChange(index, "jobDetails", e.target.value)
                  }
                  className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-0 text-sm ${
                    errors.jobs[index]?.jobDetails
                      ? "border-red-500"
                      : "border-[#ccc]"
                  }`}
                  placeholder="Describe the job responsibilities"
                />
                {errors.jobs[index]?.jobDetails && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.jobs[index].jobDetails}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addJob}
          className="bg-yellow-500 rounded-xl px-4 py-2 text-sm text-white cursor-pointer"
        >
          + Add Another Job
        </button>

        <h2 className="text-gray-900 text-2xl font-extrabold text-center mt-6 tracking-wide">
          Restaurant Details
        </h2>
        <div className="rounded-xl p-3 bg-white/70 shadow-md border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                label: "Name",
                id: "restaurantName",
                field: "name",
                type: "text",
                placeholder: "Restaurant Name",
              },
              {
                label: "Email ID",
                id: "restaurantEmail",
                field: "email",
                type: "email",
                placeholder: "you@example.com",
              },
              {
                label: "Contact No",
                id: "restaurantContact",
                field: "contactNo",
                type: "tel",
                placeholder: "+91 98765 43210",
              },
              {
                label: "City",
                id: "restaurantCity",
                field: "city",
                type: "text",
                placeholder: "City name",
              },
              {
                label: "Address",
                id: "restaurantAddress",
                field: "address",
                type: "text",
                placeholder: "Message Body",
              },
            ].map(({ label, id, field, type, placeholder }) => {
              if (field === "city") {
                return (
                  <div key={field}>
                    <Select
                      inputId={id}
                      options={cities}
                      value={
                        restaurant.city
                          ? cities.find(
                              (option) => option.value === restaurant.city
                            )
                          : null
                      }
                      onChange={(selected) =>
                        handleRestaurantChange(
                          "city",
                          selected ? selected.value : ""
                        )
                      }
                      styles={customStyles}
                      placeholder="Select City"
                      isSearchable
                    />
                    {errors.restaurant.city && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.restaurant.city}
                      </p>
                    )}
                  </div>
                );
              } else if (label === "Address") {
                return (
                  <div key={field} className="md:col-span-2">
                    <textarea
                      rows={4}
                      type={type}
                      id={id}
                      value={restaurant[field]}
                      onChange={(e) =>
                        handleRestaurantChange(field, e.target.value)
                      }
                      className={`w-full rounded-lg border p-3 focus:outline-none text-sm ${
                        errors.restaurant[field]
                          ? "border-red-500"
                          : "border-[#ccc]"
                      }`}
                      placeholder={placeholder}
                    />
                    {errors.restaurant[field] && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.restaurant[field]}
                      </p>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={field}>
                    <input
                      type={type}
                      id={id}
                      value={restaurant[field]}
                      onChange={(e) =>
                        handleRestaurantChange(field, e.target.value)
                      }
                      className={`w-full rounded-lg border p-3 focus:outline-none text-sm ${
                        errors.restaurant[field]
                          ? "border-red-500"
                          : "border-[#ccc]"
                      }`}
                      placeholder={placeholder}
                    />
                    {errors.restaurant[field] && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.restaurant[field]}
                      </p>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="text-center md:text-left mt-12">
          <p className="text-sm font-semibold text-gray-800  mb-5">
            By contacting us you agree to the
            <Link className="text-yellow-500 mx-2">Terms and Conditions</Link>
            and <Link className="text-yellow-500 mx-2">Privacy Policy</Link>
          </p>
          <button
            type="submit"
            className="bg-yellow-500 rounded-xl px-4 py-2 text-sm text-white cursor-pointer"
          >
            Submit Job Posting
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostJobForm;
