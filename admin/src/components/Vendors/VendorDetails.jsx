import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default icon issue in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
});

const sampleVendor = {
  id: 1,
  token: "abc123",
  business_name: "Fresh Fruits Co.",
  slug: "fresh-fruits-co",
  owner_name: "John Doe",
  phone: "9876543210",
  email: "john@example.com",
  logo: "",
  profile_pic: "",
  password: "hashed_password",
  latitude: 12.9716,
  longitude: 77.5946,
  line1: "123 Green Street",
  line2: "Suite 5",
  city: "Cityville",
  state: "Stateville",
  pincode: "560001",
  delivery_radius: 10,
  delivery_days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  account_holder_name: "John Doe",
  account_number: "1234567890",
  ifsc_code: "IFSC0001",
  bank_name: "Bank A",
  branch_name: "Main Branch",
  cancelled_cheque: "",
  fssai_number: "FSSAI12345",
  fssai_license: "",
  gst_number: "GST123456",
  gst_certificate: "",
  pan_number: "PAN123456",
  pan_card: "",
  shop_license: "",
  address_proof: "",
  isVeg: true,
  status: "active",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-05-01T12:00:00Z",
};

const sampleStats = {
  total_customers: 120,
  total_orders: 350,
  avg_order_value: 180,
  trending_dishes: [
    { name: "Apple Basket", orders: 120 },
    { name: "Banana Bunch", orders: 90 },
    { name: "Orange Juice", orders: 75 },
  ],
};

const sampleOrders = [
  {
    id: 101,
    items: 2,
    order_date: "2024-05-01",
    total_amount: 150,
    status: "completed",
  },
  {
    id: 102,
    items: 2,
    order_date: "2024-05-03",
    total_amount: 200,
    status: "pending",
  },
];

const samplePayments = [
  {
    id: 1,
    date: "2024-05-05",
    amount: 300,
    status: "settled",
  },
  {
    id: 2,
    date: "2024-05-10",
    amount: 150,
    status: "pending",
  },
];

const sampleMenu = [
  { id: 1, name: "Apple Basket", price: 120, category: "Fruits" },
  { id: 2, name: "Banana Bunch", price: 90, category: "Fruits" },
  { id: 3, name: "Orange Juice", price: 75, category: "Beverages" },
];

