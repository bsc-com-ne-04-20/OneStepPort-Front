import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FaLinkedin, FaFacebook, FaWhatsapp, FaEnvelope, FaPaperclip, FaTelegram } from 'react-icons/fa';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', file: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState({ type: '', message: '' });

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: '', message: '' }), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'file' && files && files[0]) {
      if (files[0].size > 5 * 1024 * 1024) {
        setErrorMessage('File size must not exceed 5MB.');
        return;
      } else {
        setErrorMessage('');
      }
    }

    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }

    try {
      const response = await fetch('https://onestepport.onrender.com/send-email', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      showNotification('success', '✅ Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '', file: null });
    } catch (error) {
      console.error('Error:', error);
      showNotification('error', '❌ There was an error sending your message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const projectImages = [
    '/images/farming-image.jpg',
    '/images/rural-sensitization-image.jpg',
    '/images/cyber-mitigation-image.jpg',
    '/images/bright-child-image.jpg',
  ];

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-green-300 to-blue-300 min-h-screen relative">
                {notification.message && (
                  <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
                    <div
                      className={`p-4 rounded-lg shadow-lg text-white transition-all duration-500 ${
                        notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      <p>{notification.message}</p>
                    </div>
                  </div>
                )}

                <header className="text-center mb-12">
                  <img
                    src="/images/logo2.png"
                    alt="OneStepPort Logo"
                    className="mb-4 w-32 h-32 rounded-full mx-auto"
                    style={{ backgroundColor: 'transparent' }}
                  />
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">My Portfolio</h1>
                  <p className="text-lg text-gray-100">A showcase of my upcoming projects</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                  {projectImages.map((src, index) => {
                    const project = [
                      'Farming Initiatives',
                      'Rural Sensitization',
                      'Cyber Mitigations',
                      'Digital Child Initiative',
                    ][index];

                    const descriptions = [
                      'An innovative project dedicated to promoting sustainable farming practices through the integration of digital knowledge.',
                      'A comprehensive program designed to educate rural communities on vital topics such as health, digital literacy, and education.',
                      'A proactive initiative focused on strategies to educate communities about cyber threats and best practices for mitigation.',
                      "A dedicated program aimed at improving children's digital literacy within educational settings.",
                    ];

                    return (
                      <div
                        key={index}
                        className="relative bg-white rounded-lg shadow-lg overflow-hidden h-64 transition-transform transform hover:scale-105 cursor-pointer"
                      >
                        <img src={src} alt={project} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
                          <h2 className="text-lg md:text-xl font-semibold text-white mb-2">{project}</h2>
                          <p className="text-gray-200">{descriptions[index]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* About Section */}
                <section className="mb-12 text-white">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-4">About Me</h2>
                  <p className="text-base md:text-lg mb-2">
                    I am a dedicated developer with a passion for crafting innovative web applications using modern
                    technologies. My goal is to design user-friendly and efficient solutions that address real-world
                    challenges.
                  </p>
                  <p className="text-base md:text-lg mb-2">
                    With a strong foundation in both frontend and backend development, I thrive in collaborative
                    environments where I can contribute to high-quality products. In my free time, I actively pursue
                    continuous learning, exploring new technologies and engaging in personal projects that push the
                    boundaries of my skills.
                  </p>
                </section>

                {/* Contact Form */}
                <section className="bg-white p-6 rounded-lg mb-12 mx-auto max-w-md">
                  <h2 className="text-3xl font-semibold mb-4">Contact Me</h2>
                  <p className="text-base md:text-lg mb-2">
                    Feel free to reach out via email at: <strong>clementlyson99@gmail.com</strong>
                  </p>
                  <p className="text-base md:text-lg mb-4">You can also connect with me on social media:</p>

                  <div className="flex justify-around mb-4">
                    <a
                      href="https://www.linkedin.com/in/clement-lyson"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaLinkedin size={30} />
                    </a>
                    <a
                      href="https://www.facebook.com/clement.masauko"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaFacebook size={30} />
                    </a>
                    <a
                      href="https://wa.me/+265886096459"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaWhatsapp size={30} />
                    </a>
                    <a
                      href="https://telegram.me/@Cmasauko"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaTelegram size={30} />
                    </a>
                    <a href="mailto:clementlyson99@gmail.com" className="text-red-600 hover:text-red-800">
                      <FaEnvelope size={30} />
                    </a>
                  </div>

                  <button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="w-full p-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    {showContactForm ? 'Hide Form' : 'Click here to send message'}
                  </button>

                  {showContactForm && (
                    <form className="mt-6 space-y-4" onSubmit={sendEmail}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                      <div>
                        <label className="cursor-pointer inline-flex items-center space-x-2">
                          <FaPaperclip />
                          <input type="file" name="file" onChange={handleChange} className="hidden" />
                          <span className="text-blue-600 hover:text-blue-700">Attach File (max 5MB)</span>
                        </label>
                        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full p-2 text-white rounded ${
                          isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isLoading ? <span className="loader"></span> : 'Send Message'}
                      </button>
                    </form>
                  )}
                </section>

                <style>{`
                  .loader {
                    border: 4px solid white;
                    border-top: 4px solid blue;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 1s linear infinite;
                    display: inline-block;
                  }
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
