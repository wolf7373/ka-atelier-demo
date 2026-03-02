import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated successfully" });
      navigate("/admin");
    }
  };

  if (!ready) {
    return (
      <section className="section-spacing">
        <div className="container-editorial text-center">
          <p className="text-muted-foreground">Invalid or expired reset link.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-sm mx-auto space-y-8"
        >
          <div className="text-center space-y-2">
            <span className="label-text text-champagne">Admin</span>
            <h1 className="text-foreground !text-3xl">New Password</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="New password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Password
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ResetPassword;
