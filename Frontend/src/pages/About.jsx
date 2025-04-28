import { motion } from 'framer-motion';
import { FaPalette, FaHandshake, FaLock } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaPalette className="h-8 w-8 text-purple-600" />,
      title: "Curated Artworks",
      description: "Discover unique pieces from talented artists worldwide, carefully selected for authenticity and quality."
    },
    // {
    //   icon: <FaHandshake className="h-8 w-8 text-purple-600" />,
    //   title: "Secure Transactions",
    //   description: "Every purchase is protected with state-of-the-art security measures and buyer protection policies."
    // },
    {
      icon: <FaLock className="h-8 w-8 text-purple-600" />,
      title: "Artist Verification",
      description: "All artists are verified to ensure you're getting authentic, original artwork from real creators."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About ARTIQ</h1>
            <p className="text-xl md:text-2xl mb-8">
              Connecting Art Lovers with Exceptional Artists
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg p-8 shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-white rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
            ARTIQ is dedicated to revolutionizing the way art is discovered, bought, and sold online. 
            We believe in creating a transparent, secure, and accessible platform where artists can 
            thrive and art enthusiasts can find pieces that speak to their souls.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;