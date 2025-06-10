import React from 'react';

const InputField = ({ label, type = "text", name, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm text-gray-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none  focus:border-red-500"
        required
      />
    </div>
  );
};

export default InputField;
