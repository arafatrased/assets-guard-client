import React from "react";

const PackageCard = ({ title, employees, price }) => {
  return (
    <div className="bg-gradient-to-r from-white to-orange-100 font-mono shadow-lg rounded-lg p-6 text-center">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-green-700 font-bold mb-4">Maximum {employees} employees</p>
      <p className="text-gray-600 mb-4 text-justify">You can add whatever number of Employee to extend your company potentiality to manage assets. Here adding this plan will extend the existing access numbers.</p>
      <p className="text-2xl font-semibold text-blue-500 mb-4">${price}</p>
      <button className="btn btn-outline border-b-4 border-b-orange-200">
        Choose Plan
      </button>
    </div>
  );
};

const PackagesSection = () => {
  const packages = [
    { title: "Basic Plan", employees: 5, price: 5 },
    { title: "Standard Plan", employees: 10, price: 8 },
    { title: "Premium Plan", employees: 20, price: 15 },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-mono uppercase mb-8">Our Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <PackageCard
              key={index}
              title={pkg.title}
              employees={pkg.employees}
              price={pkg.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
