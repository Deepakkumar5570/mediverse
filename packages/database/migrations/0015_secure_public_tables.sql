-- Secure application tables from direct Supabase Data API access.
-- Application database access is handled server-side through
-- Next.js + Drizzle using the trusted PostgreSQL connection.

-- Enable Row Level Security on all application tables.
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtopics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comment_likes ENABLE ROW LEVEL SECURITY;

-- Remove direct Data API access for unauthenticated and authenticated
-- Supabase roles. Application access goes through the server-side
-- Drizzle connection instead.
REVOKE ALL ON TABLE programs FROM anon, authenticated;
REVOKE ALL ON TABLE semesters FROM anon, authenticated;
REVOKE ALL ON TABLE subjects FROM anon, authenticated;
REVOKE ALL ON TABLE units FROM anon, authenticated;
REVOKE ALL ON TABLE topics FROM anon, authenticated;
REVOKE ALL ON TABLE subtopics FROM anon, authenticated;
REVOKE ALL ON TABLE contents FROM anon, authenticated;
REVOKE ALL ON TABLE mcqs FROM anon, authenticated;
REVOKE ALL ON TABLE flashcards FROM anon, authenticated;
REVOKE ALL ON TABLE progress FROM anon, authenticated;
REVOKE ALL ON TABLE community_posts FROM anon, authenticated;
REVOKE ALL ON TABLE community_comments FROM anon, authenticated;
REVOKE ALL ON TABLE community_post_likes FROM anon, authenticated;
REVOKE ALL ON TABLE community_comment_likes FROM anon, authenticated;