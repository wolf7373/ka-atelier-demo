import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z.string().max(100, "Company name must be less than 100 characters").optional(),
  message: z
    .string()
    .trim()
    .min(1, "Please tell us about your project")
    .max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: result.data,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll be in touch soon.",
      });

      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="label-text text-muted-foreground">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`bg-transparent border-border focus:border-champagne transition-colors ${
              errors.name ? "border-destructive" : ""
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="label-text text-muted-foreground">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-transparent border-border focus:border-champagne transition-colors ${
              errors.email ? "border-destructive" : ""
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="label-text text-muted-foreground">
          Company / Brand (Optional)
        </label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`bg-transparent border-border focus:border-champagne transition-colors ${
            errors.company ? "border-destructive" : ""
          }`}
          placeholder="Your company or brand name"
        />
        {errors.company && (
          <p className="text-sm text-destructive">{errors.company}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="label-text text-muted-foreground">
          Project Details
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`bg-transparent border-border focus:border-champagne transition-colors resize-none ${
            errors.message ? "border-destructive" : ""
          }`}
          placeholder="Tell us about your project, timeline, and any specific requirements..."
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="editorial"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </Button>
    </motion.form>
  );
};

export default ContactForm;
