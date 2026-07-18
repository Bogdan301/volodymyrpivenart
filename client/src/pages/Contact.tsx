/*
 * Design: Chromatic Bloom — Abstract Expressionist Web Design
 * Contact page: Expressive opener, asymmetric form layout, colored accents
 */
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock, Instagram, Facebook, Phone} from "lucide-react";
import { toast } from "sonner";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }

      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO: Bold, expressive ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95" />
          <div className="absolute top-0 left-0 w-full h-full opacity-15">
            <img
              src="/images/evening-walk_110x140cm_2020.JPG"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-crimson via-blue-electric to-golden" />
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-8"
            >
              <span className="font-label text-sm font-medium text-golden uppercase tracking-[0.2em] mb-4 block">
                Get in Touch
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4">
                Let's <span className="text-crimson">Create</span>
                <br />Together
              </h1>
              <p className="text-white/70 text-lg max-w-xl">
                Whether you're interested in a commission, gallery collaboration,
                or simply want to say hello — I'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION — Asymmetric layout ===== */}
      <section className="py-24 bg-cream relative">
        {/* Crimson accent bar on left */}
        <div className="absolute left-0 top-0 w-1 h-full bg-crimson/20" />

        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form — offset left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-7"
            >
              <h2 className="text-2xl font-bold text-charcoal mb-2">Send a Message</h2>
              <p className="text-charcoal/50 text-base mb-8">
                Fill out the form below and I'll respond within 48 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-label text-sm font-medium text-charcoal/70 block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white border-2 border-charcoal/5 rounded-sm text-charcoal font-label text-sm focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all duration-200 placeholder:text-charcoal/30"
                    />
                  </div>
                  <div>
                    <label className="font-label text-sm font-medium text-charcoal/70 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white border-2 border-charcoal/5 rounded-sm text-charcoal font-label text-sm focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all duration-200 placeholder:text-charcoal/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-label text-sm font-medium text-charcoal/70 block mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-charcoal/5 rounded-sm text-charcoal font-label text-sm focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all duration-200"
                  >
                    <option value="">Select a topic</option>
                    <option value="commission">Artwork Commission</option>
                    <option value="gallery">Gallery Exhibition</option>
                    <option value="purchase">Purchase Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-label text-sm font-medium text-charcoal/70 block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    className="w-full px-4 py-3 bg-white border-2 border-charcoal/5 rounded-sm text-charcoal font-label text-sm focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all duration-200 resize-none placeholder:text-charcoal/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-label text-base font-medium bg-crimson text-white px-8 py-3.5 rounded-sm hover:bg-crimson/90 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-crimson/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 11-6.219-8.56" />
                        </svg>
                      </span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Info — offset right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-5 space-y-10"
            >
              {/* Contact details */}
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-8">Contact Info</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-crimson/5 rounded-sm flex-shrink-0">
                      <Mail className="w-5 h-5 text-crimson" />
                    </div>
                    <div>
                      <h4 className="font-label text-sm font-medium text-charcoal/50 uppercase tracking-wider mb-1">
                        Email
                      </h4>
                      <a href="mailto:vladimirpivenart@gmail.com" className="text-charcoal hover:text-crimson transition-colors duration-200">
                        vladimirpivenart@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-crimson/5 rounded-sm flex-shrink-0">
                      <Phone className="w-5 h-5 text-crimson" />
                    </div>
                    <div>
                      <h4 className="font-label text-sm font-medium text-charcoal/50 uppercase tracking-wider mb-1">
                        Phone
                      </h4>
                      <a href="tel:+38(067) 721-7798" className="text-charcoal hover:text-crimson transition-colors duration-200">
                        +38 (067) 721-7798
                      </a>
                    </div>
                  </div>

                   <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-electric/5 rounded-sm flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-electric" />
                    </div>
                    <div>
                      <h4 className="font-label text-sm font-medium text-charcoal/50 uppercase tracking-wider mb-1">
                        Gallery Locations
                      </h4>
                      <p className="text-charcoal">
                        McBride Gallery: 215 Main St,<br />
                        Annapolis, MD 21401, United States<br />
                        <div className="w-12 h-0.5 bg-crimson mt-2 mb-2" />
                        Stravitz Gallery: 1217 Laskin Rd,<br />
                        Virginia Beach, VA 23451, United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    {/* <div className="p-3 bg-golden/5 rounded-sm flex-shrink-0">
                      <Clock className="w-5 h-5 text-golden" />
                    </div>
                     <div>
                      <h4 className="font-label text-sm font-medium text-charcoal/50 uppercase tracking-wider mb-1">
                        Studio Hours
                      </h4>
                      <p className="text-charcoal">
                        Mon – Fri: 10:00 AM – 6:00 PM<br />
                        Sat: By appointment only
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-label text-sm font-medium text-charcoal/50 uppercase tracking-wider mb-4">
                  Follow Along
                </h3>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/volodymyrpivenart/" },
                    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/19BFbJBy13/?mibextid=wwXIfr" },
                    { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@volodymyrpivenart?_r=1&_t=ZS-97yHOLXKasU" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="p-3 rounded-sm bg-white border-2 border-charcoal/5 hover:border-crimson hover:text-crimson transition-all duration-200 text-charcoal/60"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative artwork — with painterly frame */}
              <div className="relative">
                <img
                  src="/images/evening-walk_110x140cm_2020.JPG"
                  alt="Featured artwork"
                  className="w-full rounded-sm shadow-lg"
                />

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
