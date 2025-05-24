export const config = {
  API_BASE_URL: "http://localhost/projects/foodieHub/api",
  IMAGE_URL: "http://localhost/projects/foodieHub/",
};

export const VegMark = () => (
  <div className="p-1 rounded-md text-center  inline-flex">
    <div className="inline-flex items-center justify-center border-2 border-yellow-600 rounded w-4 h-4">
      <span className="w-2 h-2 rounded-full bg-yellow-600 block"></span>
    </div>
  </div>
);

export const NonVegMark = () => (
  <div className="p-1 rounded-md text-center  inline-flex">
    <div className="inline-flex items-center justify-center border-2 border-red-600 rounded w-4 h-4">
      <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-l-transparent border-r-transparent border-b-red-600"></span>
    </div>
  </div>
);
