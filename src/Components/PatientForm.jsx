import React, { useState, useEffect } from 'react';

const PatientForm = ({ onNext }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        vitals: '',
        medications: '',
        familyHistory: '',
        chronicDiseases: '',
        pastSurgeries: '',
        allergies: '',
        lifestyle: '',
        diet: '',
        smokingStatus: '',
        alcoholConsumption: ''
    });

    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [animate, setAnimate] = useState(false);

    const fields = [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
        { name: 'vitals', label: 'Vitals', type: 'text', required: true },
        { name: 'medications', label: 'Current Medications', type: 'text', required: true },
        { name: 'familyHistory', label: 'Family History', type: 'text', required: true },
        { name: 'chronicDiseases', label: 'Chronic Diseases', type: 'text', required: true },
        { name: 'pastSurgeries', label: 'Past Surgeries', type: 'text', required: false },
        { name: 'allergies', label: 'Allergies', type: 'text', required: true },
        { name: 'lifestyle', label: 'Lifestyle', type: 'text', required: false },
        { name: 'diet', label: 'Diet', type: 'text', required: false },
        { name: 'smokingStatus', label: 'Smoking Status', type: 'select', options: ['Non-Smoker', 'Former Smoker', 'Current Smoker'], required: true },
        { name: 'alcoholConsumption', label: 'Alcohol Consumption', type: 'select', options: ['None', 'Occasional', 'Regular'], required: true },
    ];

    useEffect(() => {
        setAnimate(false);
        const timeout = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timeout);
    }, [step]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateField = () => {
        const currentField = fields[step];
        if (currentField.required && !formData[currentField.name]) {
            setErrors({ [currentField.name]: `${currentField.label} is required.` });
            return false;
        }
        setErrors({});
        return true;
    };

    const handleNext = () => {
        if (validateField()) {
            if (step < fields.length - 1) {
                setStep(step + 1);
            } else {
                onNext(formData);
            }
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const renderInputField = () => {
        const field = fields[step];
        if (field.type === 'select') {
            return (
                <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-1 block w-full px-5 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required={field.required}
                >
                    <option value="">Select</option>
                    {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        }
        return (
            <input
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full px-5 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required={field.required}
            />
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 overflow-hidden">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-maroon-500 to-indigo-400 inline-block text-transparent bg-clip-text">DocHelp</h1>
                <p className="text-gray-600 mt-2">Please provide the necessary patient information step by step.</p>
            </div>
            <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-10">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                    {/* Progress Indicator */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Step {step + 1} of {fields.length}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${((step + 1) / fields.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Step Content with Animation */}
                    <div className={`transition-opacity duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                {fields[step].label}
                            </label>
                            {renderInputField()}
                            {errors[fields[step].name] && (
                                <p className="text-red-500 text-sm mt-2">{errors[fields[step].name]}</p>
                            )}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
                        >
                            {step < fields.length - 1 ? 'Next' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientForm;
