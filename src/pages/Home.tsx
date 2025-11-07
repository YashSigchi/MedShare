import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Shield,
  Users,
  CheckCircle,
  Upload,
  Search,
  Bell,
  Package,
  ArrowRight,
} from 'lucide-react';

function Home() {
  const features = [
    {
      icon: Shield,
      title: 'AI-Verified Safety',
      description: 'Advanced AI technology verifies expiry dates and medicine conditions automatically.',
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Connect with verified donors and receivers in a safe, transparent platform.',
    },
    {
      icon: Package,
      title: 'Zero Waste',
      description: 'Prevent medication waste by sharing unused supplies with those who need them.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assured',
      description: 'Human verifiers review all donations to ensure safety and authenticity.',
    },
  ];

  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Upload Medicine',
      description: 'Donors upload medicine details and photos through our secure platform.',
    },
    {
      number: '02',
      icon: Shield,
      title: 'AI Verification',
      description: 'Our AI system automatically checks expiry dates and medicine conditions.',
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Human Review',
      description: 'Trained verifiers approve donations to ensure maximum safety.',
    },
    {
      number: '04',
      icon: Bell,
      title: 'Match & Connect',
      description: 'Receivers find what they need and connect with donors seamlessly.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Donor',
      content: 'MedShare helped me donate my unused medications to people who truly needed them. The process was smooth and secure.',
      avatar: '👩‍⚕️',
    },
    {
      name: 'Michael Chen',
      role: 'Receiver',
      content: 'I found life-saving medications at no cost. This platform is a blessing for those facing financial hardship.',
      avatar: '👨‍💼',
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Verifier',
      content: 'As a healthcare professional, I appreciate the rigorous verification process. Safety is clearly the top priority.',
      avatar: '👩‍⚕️',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Reducing Waste,
                <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Saving Lives
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect donors and receivers of medications and health supplies. Together, we build a healthier, more sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Get Started as Donor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Browse Medicines
                  <Search className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl">
                  <Heart className="h-48 w-48 text-blue-500" strokeWidth={1} />
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </motion.div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MedShare?</h2>
            <p className="text-xl text-gray-600">Safe, transparent, and impactful medication sharing</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-blue-100">Four simple steps to make a difference</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
              >
                <div className="text-6xl font-bold text-white/20 absolute top-4 right-4">{step.number}</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-blue-100">{step.description}</p>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Real stories from real people</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="text-5xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-blue-600">{testimonial.role}</p>
                </div>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of donors and receivers creating a sustainable healthcare ecosystem.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Join MedShare Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