const VendorDetails = () => {
  const [activeTab, setActiveTab] = useState("vendorDetails");

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate">
          Vendor Details - {sampleVendor.business_name}
        </h2>

        <span
          className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            sampleVendor.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {sampleVendor.status.charAt(0).toUpperCase() +
            sampleVendor.status.slice(1)}
        </span>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
        <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
          <p className="text-4xl font-extrabold text-yellow-600">
            {sampleStats.total_customers}
          </p>
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Total Customers
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
          <p className="text-4xl font-extrabold text-yellow-600">
            {sampleStats.total_orders}
          </p>
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Total Orders
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
          <p className="text-4xl font-extrabold text-yellow-600">
            ₹{sampleStats.avg_order_value}
          </p>
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Avg Order Value
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 text-center shadow">
          <p className="text-4xl font-extrabold text-yellow-600">
            ₹{sampleStats.avg_order_value}
          </p>
          <p className="text-gray-700 mt-2 text-lg font-semibold">
            Total Revenue
          </p>
        </div>
      </section>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-10">
        {/* Tabs */}
        <nav className="flex border-b border-gray-300 mb-8 space-x-8 flex-wrap">
          {[
            { id: "vendorDetails", label: "Vendor Details" },
            { id: "kycDocuments", label: "KYC Documents" },
            { id: "bankDetails", label: "Bank Details" },
            { id: "address", label: "Address" },
            { id: "orders", label: "Orders" },
            { id: "payments", label: "Payment Settlements" },
            { id: "menu", label: "Menu" },
            {
              /* New tab added */
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 font-semibold text-lg transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "text-yellow-600 border-b-4 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div>
          {activeTab === "vendorDetails" && (
            <section className="bg-gray-50 rounded-xl p-8 shadow-inner">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Vendor Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 text-lg">
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Vendor ID:</span>{" "}
                    {sampleVendor.id}
                  </p>

                  <p>
                    <span className="font-semibold">Business Name:</span>{" "}
                    {sampleVendor.business_name}
                  </p>

                  <p>
                    <span className="font-semibold">Owner Name:</span>{" "}
                    {sampleVendor.owner_name}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {sampleVendor.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {sampleVendor.email}
                  </p>
                </div>

                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Delivery Radius (km):</span>{" "}
                    {sampleVendor.delivery_radius}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery Days:</span>{" "}
                    {sampleVendor.delivery_days.join(", ")}
                  </p>
                </div>

                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(sampleVendor.created_at).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Updated At:</span>{" "}
                    {new Date(sampleVendor.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === "kycDocuments" && (
            <section className="bg-gray-50 rounded-xl p-8 shadow-inner">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                KYC Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-lg">
                {[
                  {
                    label: "Cancelled Cheque",
                    value: sampleVendor.cancelled_cheque,
                  },
                  { label: "FSSAI License", value: sampleVendor.fssai_license },
                  {
                    label: "GST Certificate",
                    value: sampleVendor.gst_certificate,
                  },
                  { label: "PAN Card", value: sampleVendor.pan_card },
                  { label: "Shop License", value: sampleVendor.shop_license },
                  { label: "Address Proof", value: sampleVendor.address_proof },
                ].map(({ label, value }) => (
                  <p key={label}>
                    <span className="font-semibold">{label}:</span>{" "}
                    {value ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:underline"
                      >
                        View Document
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                ))}
              </div>
            </section>
          )}

          {activeTab === "bankDetails" && (
            <section className="bg-gray-50 rounded-xl p-8 shadow-inner">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Bank Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-lg">
                <p>
                  <span className="font-semibold">Account Holder Name:</span>{" "}
                  {sampleVendor.account_holder_name}
                </p>
                <p>
                  <span className="font-semibold">Account Number:</span>{" "}
                  {sampleVendor.account_number}
                </p>
                <p>
                  <span className="font-semibold">IFSC Code:</span>{" "}
                  {sampleVendor.ifsc_code}
                </p>
                <p>
                  <span className="font-semibold">Bank Name:</span>{" "}
                  {sampleVendor.bank_name}
                </p>
                <p>
                  <span className="font-semibold">Branch Name:</span>{" "}
                  {sampleVendor.branch_name}
                </p>
              </div>
            </section>
          )}

          {activeTab === "address" && (
            <section className="bg-gray-50 rounded-xl p-8 shadow-inner space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Address Details
              </h2>
              <div className="text-gray-700 text-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p>
                    <span className="font-semibold">Address Line 1:</span>{" "}
                    {sampleVendor.line1}
                  </p>
                  <p>
                    <span className="font-semibold">Address Line 2:</span>{" "}
                    {sampleVendor.line2 || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">City:</span>{" "}
                    {sampleVendor.city}
                  </p>
                  <p>
                    <span className="font-semibold">State:</span>{" "}
                    {sampleVendor.state}
                  </p>
                  <p>
                    <span className="font-semibold">Pincode:</span>{" "}
                    {sampleVendor.pincode}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery Radius (km):</span>{" "}
                    {sampleVendor.delivery_radius}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery Days:</span>{" "}
                    {sampleVendor.delivery_days.join(", ")}
                  </p>
                </div>
                <div className="h-80 rounded-lg overflow-hidden shadow">
                  <MapContainer
                    center={[sampleVendor.latitude, sampleVendor.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-full w-full rounded-lg"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[sampleVendor.latitude, sampleVendor.longitude]}
                    >
                      <Popup>
                        {sampleVendor.business_name} <br /> {sampleVendor.line1}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </section>
          )}

          {activeTab === "orders" && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Order History
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Order ID",
                        "Items",
                        "Date",
                        "Total Amount",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-yellow-50 cursor-pointer transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(order.order_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          ₹{order.total_amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "payments" && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Payment Settlements
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Payment ID", "Date", "Amount", "Status"].map(
                        (header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {samplePayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="hover:bg-yellow-50 cursor-pointer transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          ₹{payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              payment.status === "settled"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {payment.status.charAt(0).toUpperCase() +
                              payment.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "menu" && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Menu</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["ID", "Name", "Price", "Category"].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleMenu.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-yellow-50 cursor-pointer transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          ₹{item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {item.category}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
