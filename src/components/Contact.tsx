import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  Send,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { sendEmail } from "@/utils/email";
import { cn } from "@/utils/cn";
import ContactCanvas, { ContactMouse } from "./three/ContactCanvas";

// ── Types ──────────────────────────────────────────────────────────────────
type FormState = Record<"name" | "email" | "subject" | "message", string>;
type SendStatus = "idle" | "sending" | "success" | "error";

// ── Data ───────────────────────────────────────────────────────────────────
const contactInfo: {
  Icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}[] = [
  {
    Icon: Mail,
    label: "Email",
    value: "chandakanish0018@gmail.com",
    href: "mailto:chandakanish0018@gmail.com",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+91 74358 86257",
    href: "tel:+917435886257",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Pune, India · Remote OK",
    href: null,
  },
];

const REMARKABLE = "remarkable".split("");

// ── Floating label field ──────────────────────────────────────────────────
interface FloatingFieldProps {
  label: string;
  name: keyof FormState;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  multiline?: boolean;
  required?: boolean;
  valid?: boolean;
}

const FloatingField: React.FC<FloatingFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  multiline = false,
  required = false,
  valid,
}) => {
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0;
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      <Tag
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={multiline ? 4 : undefined}
        placeholder=""
        className={cn(
          "peer block w-full rounded-xl glass border transition-all duration-200 outline-none resize-none",
          "px-4 pt-6 pb-2.5 text-sm text-white/80 placeholder-transparent",
          floating
            ? "border-electric-500/50 shadow-electric"
            : "border-white/[0.08] hover:border-white/15"
        )}
      />
      <label
        htmlFor={name}
        className={cn(
          "absolute left-4 transition-all duration-200 pointer-events-none",
          floating
            ? "top-2 text-xs text-electric-400"
            : "top-4 text-sm text-white/30"
        )}
      >
        {label}
      </label>
      {valid && value.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-4 text-neon-green"
        >
          <CheckCircle className="w-4 h-4" />
        </motion.div>
      )}
    </div>
  );
};

// ── Contact info card — 3D tilt + cursor spotlight ────────────────────────
interface InfoCardProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
  index: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  Icon,
  label,
  value,
  href,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useSpring(0, { stiffness: 260, damping: 22 });
  const rotY = useSpring(0, { stiffness: 260, damping: 22 });
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spotX = useTransform(mx, (v) => `${v * 100}%`);
  const spotY = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX} ${spotY}, rgba(99,102,241,0.18) 0%, transparent 65%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    rotY.set((nx - 0.5) * 18);
    rotX.set(-(ny - 0.5) * 14);
    mx.set(nx);
    my.set(ny);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
    mx.set(0.5);
    my.set(0.5);
  };

  const inner = (
    <div className="flex items-start gap-4 relative z-[1]">
      <div className="w-9 h-9 rounded-xl bg-electric-600/15 border border-electric-500/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-electric-400" />
      </div>
      <div>
        <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-sm text-white/65 group-hover:text-white/90 transition-colors">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      className="glass-card rounded-2xl p-5 hover:border-white/15 hover:shadow-glass-hover group relative overflow-hidden transition-shadow duration-300"
    >
      {/* Inner cursor spotlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: spotlight }}
      />
      {href ? (
        <a href={href} className="block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef<ContactMouse>({ nx: 0, ny: 0 });
  const [hovered, setHovered] = useState(false);

  // Spring-smoothed cursor glow
  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const glowX = useSpring(rawX, { stiffness: 65, damping: 24 });
  const glowY = useSpring(rawY, { stiffness: 65, damping: 24 });

  // Form state
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SendStatus>("idle");

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawX.set(x);
    rawY.set(y);
    mouseRef.current = {
      nx: (x / rect.width) * 2 - 1,
      ny: -((y / rect.height) * 2 - 1),
    };
  };

  const onLeave = () => {
    setHovered(false);
    rawX.set(-1000);
    rawY.set(-1000);
    mouseRef.current = { nx: 0, ny: 0 };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendEmail(form);
      setStatus("success");
      setTimeout(() => {
        setForm({ name: "", email: "", subject: "", message: "" });
        setStatus("idle");
      }, 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 bg-void overflow-hidden"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      {/* Three.js constellation — absolute behind everything */}
      <div className="absolute inset-0 z-0">
        <ContactCanvas mouseRef={mouseRef} />
      </div>

      {/* Dark overlay so constellation doesn't compete with text */}
      <div className="absolute inset-0 z-[1] bg-void/60 pointer-events-none" />

      {/* Cursor-following radial glow */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: glowX,
            top: glowY,
            x: "-50%",
            y: "-50%",
            width: 720,
            height: 720,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-grid opacity-[0.10] z-[2] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[3]" />

      {/* Content */}
      <div className="relative z-[3] max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-electric-400 tracking-widest uppercase">
            05 / Contact
          </span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        {/* Heading with magnetic letter hover on "remarkable" */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight"
        >
          Let's build something{" "}
          <motion.span
            initial="rest"
            whileHover="hover"
            className="gradient-text inline-flex cursor-default select-none"
          >
            {REMARKABLE.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  rest: { y: 0 },
                  hover: { y: -10 },
                }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.4,
                  ease: [0.33, 1, 0.68, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-white/40 text-base mb-14 max-w-lg"
        >
          Have a project in mind or want to explore collaboration? I'd love to
          hear from you.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact info cards */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            {contactInfo.map(({ Icon, label, value, href }, i) => (
              <InfoCard
                key={label}
                Icon={Icon}
                label={label}
                value={value}
                href={href}
                index={i}
              />
            ))}
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="lg:col-span-2 glass-card rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingField
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  valid={form.name.length > 1}
                />
                <FloatingField
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  valid={isValidEmail}
                />
              </div>
              <FloatingField
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                valid={form.subject.length > 3}
              />
              <FloatingField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                multiline
                required
                valid={form.message.length > 10}
              />

              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl",
                    "text-sm font-semibold transition-all duration-300",
                    status === "success"
                      ? "bg-neon-green/20 border border-neon-green/30 text-neon-green"
                      : status === "error"
                      ? "bg-red-500/20 border border-red-500/30 text-red-400"
                      : "bg-electric-600 hover:bg-electric-500 text-white shadow-electric hover:shadow-electric-lg"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {status === "sending" && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                      />
                    )}
                    {status === "success" && (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Message sent!
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        key="error"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Failed — try again
                      </motion.div>
                    )}
                    {status === "idle" && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" /> Send Message
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
