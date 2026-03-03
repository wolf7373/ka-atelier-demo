import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, LogOut, Eye, EyeOff, ImagePlus, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PostForm {
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  published: boolean;
  image_url: string | null;
}

const emptyForm: PostForm = { title: "", excerpt: "", tag: "", date: "", published: true, image_url: null };

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [uploading, setUploading] = useState(false);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-journal-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;
    setUploading(true);
    const { error } = await supabase.storage
      .from("journal-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    setUploading(false);
    if (error) {
      toast({ title: "Image upload failed", variant: "destructive" });
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("journal-images")
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }
    const url = await uploadImage(file);
    if (url) setForm((f) => ({ ...f, image_url: url }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const saveMutation = useMutation({
    mutationFn: async (post: PostForm & { id?: string }) => {
      const payload = { title: post.title, excerpt: post.excerpt, tag: post.tag, date: post.date, published: post.published, image_url: post.image_url };
      if (post.id) {
        const { error } = await supabase.from("journal_posts").update(payload).eq("id", post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("journal_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-journal-posts"] });
      qc.invalidateQueries({ queryKey: ["journal-posts"] });
      toast({ title: editId ? "Post updated" : "Post created" });
      closeDialog();
    },
    onError: () => toast({ title: "Failed to save post", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("journal_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-journal-posts"] });
      qc.invalidateQueries({ queryKey: ["journal-posts"] });
      toast({ title: "Post deleted" });
      setDeleteId(null);
    },
    onError: () => toast({ title: "Failed to delete post", variant: "destructive" }),
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const openEdit = (post: any) => {
    setEditId(post.id);
    setForm({ title: post.title, excerpt: post.excerpt, tag: post.tag, date: post.date, published: post.published, image_url: post.image_url });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({ ...form, id: editId ?? undefined });
  };

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) {
    return (
      <section className="section-spacing">
        <div className="container-editorial text-center">
          <p className="text-muted-foreground">You don't have admin access.</p>
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
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="label-text text-champagne">Admin</span>
              <h1 className="text-foreground !text-3xl mt-2">Journal Posts</h1>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => { setForm(emptyForm); setEditId(null); setDialogOpen(true); }} className="gap-2">
                <Plus className="w-4 h-4" /> New Post
              </Button>
              <Button variant="outline" onClick={signOut} className="gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              {posts?.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-4 p-6 bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-20 h-14 object-cover shrink-0 rounded-sm"
                    />
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="label-text text-champagne">{post.tag}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      {!post.published && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg text-foreground truncate">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(post.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              {posts?.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No posts yet.</p>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editId ? "Edit Post" : "New Post"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image upload */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {form.image_url ? (
                <div className="relative">
                  <img
                    src={form.image_url}
                    alt="Post image"
                    className="w-full aspect-[16/9] object-cover rounded-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={() => setForm((f) => ({ ...f, image_url: null }))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full aspect-[16/9] border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <ImagePlus className="w-6 h-6" />
                      <span className="text-sm">Add cover image</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Tag (e.g. Trends)"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                required
              />
              <Input
                placeholder="Date (e.g. March 2026)"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <Textarea
              placeholder="Excerpt"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={4}
              required
            />
            <div className="flex items-center gap-3">
              <Switch
                checked={form.published}
                onCheckedChange={(checked) => setForm({ ...form, published: checked })}
              />
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                {form.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {form.published ? "Published" : "Draft"}
              </span>
            </div>
            <Button type="submit" disabled={saveMutation.isPending} className="w-full">
              {saveMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editId ? "Save Changes" : "Create Post"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Admin;
