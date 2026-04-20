import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from './ContactForm';
import { fadeInUp, staggerChildren } from '../animations/variants';

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email',
    content: 'chandakanish0018@gmail.com',
    link: 'mailto:chandakanish0018@gmail.com',
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Phone',
    content: '+91-7435886257',
    link: 'tel:+917435886257',
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Location',
    content: 'Silvassa, India',
    link: null,
  },
];

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative py-20 bg-midnight-50 dark:bg-midnight-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-midnight-900 dark:text-white mb-8"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight-600 dark:text-midnight-300 max-w-3xl mx-auto mb-12 text-center"
          >
            Have a project in mind or want to explore collaboration
            opportunities? Feel free to reach out!
          </motion.p>

          <motion.div
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-midnight-900 p-6 rounded-xl shadow-lg text-center"
              >
                <div className="inline-block p-3 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-400 mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-midnight-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-midnight-600 dark:text-midnight-300 hover:text-primary-600 dark:hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-midnight-600 dark:text-midnight-300">
                    {info.content}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-midnight-900 rounded-xl shadow-lg p-8">
              <ContactForm />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
