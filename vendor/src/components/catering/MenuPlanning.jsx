import { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import NewMenuModal from "./NewMenuModal";
import NewMealTypeModal from "./NewMealTypeModal";
import ConfirmationModal from "../common/ConfirmationModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SPICE_LEVELS = {
  MILD: "mild",
  MEDIUM: "medium",
  SPICY: "spicy",
  EXTRA_SPICY: "extra_spicy",
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// const initialWeeklyMenu = {
//   Monday: {
//     breakfast: [
//       { id: 1, name: "Poha", servingSize: "200g", price: 30, calories: 250 },
//       {
//         id: 2,
//         name: "Boiled Eggs",
//         servingSize: "2 pieces",
//         price: 20,
//         calories: 160,
//       },
//     ],
//     lunch: [
//       {
//         id: 3,
//         name: "Dal Fry",
//         servingSize: "150g",
//         price: 40,
//         calories: 180,
//       },
//       { id: 4, name: "Rice", servingSize: "200g", price: 25, calories: 280 },
//       {
//         id: 5,
//         name: "Mixed Vegetable",
//         servingSize: "150g",
//         price: 35,
//         calories: 120,
//       },
//     ],
//     snacks: [
//       {
//         id: 6,
//         name: "Samosa",
//         servingSize: "2 pieces",
//         price: 20,
//         calories: 300,
//       },
//       { id: 7, name: "Tea", servingSize: "1 cup", price: 10, calories: 50 },
//     ],
//   },
//   // Initialize other days with empty arrays
//   Tuesday: { breakfast: [], lunch: [], snacks: [] },
//   Wednesday: { breakfast: [], lunch: [], snacks: [] },
//   Thursday: { breakfast: [], lunch: [], snacks: [] },
//   Friday: { breakfast: [], lunch: [], snacks: [] },
//   Saturday: { breakfast: [], lunch: [], snacks: [] },
// };

const initialWeeklyMenu = {
  Monday: {
    breakfast: [
      {
        id: 1,
        name: "Poha",
        servingSize: "200g",
        price: 30,
        calories: 250,
        isVeg: true,
        description: "Light and fluffy flattened rice with peanuts and herbs",
        allergens: "peanuts",
        preparationTime: 15,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
      {
        id: 2,
        name: "Boiled Eggs",
        servingSize: "2 pieces",
        price: 20,
        calories: 160,
        isVeg: false,
        description: "Fresh farm eggs boiled to perfection",
        allergens: "eggs",
        preparationTime: 10,
        available: true,
        spiceLevel: SPICE_LEVELS.EXTRA_SPICY,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    lunch: [
      {
        id: 3,
        name: "Dal Fry",
        servingSize: "150g",
        price: 40,
        calories: 180,
        isVeg: true,
        description: "Creamy yellow lentils tempered with Indian spices",
        allergens: "",
        preparationTime: 25,
        available: true,
        spiceLevel: SPICE_LEVELS.MEDIUM,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
      {
        id: 4,
        name: "Rice",
        servingSize: "200g",
        price: 25,
        calories: 280,
        isVeg: true,
        description: "Steamed basmati rice",
        allergens: "",
        preparationTime: 20,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
      {
        id: 5,
        name: "Mixed Vegetable",
        servingSize: "150g",
        price: 35,
        calories: 120,
        isVeg: true,
        description: "Seasonal vegetables cooked with Indian spices",
        allergens: "",
        preparationTime: 20,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    snacks: [
      {
        id: 6,
        name: "Samosa",
        servingSize: "2 pieces",
        price: 20,
        calories: 300,
        isVeg: true,
        description: "Crispy pastry filled with spiced potatoes and peas",
        allergens: "gluten",
        preparationTime: 30,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
      {
        id: 7,
        name: "Tea",
        servingSize: "1 cup",
        price: 10,
        calories: 50,
        isVeg: true,
        description: "Indian masala tea with milk",
        allergens: "milk",
        preparationTime: 5,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
  },
  Tuesday: {
    breakfast: [
      {
        id: 8,
        name: "Idli Sambar",
        servingSize: "4 pieces",
        price: 40,
        calories: 220,
        isVeg: true,
        description: "Steamed rice cakes served with lentil soup",
        allergens: "",
        preparationTime: 20,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
      {
        id: 9,
        name: "Coconut Chutney",
        servingSize: "50g",
        price: 15,
        calories: 100,
        isVeg: true,
        description: "Fresh coconut chutney with herbs",
        allergens: "coconut",
        preparationTime: 10,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    lunch: [
      {
        id: 10,
        name: "Chicken Curry",
        servingSize: "200g",
        price: 120,
        calories: 320,
        isVeg: false,
        description: "Tender chicken cooked in rich gravy",
        allergens: "",
        preparationTime: 35,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
      {
        id: 11,
        name: "Jeera Rice",
        servingSize: "200g",
        price: 35,
        calories: 290,
        isVeg: true,
        description: "Basmati rice tempered with cumin",
        allergens: "",
        preparationTime: 20,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    snacks: [
      {
        id: 12,
        name: "Vada Pav",
        servingSize: "1 piece",
        price: 25,
        calories: 280,
        isVeg: true,
        description: "Spiced potato fritter in a bun",
        allergens: "gluten",
        preparationTime: 15,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
  },
  Wednesday: {
    breakfast: [
      {
        id: 13,
        name: "Aloo Paratha",
        servingSize: "2 pieces",
        price: 45,
        calories: 350,
        isVeg: true,
        description: "Whole wheat flatbread stuffed with spiced potatoes",
        allergens: "gluten",
        preparationTime: 20,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
      {
        id: 14,
        name: "Curd",
        servingSize: "100g",
        price: 20,
        calories: 80,
        isVeg: true,
        description: "Fresh homemade yogurt",
        allergens: "milk",
        preparationTime: 5,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    lunch: [
      {
        id: 15,
        name: "Paneer Butter Masala",
        servingSize: "200g",
        price: 130,
        calories: 380,
        isVeg: true,
        description: "Cottage cheese in rich tomato gravy",
        allergens: "milk",
        preparationTime: 30,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
      {
        id: 16,
        name: "Naan",
        servingSize: "2 pieces",
        price: 40,
        calories: 260,
        isVeg: true,
        description: "Butter naan bread",
        allergens: "gluten, milk",
        preparationTime: 15,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    snacks: [
      {
        id: 17,
        name: "Masala Dosa",
        servingSize: "1 piece",
        price: 50,
        calories: 280,
        isVeg: true,
        description: "Crispy rice crepe with spiced potato filling",
        allergens: "",
        preparationTime: 20,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
  },
  Thursday: {
    breakfast: [
      {
        id: 18,
        name: "Upma",
        servingSize: "200g",
        price: 35,
        calories: 240,
        isVeg: true,
        description: "Savory semolina porridge with vegetables",
        allergens: "",
        preparationTime: 15,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    lunch: [
      {
        id: 19,
        name: "Fish Curry",
        servingSize: "200g",
        price: 140,
        calories: 280,
        isVeg: false,
        description: "Fresh fish cooked in coconut gravy",
        allergens: "fish, coconut",
        preparationTime: 30,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    snacks: [
      {
        id: 20,
        name: "Bhel Puri",
        servingSize: "150g",
        price: 30,
        calories: 220,
        isVeg: true,
        description: "Puffed rice with tangy chutneys",
        allergens: "peanuts",
        preparationTime: 10,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
  },
  Friday: {
    breakfast: [
      {
        id: 21,
        name: "Uttapam",
        servingSize: "2 pieces",
        price: 45,
        calories: 280,
        isVeg: true,
        description: "Thick rice pancake with vegetables",
        allergens: "",
        preparationTime: 20,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    lunch: [
      {
        id: 22,
        name: "Biryani",
        servingSize: "300g",
        price: 150,
        calories: 450,
        isVeg: false,
        description: "Fragrant rice with spiced meat",
        allergens: "",
        preparationTime: 45,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    snacks: [
      {
        id: 23,
        name: "Pakora",
        servingSize: "150g",
        price: 35,
        calories: 280,
        isVeg: true,
        description: "Assorted vegetable fritters",
        allergens: "gluten",
        preparationTime: 15,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
  },
  Saturday: {
    breakfast: [
      {
        id: 24,
        name: "Puri Bhaji",
        servingSize: "4 pieces",
        price: 50,
        calories: 380,
        isVeg: true,
        description: "Deep fried bread with potato curry",
        allergens: "gluten",
        preparationTime: 25,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    lunch: [
      {
        id: 25,
        name: "Thali",
        servingSize: "Full plate",
        price: 180,
        calories: 850,
        isVeg: true,
        description: "Complete Indian meal with variety of dishes",
        allergens: "milk, gluten",
        preparationTime: 30,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
    snacks: [
      {
        id: 26,
        name: "Pav Bhaji",
        servingSize: "1 plate",
        price: 60,
        calories: 320,
        isVeg: true,
        description: "Spiced vegetable mash with buttered buns",
        allergens: "milk, gluten",
        preparationTime: 20,
        available: true,
        spiceLevel: SPICE_LEVELS.MILD,
        updatedAt: "2025-03-28 07:41:06",
        updatedBy: "Ravindrajangir007",
      },
    ],
  },
};

export default function MenuPlanning() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isMenuModalOpen, setIsMenuModalOpen] = useState({
    status: false,
    currentDay: "",
    mealType: "",
  });

  const [weeklyMenu, setWeeklyMenu] = useState(initialWeeklyMenu);

  const [mealTypeModalOpen, setMealTypeModalOpen] = useState(false);
  const [editingMealType, setEditingMealType] = useState(null);
  const [mealTypes, setMealTypes] = useState([
    { id: "breakfast", name: "Breakfast", time: "08:00 AM - 09:00 AM" },
    { id: "lunch", name: "Lunch", time: "12:30 PM - 02:00 PM" },
    { id: "snacks", name: "Snacks", time: "04:30 PM - 05:30 PM" },
  ]);

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    itemToDelete: null,
    mealTypeId: null,
  });
  const [publishConfirmation, setPublishConfirmation] = useState(false);

  const [mealTypeDeleteConfirmation, setMealTypeDeleteConfirmation] = useState({
    isOpen: false,
    mealType: null,
  });

  // Publish menu
  const handlePublishMenu = () => {
    // Add your API call here
    console.log("Publishing menu:", weeklyMenu);
    toast.success("Menu published successfully");
  };

  const handleAddMealType = (data) => {
    const newMealType = {
      id: data.name.toLowerCase().replace(/\s+/g, "_"),
      name: data.name,
      time: data.time,
    };

    setMealTypes((prev) => [...prev, newMealType]);

    // Update weeklyMenu structure to include new meal type
    setWeeklyMenu((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((day) => {
        updated[day] = {
          ...updated[day],
          [newMealType.id]: [],
        };
      });
      return updated;
    });

    setMealTypeModalOpen(false);
    toast.success("Meal type added successfully");
  };

  const handleEditMealType = (data) => {
    const oldId = editingMealType.id;
    const newId = data.name.toLowerCase().replace(/\s+/g, "_");

    setMealTypes((prev) =>
      prev.map((mt) =>
        mt.id === oldId
          ? {
              ...mt,
              id: newId,
              name: data.name,
              time: data.time,
            }
          : mt
      )
    );

    // Update weeklyMenu structure if ID changed
    if (oldId !== newId) {
      setWeeklyMenu((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((day) => {
          updated[day][newId] = updated[day][oldId];
          delete updated[day][oldId];
        });
        return updated;
      });
    }

    setMealTypeModalOpen(false);
    setEditingMealType(null);
    toast.success("Meal type updated successfully");
  };

  // const handleDeleteMealType = (mealTypeId) => {
  //   if (mealTypes.length <= 1) {
  //     toast.error("Cannot delete the last meal type");
  //     return;
  //   }

  //   setMealTypes((prev) => prev.filter((mt) => mt.id !== mealTypeId));

  //   // Remove meal type from weeklyMenu
  //   setWeeklyMenu((prev) => {
  //     const updated = { ...prev };
  //     Object.keys(updated).forEach((day) => {
  //       delete updated[day][mealTypeId];
  //     });
  //     return updated;
  //   });

  //   toast.success("Meal type deleted successfully");
  // };

  const handleAddEvent = (formData) => {
    const currentDay = selectedDay; // Using the selected day directly
    const mealTypeId = mealTypes.find(
      (type) => type.name === formData.mealType
    )?.id;

    if (!mealTypeId) {
      toast.error("Invalid meal type");
      return;
    }

    const newId =
      Math.max(
        ...weeklyMenu[currentDay][mealTypeId]
          .map((item) => item.id)
          .concat([0]),
        0
      ) + 1;

    const menuItem = {
      id: newId,
      name: formData.name,
      servingSize: formData.servingSize,
      price: formData.price,
      calories: formData.calories,
      description: formData.description,
      isVeg: formData.isVeg,
      allergens: formData.allergens,
      preparationTime: formData.preparationTime,
    };

    setWeeklyMenu((prev) => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        [mealTypeId]: [...prev[currentDay][mealTypeId], menuItem],
      },
    }));

    setIsMenuModalOpen({ status: false, currentDay: "", mealType: "" });
    toast.success("Menu item added successfully!");
  };

  // Handle edit menu item
  const handleEditItem = (mealTypeId, item) => {
    setIsMenuModalOpen({
      status: true,
      currentDay: selectedDay,
      mealType: mealTypes.find((type) => type.id === mealTypeId)?.name,
      editItem: item,
    });
  };

  const handleDeleteItem = (mealTypeId, itemId) => {
    setWeeklyMenu((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [mealTypeId]: prev[selectedDay][mealTypeId].filter(
          (item) => item.id !== itemId
        ),
      },
    }));

    setDeleteConfirmation({
      isOpen: false,
      itemToDelete: null,
      mealTypeId: null,
    });

    // Log the deletion
    console.log(
      `Item deleted by ${currentUser} at ${new Date().toISOString()}`
    );
    toast.success("Item deleted successfully");
  };

  const handleDeleteClick = (mealTypeId, item) => {
    setDeleteConfirmation({
      isOpen: true,
      itemToDelete: item,
      mealTypeId: mealTypeId,
    });
  };

  const handleDeleteMealType = (mealTypeId) => {
    if (mealTypes.length <= 1) {
      toast.error("Cannot delete the last meal type");
      return;
    }

    // Check if there are any menu items in this meal type across all days
    const hasMenuItems = Object.values(weeklyMenu).some(
      (day) => day[mealTypeId] && day[mealTypeId].length > 0
    );

    if (hasMenuItems) {
      // Remove all menu items for this meal type
      setWeeklyMenu((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((day) => {
          if (updated[day][mealTypeId]) {
            updated[day][mealTypeId] = [];
          }
        });
        return updated;
      });
    }

    // Remove the meal type
    setMealTypes((prev) => prev.filter((mt) => mt.id !== mealTypeId));

    // Remove meal type from weeklyMenu structure
    setWeeklyMenu((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((day) => {
        delete updated[day][mealTypeId];
      });
      return updated;
    });

    toast.success("Meal type deleted successfully");
  };

  return (
    <div className="">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu Planning</h2>
          <p className="mt-1 text-sm text-gray-500">
            Plan and manage weekly meal schedules
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            type="button"
            onClick={() => {
              setEditingMealType(null);
              setMealTypeModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Meal Type
          </button>
          <button
            type="button"
            onClick={() => setPublishConfirmation(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Publish Menu
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <Tab.Group
          selectedIndex={daysOfWeek.indexOf(selectedDay)}
          onChange={(index) => setSelectedDay(daysOfWeek[index])}
        >
          <Tab.List className="flex border-b border-gray-200">
            {daysOfWeek.map((day) => (
              <Tab
                key={day}
                className={({ selected }) =>
                  classNames(
                    "w-full py-4 text-sm font-medium text-center focus:outline-none cursor-pointer",
                    selected
                      ? "border-b-2 border-indigo-500 text-indigo-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )
                }
              >
                {day}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {daysOfWeek.map((day) => (
              <Tab.Panel
                key={day}
                className="focus:outline-none divide-y divide-gray-200"
              >
                {mealTypes.map((mealType) => (
                  <div key={mealType.id} className="mb-8 last:mb-0 p-4 ">
                    {/* <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {mealType.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {mealType.time}
                        </div>
                      </div>
                      <div className="flex justify-end items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center p-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                          onClick={() =>
                            setIsMenuModalOpen({
                              status: true,
                              currentDay: selectedDay,
                              mealType: mealType.name,
                            })
                          }
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div> */}

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {mealType.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {mealType.time}
                        </div>
                      </div>
                      <div className="flex justify-end items-center gap-2">
                        {/* Edit Meal Type Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMealType(mealType);
                            setMealTypeModalOpen(true);
                          }}
                          className="inline-flex items-center p-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>

                        {/* Delete Meal Type Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setMealTypeDeleteConfirmation({
                              isOpen: true,
                              mealType: mealType,
                            })
                          }
                          className="inline-flex items-center p-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>

                        {/* Add Menu Item Button */}
                        <button
                          type="button"
                          className="inline-flex items-center p-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                          onClick={() =>
                            setIsMenuModalOpen({
                              status: true,
                              currentDay: selectedDay,
                              mealType: mealType.name,
                            })
                          }
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Item
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Type
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Serving Size
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Spice Level
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Calories
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {weeklyMenu[day]?.[mealType.id]?.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {item.name}
                                    </div>
                                    {item.description && (
                                      <div className="text-xs text-gray-500">
                                        {item.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    item.isVeg
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {item.isVeg ? "Veg" : "Non-veg"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.servingSize}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    item.spiceLevel === SPICE_LEVELS.MILD
                                      ? "bg-green-100 text-green-800"
                                      : item.spiceLevel === SPICE_LEVELS.MEDIUM
                                      ? "bg-yellow-100 text-yellow-800"
                                      : item.spiceLevel === SPICE_LEVELS.SPICY
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {item.spiceLevel.charAt(0).toUpperCase() +
                                    item.spiceLevel.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.calories} kcal
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditItem(mealType.id, item)
                                  }
                                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteClick(mealType.id, item)
                                  }
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {weeklyMenu[day]?.[mealType.id]?.length === 0 && (
                            <tr>
                              <td
                                colSpan="5"
                                className="px-6 py-4 text-center text-sm text-gray-500"
                              >
                                No items added yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <NewMealTypeModal
        isOpen={mealTypeModalOpen}
        onClose={() => {
          setMealTypeModalOpen(false);
          setEditingMealType(null);
        }}
        onSubmit={editingMealType ? handleEditMealType : handleAddMealType}
        mealType={editingMealType}
      />
      <NewMenuModal
        isOpen={isMenuModalOpen.status}
        day={selectedDay}
        onClose={() =>
          setIsMenuModalOpen({ status: false, currentDay: "", mealType: "" })
        }
        onSubmit={handleAddEvent}
        mealType={isMenuModalOpen.mealType}
        menuItem={isMenuModalOpen.editItem}
      />

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({
            isOpen: false,
            itemToDelete: null,
            mealTypeId: null,
          })
        }
        onConfirm={() => {
          if (
            deleteConfirmation.itemToDelete &&
            deleteConfirmation.mealTypeId
          ) {
            handleDeleteItem(
              deleteConfirmation.mealTypeId,
              deleteConfirmation.itemToDelete.id
            );
          }
        }}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${deleteConfirmation.itemToDelete?.name}"? This action cannot be undone.`}
      />

      <ConfirmationModal
        isOpen={publishConfirmation}
        onClose={() => setPublishConfirmation(false)}
        onConfirm={() => {
          handlePublishMenu();
          setPublishConfirmation(false);
        }}
        title="Publish Menu"
        message="Are you sure you want to publish the menu? This will make it visible to all users."
      />

      {/* Add this with your other modals */}
      <ConfirmationModal
        isOpen={mealTypeDeleteConfirmation.isOpen}
        onClose={() =>
          setMealTypeDeleteConfirmation({ isOpen: false, mealType: null })
        }
        onConfirm={() => {
          if (mealTypeDeleteConfirmation.mealType) {
            handleDeleteMealType(mealTypeDeleteConfirmation.mealType.id);
            setMealTypeDeleteConfirmation({ isOpen: false, mealType: null });
          }
        }}
        title="Delete Meal Type"
        message={`Are you sure you want to delete "${mealTypeDeleteConfirmation.mealType?.name}"? This will delete all menu items associated with this meal type. This action cannot be undone.`}
      />
    </div>
  );
}
