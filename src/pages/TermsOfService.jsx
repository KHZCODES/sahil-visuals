import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white py-20"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-pink">Terms of Service</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/70 leading-relaxed">
              By accessing and using Sahil Visuals' services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Services Description</h2>
            <p className="text-white/70 leading-relaxed">
              Sahil Visuals provides video editing and motion graphics services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-white/70 leading-relaxed">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc list-inside mt-4 text-white/70 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Not use our services for any illegal purposes</li>
              <li>Not interfere with the proper functioning of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-white/70 leading-relaxed">
              All content, including but not limited to text, graphics, logos, and software, is the property of Sahil Visuals and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
            <p className="text-white/70 leading-relaxed">
              Payment terms and conditions:
            </p>
            <ul className="list-disc list-inside mt-4 text-white/70 space-y-2">
              <li>All prices are in the specified currency</li>
              <li>Payment is due as per the agreed schedule</li>
              <li>We reserve the right to modify our pricing with notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-white/70 leading-relaxed">
              Sahil Visuals shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <p className="text-white/70 leading-relaxed">
              We reserve the right to terminate or suspend your access to our services at any time, without notice, for any reason, including violation of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p className="text-white/70 leading-relaxed">
              For any questions regarding these Terms of Service, please contact us at:
            </p>
            <p className="mt-4 text-white/70">
              Email: Sahilksp01@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="text-white/70 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page.
            </p>
            <p className="mt-4 text-white/50">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService; 