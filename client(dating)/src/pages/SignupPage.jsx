import React, { useContext, useState } from 'react';
import InputField from '../components/common/InputField';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
     const { signup } = useContext(AuthContext);
        const navigate=useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: '',
        gender: '',
        city: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        if (selectedImage) data.append('profile', selectedImage);

        try {
            const res = await signup(data);
            alert(res.message);
            navigate('/')
        } catch (err) {
            alert(err.message || 'Signup failed');
        }
    };

    return (
        <div className=" flex items-center justify-center my-10">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg  p-6 w-full max-w-xl space-y-2"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Create your account</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="First name" name="firstName" placeholder="Enter your first name" onChange={handleChange} />
                    <InputField label="Last name" name="lastName" placeholder="Enter your last name" onChange={handleChange} />
                </div>

                <div className="mt-4">
                    <InputField label="Email" type="email" name="email" placeholder="you@example.com" onChange={handleChange} />
                </div>

                <div className="mt-4">
                    <InputField label="Password" type="password" name="password" placeholder="Enter a secure password" onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InputField label="Date of birth" type="date" name="dob" onChange={handleChange} />
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Gender</label>
                        <select
                            name="gender"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onChange={handleChange}
                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <InputField label="City" name="city" placeholder="Enter your city" onChange={handleChange} />
                </div>

                <label htmlFor="file" className="mt-6 border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center cursor-pointer">
                    {selectedImage ? (
                        <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2" />
                    ) : (
                        <>
                            <div className="text-gray-400 text-3xl mb-2">⬆️</div>
                            <p className="text-sm text-gray-600 font-medium mb-1">Upload profile picture</p>
                            <p className="text-xs text-gray-400 mb-3">PNG, JPG, GIF up to 10MB.</p>
                        </>
                    )}
                </label>
                <input
                    type="file"
                    name="profile"
                    id="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />

                 <Button label={'Sign up'} />
                <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-red-500 hover:underline">
            Sign In
          </a>
        </p>
            </form>
        </div>
    );
};

export default SignupPage;
