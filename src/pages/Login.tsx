import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  if (loading) return null;
  if (user) return <Navigate to="/admin" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email for a reset link." });
    }
  };

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
            <h1 className="text-foreground !text-3xl">
              {forgotMode ? "Reset Password" : "Sign In"}
            </h1>
          </div>

          <form onSubmit={forgotMode ? handleForgot : handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!forgotMode && (
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            )}
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {forgotMode ? "Send Reset Link" : "Sign In"}
            </Button>
          </form>

          <button
            onClick={() => setForgotMode(!forgotMode)}
            className="block mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {forgotMode ? "Back to sign in" : "Forgot password?"}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
