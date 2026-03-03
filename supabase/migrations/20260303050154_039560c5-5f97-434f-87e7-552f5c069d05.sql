
-- Add image_url column to journal_posts
ALTER TABLE public.journal_posts ADD COLUMN image_url TEXT;

-- Create storage bucket for journal images
INSERT INTO storage.buckets (id, name, public) VALUES ('journal-images', 'journal-images', true);

-- Public read access
CREATE POLICY "Anyone can view journal images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'journal-images');

-- Admins can upload journal images
CREATE POLICY "Admins can upload journal images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'journal-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins can update journal images
CREATE POLICY "Admins can update journal images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'journal-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins can delete journal images
CREATE POLICY "Admins can delete journal images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'journal-images' AND public.has_role(auth.uid(), 'admin'));
