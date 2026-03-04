
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view published posts" ON public.journal_posts;
DROP POLICY IF EXISTS "Admins can read all posts" ON public.journal_posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.journal_posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.journal_posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.journal_posts;

-- Recreate as PERMISSIVE policies (OR logic)
CREATE POLICY "Anyone can view published posts"
ON public.journal_posts
FOR SELECT
USING (published = true);

CREATE POLICY "Admins can read all posts"
ON public.journal_posts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert posts"
ON public.journal_posts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
ON public.journal_posts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
ON public.journal_posts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
