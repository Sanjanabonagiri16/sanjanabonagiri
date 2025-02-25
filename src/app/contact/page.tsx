'use client';

import { motion } from "framer-motion";
import { Playfair_Display } from 'next/font/google';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { DockNavigation } from '../components/layout/DockNavigation';
import { useState } from 'react';

const playfair = Playfair_Display({ subsets: ['latin'] });

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    value: "bonagirisanjana1116@gmail.com",
    href: "mailto:bonagirisanjana1116@gmail.com",
    gradient: "from-[#EC4899] to-[#8B5CF6]"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    value: "+91 6301804705",
    href: "tel:+916301804705",
    gradient: "from-[#3B82F6] to-[#2DD4BF]"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Location",
    value: "Telangana, India",
    href: "https://maps.google.com/?q=Telangana,India",
    gradient: "from-[#F59E0B] to-[#EF4444]"
  }
];

const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/Sanjanabonagiri16",
    label: "GitHub",
    gradient: "from-[#333333] to-[#666666]"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://linkedin.com/in/Sanjana-Bonagiri",
    label: "LinkedIn",
    gradient: "from-[#0077B5] to-[#00A0DC]"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically send the form data to your backend
    // For now, we'll simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="flex min-h-screen flex-col pt-20 bg-[#212A31] text-[#E5E9E6] overflow-hidden">
      <DockNavigation />
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-[#124E66]/20 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] top-1/2 -left-20 bg-[#124E66]/20 rounded-full blur-3xl" />
      </div>

      <motion.section 
        className="relative py-12 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className={`${playfair.className} text-3xl lg:text-4xl font-bold mb-4`}>
              Let's Connect
            </h1>
            <p className="text-lg text-[#748D92] max-w-2xl mx-auto">
              Have a question or want to work together? I'd love to hear from you. Feel free to reach out through any of these channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <h2 className={`${playfair.className} text-2xl font-bold mb-6`}>
                Contact Information
              </h2>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    target={info.title === "Location" ? "_blank" : undefined}
                    rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="bg-[#2A363F]/80 backdrop-blur-sm rounded-xl p-4 border border-[#4A5A66] hover:border-[#748D92] transition-all duration-300 group">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${info.gradient}`}>
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[#748D92]">{info.title}</h3>
                          <p className="text-[#E5E9E6] group-hover:text-white transition-colors">{info.value}</p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium mb-4">Connect on Social Media</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg bg-gradient-to-r ${social.gradient} hover:scale-110 transition-transform duration-300`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      title={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#748D92] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-[#2A363F]/80 border border-[#4A5A66] rounded-lg focus:outline-none focus:border-[#748D92] transition-colors text-[#E5E9E6] placeholder-[#748D92]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#748D92] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-[#2A363F]/80 border border-[#4A5A66] rounded-lg focus:outline-none focus:border-[#748D92] transition-colors text-[#E5E9E6] placeholder-[#748D92]"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#748D92] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-[#2A363F]/80 border border-[#4A5A66] rounded-lg focus:outline-none focus:border-[#748D92] transition-colors text-[#E5E9E6] placeholder-[#748D92]"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#748D92] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#2A363F]/80 border border-[#4A5A66] rounded-lg focus:outline-none focus:border-[#748D92] transition-colors text-[#E5E9E6] placeholder-[#748D92] resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] text-white font-medium transition-all duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center mt-4"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
} 