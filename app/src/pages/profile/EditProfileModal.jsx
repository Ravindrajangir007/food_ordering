import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FiCamera,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const EditProfileModal = ({ isOpen, onClose, currentUser }) => {
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    gender: currentUser?.gender || "",
    age: currentUser?.age || "",
    alternateMobile: currentUser?.alternateMobile || "",
    profilePic: currentUser?.profilePic || null,
  });

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      icon: FiUser,
      required: true,
      placeholder: "Enter your name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      icon: FiMail,
      required: true,
      placeholder: "Enter your email",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      icon: FiUsers,
      options: [
        { value: "", label: "Select gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      icon: FiCalendar,
      placeholder: "Enter your age",
    },
    {
      name: "phone",
      label: "Mobile Number",
      type: "text",
      icon: FiPhone,
      disabled: true,
      value: currentUser?.phone,
    },
    {
      name: "alternateMobile",
      label: "Alternate Mobile",
      type: "text",
      icon: FiPhone,
      placeholder: "Enter alternate mobile number",
    },
  ];

  const renderInput = (field) => {
    const commonClasses = `mt-1 block w-full rounded-xl border p-3 pl-10 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-all duration-200 ${
      errors[field.name] ? "border-red-500" : "border-gray-300"
    }`;

    return (
      <div key={field.name} className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          {field.type === "select" ? (
            <select
              name={field.name}
              value={profileData[field.name]}
              onChange={handleChange}
              className={commonClasses}
              disabled={field.disabled}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={field.disabled ? field.value : profileData[field.name]}
              onChange={handleChange}
              className={commonClasses}
              placeholder={field.placeholder}
              disabled={field.disabled}
            />
          )}
        </div>
        <AnimatePresence>
          {errors[field.name] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1 text-xs text-red-500"
            >
              {errors[field.name]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const [previewImage, setPreviewImage] = useState(
    currentUser?.profilePic || null
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!profileData.name) newErrors.name = "Name is required";
    if (!profileData.email) newErrors.email = "Email is required";
    if (profileData.email && !/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (profileData.age && (isNaN(profileData.age) || profileData.age < 1)) {
      newErrors.age = "Please enter a valid age";
    }
    if (
      profileData.alternateMobile &&
      !/^\d{10}$/.test(profileData.alternateMobile)
    ) {
      newErrors.alternateMobile = "Please enter a valid 10-digit mobile number";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profilePic: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the form errors");
      return;
    }

    // Handle form submission
    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-lg font-medium text-white">
                      Edit Profile
                    </Dialog.Title>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="rounded-full p-1 text-white/80 hover:text-white hover:bg-white/20"
                    >
                      <FiX className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                  {/* Profile Picture */}
                  <div className="flex justify-center -mt-10 mb-6">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-28 h-28 rounded-full overflow-hidden bg-white shadow-lg border-4 border-white">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-yellow-100 text-4xl font-bold text-yellow-500">
                            {profileData.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-4 border-white transition-transform hover:scale-110">
                        <FiCamera className="text-white w-5 h-5" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </motion.div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {inputFields.map(renderInput)}
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-medium shadow-lg flex items-center justify-center gap-2"
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProfileModal;
