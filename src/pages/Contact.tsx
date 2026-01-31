import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <>
      {/* Hero */}
      <section className="section-spacing pb-12">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            <span className="label-text text-champagne">Contact</span>
            <h1 className="text-foreground">Let's Start a Conversation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Whether you have a specific project in mind or just want to
              explore possibilities, we'd love to hear from you. Every great
              collaboration begins with a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-spacing pt-0">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-12"
            >
              {/* Direct Contact */}
              <div className="space-y-4">
                <h4 className="label-text text-foreground">Direct Contact</h4>
                <a
                  href="mailto:keshavarorayt0@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-champagne transition-colors duration-300 group"
                >
                  <Mail className="w-5 h-5" />
                  <span>keshavarorayt0@gmail.com</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* What to Expect */}
              <div className="space-y-4">
                <h4 className="label-text text-foreground">What to Expect</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                    Response within 24-48 hours
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                    Initial consultation to understand your needs
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                    Tailored proposal based on your project scope
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                    Clear timeline and deliverables
                  </li>
                </ul>
              </div>

              {/* Quote */}
              <div className="bg-secondary p-8 space-y-4">
                <p className="font-display text-lg italic text-foreground leading-relaxed">
                  "Great design is the thoughtful integration of inspiration,
                  craft, and purpose."
                </p>
                <p className="label-text text-champagne">— Keshav Arora</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="label-text text-champagne">FAQ</span>
            <h2 className="mt-4 text-foreground">Common Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What is your typical turnaround time?",
                answer:
                  "Depending on project complexity, most designs are delivered within 2-4 weeks from concept approval.",
              },
              {
                question: "Do you work with international clients?",
                answer:
                  "Absolutely. We collaborate with clients globally via video calls and email.",
              },
              {
                question: "What file formats do you deliver?",
                answer:
                  "We provide production-ready files in various formats including AI, PSD, TIFF, and PDF.",
              },
              {
                question: "Can you work within brand guidelines?",
                answer:
                  "Yes, we adapt our designs to align seamlessly with your existing brand identity.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-2"
              >
                <h4 className="font-display text-lg text-foreground">
                  {item.question}
                </h4>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
