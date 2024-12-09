import React, { useState } from 'react';
import { X, CheckCircle, Plus, Loader2 } from 'lucide-react';
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";

// IMPORTING IMAGES

import one from '../../../src/assets/signin/1.png'
import two from '../../../src/assets/signin/2.png'
import three from '../../../src/assets/signin/3.png'
import four from '../../../src/assets/signin/4.png'
import five from '../../../src/assets/signin/5.png'

const AuthFlow = () => {
  const [currentView, setCurrentView] = useState('options');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDisability, setSelectedDisability] = useState(null);
  const [disabilityRange, setDisabilityRange] = useState(50);
  const [newInterest, setNewInterest] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);

const [allInterests, setAllInterests] = useState([
  'Adaptive Sports', 'Assistive Technology', 'Art Therapy',
  'Support Groups', 'Accessible Travel', 'Music Therapy',
  'Inclusive Education', 'Disability Advocacy', 'Accessible Gaming'
]);

  const [suggestedInterests] = useState([
    'Adaptive Sports', 'Assistive Technology', 'Art Therapy',
    'Support Groups', 'Accessible Travel', 'Music Therapy',
    'Inclusive Education', 'Disability Advocacy', 'Accessible Gaming'
  ]);

  const disabilities = [
    { id: 1, title: 'Visual Impairment', img: one },
    { id: 2, title: 'Hearing Impairment', img: two },
    { id: 3, title: 'Physical Disability', img: three },
    { id: 4, title: 'Cognitive Disability', img: four },
    { id: 5, title: 'Speech Disability', img: five }
  ];

  const createConfetti = () => {
    const colors = ['#4318FF', '#FFD700', '#FF69B4', '#00FF00', '#FF4500'];
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 5000);
    }
  };

  const handleAuthOption = (option) => {
    setCurrentView(option);
  };

  const addInterest = () => {
    console.log('Adding interest:', newInterest);
    const trimmedInterest = newInterest.trim();
    if (trimmedInterest && !selectedInterests.includes(trimmedInterest)) {
      setSelectedInterests(prevInterests => [...prevInterests, trimmedInterest]);
      setNewInterest('');
    }
  };

  const handleAddInterest = () => {
    console.log("Current newInterest:", newInterest); // Debug log
    const trimmedInterest = newInterest.trim();
    if (trimmedInterest && !selectedInterests.includes(trimmedInterest)) {
      setSelectedInterests(prev => [...prev, trimmedInterest]);
      setNewInterest('');
    }
  };
  
  
  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleRegisterComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      createConfetti();
      setTimeout(() => {
        setCurrentView('signin');
        setCurrentStep(1);
        setShowSuccess(false);
      }, 3000);
    }, 3000);
  };

  const styles = `
    .confetti {
      position: fixed;
      width: 10px;
      height: 10px;
      background-color: #4318FF;
      pointer-events: none;
      z-index: 9999;
      animation: confetti-fall 5s linear forwards;
    }

    @keyframes confetti-fall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }

    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #4318FF;
      cursor: pointer;
      margin-top: -7px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }

    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 2px;
      background: transparent;
      border-radius: 999px;
      cursor: pointer;
    }
  `;

  // Initial Auth Options View
  if (currentView === 'options') {
    return (
      <>
        <style>{styles}</style>
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center l">
          <div className="mt-[30vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Welcome
            </h4>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Choose how you want to get started!
            </p>
            <button
              onClick={() => handleAuthOption('register')}
              className="linear mb-3 w-full rounded-xl bg-[rgba(67,24,255,0.85)] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[rgba(67,24,255,0.95)]"
            >
              Create Account
            </button>
            <button
              onClick={() => handleAuthOption('signin')}
              className="linear w-full rounded-xl border-2 border-gray-200 py-[12px] text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-100 dark:text-white"
            >
              Sign In
            </button>
          </div>
        </div>
      </>
    );
  }

  // Sign In View
  if (currentView === 'signin') {
    return (
      <>
        <style>{styles}</style>
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h4>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Enter your email and password to sign in!
            </p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
            />
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center">
                <Checkbox />
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Keep me logged In
                </p>
              </div>
              <a
                className="text-sm font-medium text-[rgba(67,24,255,0.85)] hover:text-[rgba(67,24,255,0.95)] dark:text-white"
                href=" "
              >
                Forgot Password?
              </a>
            </div>
            <button className="linear mt-2 w-full rounded-xl bg-[rgba(67,24,255,0.85)] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-[rgba(67,24,255,0.95)]">
              Sign In
            </button>
            <div className="mt-4">
              <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
                Not registered yet?
              </span>
              <button
                onClick={() => handleAuthOption('register')}
                className="ml-1 text-sm font-medium text-[rgba(67,24,255,0.85)] hover:text-[rgba(67,24,255,0.95)] dark:text-white"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Registration View
  if (currentView === 'register') {
    return (
      <>
        <style>{styles}</style>
        <div className="fixed inset-0 bg-white dark:bg-navy-900 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {!showSuccess && !isProcessing ? (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-4xl font-bold text-navy-700 dark:text-white mb-2">
                        {currentStep === 1 && "Create Account"}
                        {currentStep === 2 && "Your Interests"}
                        {currentStep === 3 && "Disability Type"}
                      </h4>
                      <p className="text-base text-gray-600">
                        {currentStep === 1 && "Fill in your details to get started"}
                        {currentStep === 2 && "Select or add your interests"}
                        {currentStep === 3 && "Select your disability type"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAuthOption('options')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <InputField
                      variant="auth"
                      label="Full Name*"
                      placeholder="Enter your full name"
                      id="name"
                      type="text"
                    />
                    <InputField
                      variant="auth"
                      label="Email*"
                      placeholder="mail@simmmple.com"
                      id="email"
                      type="email"
                    />
                    <InputField
                      variant="auth"
                      label="Password*"
                      placeholder="Min. 8 characters"
                      id="password"
                      type="password"
                    />
                    <InputField
                      variant="auth"
                      label="Age*"
                      placeholder="Enter your age"
                      id="age"
                      type="number"
                    />
                    <InputField
                      variant="auth"
                      label="Location*"
                      placeholder="Enter your location"
                      id="location"
                      type="text"
                    />
                  </div>
                )}

{currentStep === 2 && (
  <div className="space-y-6">
    <div className="relative flex items-center gap-3">
      <div className="flex-1">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => {
            console.log("Input changed:", e.target.value); // Debug log
            setNewInterest(e.target.value);
          }}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[rgba(67,24,255,0.85)]"
          placeholder="Add new interest"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddInterest();
            }
          }}
        />
      </div>
      <button
        type="button"
        onClick={handleAddInterest}
        className="min-w-[44px] h-[44px] flex items-center justify-center rounded-xl bg-[rgba(67,24,255,0.85)] text-white hover:bg-[rgba(67,24,255,0.95)] transition-colors"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
    
    <div className="flex flex-wrap gap-3">
      {selectedInterests.map((interest) => (
        <button
          key={interest}
          onClick={() => {
            setSelectedInterests(prev => prev.filter(i => i !== interest));
          }}
          className="px-4 py-2 rounded-xl bg-[rgba(67,24,255,0.85)] text-white hover:bg-[rgba(67,24,255,0.95)] transition-all duration-200"
        >
          {interest}
        </button>
      ))}
      
      {suggestedInterests.map((interest) => (
        !selectedInterests.includes(interest) && (
          <button
            key={interest}
            onClick={() => setSelectedInterests(prev => [...prev, interest])}
            className="px-4 py-2 rounded-xl bg-gray-100 text-navy-700 hover:bg-gray-200 transition-all duration-200"
          >
            {interest}
          </button>
        )
      ))}
    </div>
  </div>
)}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {disabilities.map((disability) => (
                        <button
                          key={disability.id}
                          className={`border rounded-xl p-4 transition ${
                            selectedDisability?.id === disability.id
                              ? 'border-[rgba(67,24,255,0.85)] bg-[rgba(67,24,255,0.1)]'
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedDisability(disability)}
                        >
                          <img
                            src={disability.img}
                            alt={disability.title}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <h4 className="font-medium text-center text-navy-700 dark:text-white">
                            {disability.title}
                          </h4>
                        </button>
                      ))}
                    </div>
                    {selectedDisability && (
                      <div className="mt-4 p-6 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-600">
                            Disability Range
                          </label>
                          <span className="text-sm font-medium text-[rgba(67,24,255,0.85)]">
                            {disabilityRange}%
                          </span>
                        </div>
                        <div className="relative h-2 mb-4">
                        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                          <div 
                            className="absolute inset-0 bg-[rgba(67,24,255,0.85)] rounded-full transition-all duration-200"
                            style={{ width: `${disabilityRange}%` }}
                          ></div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={disabilityRange}
                            onChange={(e) => setDisabilityRange(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            style={{ WebkitAppearance: 'none' }}
                          />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Mild (0-30%)</span>
                          <span>Moderate (31-70%)</span>
                          <span>Severe (71-100%)</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-2 border-2 rounded-xl hover:bg-gray-100 transition"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (currentStep < 3) {
                        setCurrentStep(currentStep + 1);
                      } else {
                        handleRegisterComplete();
                      }
                    }}
                    className="px-6 py-2 bg-[rgba(67,24,255,0.85)] text-white rounded-xl hover:bg-[rgba(67,24,255,0.95)] transition ml-auto"
                  >
                    {currentStep === 3 ? 'Complete' : 'Next'}
                  </button>
                </div>
              </>
            ) : isProcessing ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <Loader2 size={64} className="text-[rgba(67,24,255,0.85)] animate-spin" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-navy-700 dark:text-white">
                  Creating Your Account
                </h2>
                <p className="text-gray-600">Please wait a moment...</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <CheckCircle size={64} className="text-[rgba(67,24,255,0.85)] animate-bounce" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-navy-700 dark:text-white">
                  Account Created Successfully!
                </h2>
                <p className="text-gray-600">Redirecting to login...</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default AuthFlow;