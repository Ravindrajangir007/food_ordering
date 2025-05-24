import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [reviewData, setReviewData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!reviewData.name) newErrors.name = "Name is required";
    if (!reviewData.rating) newErrors.rating = "Rating is required";
    if (!reviewData.comment) newErrors.comment = "Comment is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setReviewData({ ...reviewData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the form errors");
      return;
    }

    onSubmit(reviewData);
    toast.success("Review submitted successfully!");
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
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed bottom-0 left-0 right-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform overflow-hidden rounded-t-2xl bg-white p-4 shadow-xl transition-all">
                <Dialog.Title as="div" className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Write a Review
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500 cursor-pointer"
                    >
                      {/* <XMarkIcon className="h-6 w-6" /> */}X
                    </button>
                  </div>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name*
                      <input
                        type="text"
                        name="name"
                        value={reviewData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rating*
                      <div className="flex space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            className={`p-2 text-3xl ${
                              reviewData.rating >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            onClick={() => handleRatingChange(star)}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      {errors.rating && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rating}
                        </p>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Comment*
                      <textarea
                        name="comment"
                        value={reviewData.comment}
                        onChange={handleChange}
                        rows="3"
                        className={`mt-1 block w-full rounded-md border p-2 focus:ring-indigo-500 sm:text-sm ${
                          errors.comment ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Share your experience..."
                      />
                      {errors.comment && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.comment}
                        </p>
                      )}
                    </label>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-md w-full"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewModal;
