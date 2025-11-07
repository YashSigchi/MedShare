import { motion } from 'framer-motion';
import { Heart, Target, Eye, Users, Shield, TrendingUp, Globe, Award } from 'lucide-react';

function About() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe healthcare is a fundamental right, and everyone deserves access to essential medications.',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'AI verification and human review ensure every donation meets the highest safety standards.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a trusted network of donors, receivers, and verifiers working together for health equity.',
    },
    {
      icon: TrendingUp,
      title: 'Sustainability',
      description: 'Reducing pharmaceutical waste while maximizing the value of unused medications.',
    },
  ];

  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Users' },
    { icon: Heart, value: '1M+', label: 'Lives Impacted' },
    { icon: Globe, value: '500+', label: 'Cities Served' },
    { icon: Award, value: '99%', label: 'Safety Score' },
  ];

  const team = [
    { name: 'Dr. Sarah Mitchell', role: 'Chief Medical Officer', avatar: '👩‍⚕️' },
    { name: 'James Chen', role: 'CEO & Founder', avatar: '👨‍💼' },
    { name: 'Emily Rodriguez', role: 'Head of Technology', avatar: '👩‍💻' },
    { name: 'Michael Thompson', role: 'Community Manager', avatar: '👨‍🏫' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <section className="py-16 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">About MedShare</h1>
            <p className="text-xl text-blue-100">
              We're on a mission to bridge the gap between medication surplus and scarcity, creating a sustainable healthcare ecosystem where no medicine goes to waste and everyone has access to essential treatments.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                MedShare was founded on the belief that millions of dollars worth of unused medications go to waste each year while countless individuals struggle to afford essential treatments. We connect these two worlds through a secure, AI-powered platform.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to make healthcare more accessible, reduce pharmaceutical waste, and build a community where generosity meets genuine need. Every donation on our platform represents hope, health, and a step toward a more equitable healthcare system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-12 flex items-center justify-center h-96">
                <Heart className="h-64 w-64 text-blue-500" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Eye className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A world where no one is denied access to essential medications due to cost, and no medication is wasted when it can save a life. We envision a future where healthcare sharing is seamless, safe, and universally accessible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100">Making a difference, one donation at a time</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to healthcare equity</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 text-center"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Join Our Mission</h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether you're a donor, receiver, or healthcare professional, there's a place for you in our community.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
