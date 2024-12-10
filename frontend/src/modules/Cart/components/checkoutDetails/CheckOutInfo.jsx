import React, { useState } from "react";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

const CheckoutInfo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    contactInfo: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    shippingAddress: {
      streetNumber: "",
      country: "",
      townCity: "",
      state: "",
      zipCode: "",
    },
    paymentMethod: {
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (section, field) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear errors for the field if any
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${section}.${field}`]: "",
    }));
  };

  const validateFields = () => {
    const mandatoryFields = [
      { section: "contactInfo", field: "firstName", label: "First Name" },
      { section: "contactInfo", field: "email", label: "Email" },
      {
        section: "shippingAddress",
        field: "streetNumber",
        label: "Street Number",
      },
      { section: "shippingAddress", field: "country", label: "Country" },
      { section: "paymentMethod", field: "cardNumber", label: "Card Number" },
    ];

    const newErrors = {};
    mandatoryFields.forEach(({ section, field, label }) => {
      if (!formData[section][field]) {
        newErrors[`${section}.${field}`] = `${label} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      // Redirect to home page if no errors
      navigate("/cart/order-confirmation");
    }
  };

  const sections = [
    {
      title: "Contact Information",
      fields: [
        {
          section: "contactInfo",
          key: "phoneNumber",
          label: "Phone Number",
          type: "text",
        },
        { section: "contactInfo", key: "email", label: "Email", type: "text" },
      ],
      inlineFields: [
        {
          section: "contactInfo",
          key: "firstName",
          label: "First Name",
          type: "text",
        },
        {
          section: "contactInfo",
          key: "lastName",
          label: "Last Name",
          type: "text",
        },
      ],
    },
    {
      title: "Shipping Address",
      fields: [
        {
          section: "shippingAddress",
          key: "streetNumber",
          label: "Street Number",
          type: "number",
        },
        {
          section: "shippingAddress",
          key: "country",
          label: "Country",
          type: "text",
        },
        {
          section: "shippingAddress",
          key: "townCity",
          label: "Town/City",
          type: "text",
        },
        {
          section: "shippingAddress",
          key: "state",
          label: "State",
          type: "text",
        },
        {
          section: "shippingAddress",
          key: "zipCode",
          label: "Zip Code",
          type: "number",
        },
      ],
    },
    {
      title: "Payment Method",
      fields: [
        {
          section: "paymentMethod",
          key: "cardNumber",
          label: "Card Number",
          type: "number",
        },
      ],
      inlineFields: [
        {
          section: "paymentMethod",
          key: "expirationDate",
          label: "Expiration Date",
          type: "number",
        },
        { section: "paymentMethod", key: "cvc", label: "CVC", type: "number" },
      ],
    },
  ];

  console.log("formData", formData);

  return (
    <div className="container mx-auto p-4">
      {sections.map(({ title, fields, inlineFields }) => (
        <section
          key={title}
          className="mb-6 border border-[#6C7275] rounded-sm p-[24px]"
        >
          <h2 className="text-2xl font-medium text-left mb-4">{title}</h2>

          {/* Inline Fields */}
          {inlineFields && (
            <div className="flex gap-4 mb-4">
              {inlineFields.map(({ section, key, label, type }) => (
                <div key={key} className="flex-1">
                  <Label
                    htmlFor={key}
                    className="block mb-2 text-[12px] text-[#6C7275] text-left uppercase"
                  >
                    {label}
                  </Label>
                  <Input
                    id={key}
                    placeholder={label}
                    value={formData[section][key]}
                    onChange={handleInputChange(section, key)}
                    type={type}
                    className="h-[40px]"
                  />
                  {errors[`${section}.${key}`] && (
                    <p className="text-red-500 text-sm text-left mt-3">
                      {errors[`${section}.${key}`]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Regular Fields */}
          <div className="grid grid-cols-1 gap-4">
            {fields.map(({ section, key, label, type }) => (
              <div key={key}>
                <Label
                  htmlFor={key}
                  className="block mb-2 text-[12px] text-[#6C7275] text-left uppercase"
                >
                  {label}
                </Label>
                <Input
                  id={key}
                  placeholder={label}
                  value={formData[section][key]}
                  onChange={handleInputChange(section, key)}
                  type={type}
                  className="h-[40px]"
                />
                {errors[`${section}.${key}`] && (
                  <p className="text-red-500 text-sm text-left mt-3">
                    {errors[`${section}.${key}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      <Button className="w-full font-inter h-[52px]" onClick={handleSubmit}>
        Place Order
      </Button>
    </div>
  );
};

export default CheckoutInfo;
