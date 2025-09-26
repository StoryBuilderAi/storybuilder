import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface FormData {
  name: string;
  email: string;
  currentRole: string;
  experienceLevel: string;
  jobSearchPain: string[];
  resumeChallenges: string[];
  careerGoals: string;
  preferredFeatures: string[];
}

const WaitlistPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    currentRole: "",
    experienceLevel: "",
    jobSearchPain: [],
    resumeChallenges: [],
    careerGoals: "",
    preferredFeatures: [],
  });

  const pageRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const totalSteps = 7;

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Thank you for joining our waitlist! We'll be in touch soon.");
    // Redirect back to home page
    window.history.pushState({}, "", "/");
    window.location.reload();
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFormData(field, newArray);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to StoryBuilder!
              </h2>
              <p className="text-xl text-gray-600">
                Let's get to know you better to personalize your experience
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  What's your name? *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  What's your email address? *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tell us about your current situation
              </h2>
              <p className="text-xl text-gray-600">
                This helps us understand your background
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  What's your current role or field? *
                </label>
                <select
                  value={formData.currentRole}
                  onChange={(e) =>
                    updateFormData("currentRole", e.target.value)
                  }
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select your current role</option>
                  <option value="software-engineer">Software Engineer</option>
                  <option value="data-scientist">Data Scientist</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="designer">Designer</option>
                  <option value="consultant">Consultant</option>
                  <option value="student">Student</option>
                  <option value="unemployed">Currently Unemployed</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  How many years of professional experience do you have? *
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    updateFormData("experienceLevel", e.target.value)
                  }
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years (Entry Level)</option>
                  <option value="2-3">2-3 years (Junior)</option>
                  <option value="4-6">4-6 years (Mid-level)</option>
                  <option value="7-10">7-10 years (Senior)</option>
                  <option value="10+">10+ years (Executive)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What's your biggest job search challenge?
              </h2>
              <p className="text-xl text-gray-600">Select all that apply</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Getting past ATS systems",
                "Writing compelling cover letters",
                "Networking and connections",
                "Finding relevant job opportunities",
                "Interview preparation",
                "Salary negotiation",
                "Career direction uncertainty",
                "Time management during job search",
              ].map((pain) => (
                <label
                  key={pain}
                  className="flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    checked={formData.jobSearchPain.includes(pain)}
                    onChange={() => toggleArrayValue("jobSearchPain", pain)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-4 text-lg font-medium text-gray-700">
                    {pain}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What resume challenges do you face?
              </h2>
              <p className="text-xl text-gray-600">
                Help us understand your resume pain points
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Formatting and layout issues",
                "Writing impactful bullet points",
                "Quantifying achievements",
                "Tailoring for different roles",
                "Keeping it concise (1-2 pages)",
                "Highlighting relevant skills",
                "Addressing employment gaps",
                "Making it ATS-friendly",
              ].map((challenge) => (
                <label
                  key={challenge}
                  className="flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    checked={formData.resumeChallenges.includes(challenge)}
                    onChange={() =>
                      toggleArrayValue("resumeChallenges", challenge)
                    }
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-4 text-lg font-medium text-gray-700">
                    {challenge}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What are your career goals?
              </h2>
              <p className="text-xl text-gray-600">
                Tell us what you're working towards
              </p>
            </div>
            <div className="space-y-4">
              <textarea
                value={formData.careerGoals}
                onChange={(e) => updateFormData("careerGoals", e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                rows={8}
                placeholder="Describe your career aspirations, goals, and what you hope to achieve in the next 1-2 years..."
                required
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Which StoryBuilder features interest you most?
              </h2>
              <p className="text-xl text-gray-600">
                Select the features that would help you most
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "AI Resume Analysis & Scoring",
                "Smart Job Matching",
                "ATS Optimization",
                "Cover Letter Generation",
                "Interview Preparation",
                "Career Coaching & Advice",
                "Skill Gap Analysis",
                "Salary Negotiation Tips",
              ].map((feature) => (
                <label
                  key={feature}
                  className="flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    checked={formData.preferredFeatures.includes(feature)}
                    onChange={() =>
                      toggleArrayValue("preferredFeatures", feature)
                    }
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-4 text-lg font-medium text-gray-700">
                    {feature}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                You're all set! 🎉
              </h2>
              <p className="text-xl text-gray-600">
                Thank you for joining our waitlist. We'll notify you when
                StoryBuilder is ready!
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                What happens next?
              </h3>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-4"></span>
                  Early access to StoryBuilder beta
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-4"></span>
                  Personalized career insights based on your responses
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-4"></span>
                  Exclusive updates and tips via email
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"
    >
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">
                StoryBuilder
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Join StoryBuilder Waitlist
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    i + 1 <= currentStep ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div ref={stepRef}>{renderStep()}</div>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
              currentStep === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
            }`}
          >
            ← Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join Waitlist 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
