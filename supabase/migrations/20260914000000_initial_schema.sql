-- Enums
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'parent', 'admin');
CREATE TYPE consent_status AS ENUM ('pending', 'granted', 'revoked');
CREATE TYPE progress_status AS ENUM ('in_progress', 'completed', 'stuck');
CREATE TYPE submission_state AS ENUM ('draft', 'submitted', 'approved', 'needs_changes');
CREATE TYPE visibility_state AS ENUM ('private', 'public');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'excused');
CREATE TYPE help_request_status AS ENUM ('open', 'resolved');
CREATE TYPE verification_purpose AS ENUM ('signup', 'password_reset');
CREATE TYPE safety_report_status AS ENUM ('open', 'investigating', 'resolved', 'dismissed');
CREATE TYPE testimonial_status AS ENUM ('pending', 'published', 'rejected');
CREATE TYPE cohort_role AS ENUM ('student', 'instructor');

-- Tables

-- profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    display_name TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'en',
    grade_band TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- parent_student_links
CREATE TABLE parent_student_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    consent_status consent_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(parent_id, student_id)
);
CREATE INDEX idx_parent_links_parent ON parent_student_links(parent_id);
CREATE INDEX idx_parent_links_student ON parent_student_links(student_id);

-- tracks
CREATE TABLE tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    age_band TEXT NOT NULL,
    locale_copy JSONB
);

-- curricula
CREATE TABLE curricula (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    version_metadata JSONB NOT NULL
);

-- lessons
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    "order" INT NOT NULL,
    content_refs JSONB NOT NULL
);

-- rubrics
CREATE TABLE rubrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dimension_definitions JSONB NOT NULL
);

-- cohorts
CREATE TABLE cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE RESTRICT,
    age_band TEXT NOT NULL CHECK (age_band IN ('5-8', '9-12')),
    starts_at DATE NOT NULL,
    ends_at DATE NOT NULL,
    join_code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_cohorts_join_code ON cohorts(UPPER(join_code)) WHERE join_code IS NOT NULL;

-- sections
CREATE TABLE sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    section_metadata JSONB
);

-- cohort_memberships
CREATE TABLE cohort_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role_in_cohort cohort_role NOT NULL,
    section_id UUID REFERENCES sections(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(cohort_id, profile_id)
);
CREATE INDEX idx_cohort_members_profile ON cohort_memberships(profile_id);
CREATE INDEX idx_cohort_members_cohort ON cohort_memberships(cohort_id);

-- progress
CREATE TABLE progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    step TEXT NOT NULL,
    status progress_status NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_progress_profile_lesson ON progress(profile_id, lesson_id);

-- interactive_step_attempts
CREATE TABLE interactive_step_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    step_id TEXT NOT NULL,
    code_snapshot JSONB NOT NULL,
    result JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    brief_content TEXT NOT NULL,
    rubric_id UUID NOT NULL REFERENCES rubrics(id) ON DELETE RESTRICT
);

-- submissions
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    code_snapshot JSONB NOT NULL,
    revision_history JSONB,
    paste_event_log JSONB,
    reflection TEXT,
    state submission_state NOT NULL DEFAULT 'draft',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_submissions_queue ON submissions(student_id, project_id, state);

-- submission_reviews
CREATE TABLE submission_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    instructor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rubric_scores JSONB NOT NULL,
    feedback TEXT NOT NULL,
    needs_live_checkin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- portfolio_projects
CREATE TABLE portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    visibility visibility_state NOT NULL DEFAULT 'private',
    description TEXT
);

-- live_sessions
CREATE TABLE live_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    meeting_url TEXT NOT NULL
);

-- live_session_attendance (backlog)
CREATE TABLE live_session_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status attendance_status NOT NULL
);

-- ai_interactions
CREATE TABLE ai_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    mode TEXT NOT NULL,
    flagged_distress BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- help_requests
CREATE TABLE help_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    ai_interaction_id UUID REFERENCES ai_interactions(id) ON DELETE SET NULL,
    status help_request_status NOT NULL DEFAULT 'open'
);

-- email_verifications
CREATE TABLE email_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    code_hash TEXT NOT NULL,
    purpose verification_purpose NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_email_verifications_lookup ON email_verifications(email, purpose);

-- admin_audit_log
CREATE TABLE admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL REFERENCES profiles(id),
    action TEXT NOT NULL,
    target_id UUID,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- safety_flags
CREATE TABLE safety_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    subject_id UUID,
    category TEXT NOT NULL,
    status safety_report_status NOT NULL DEFAULT 'open',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- feature_flags
CREATE TABLE feature_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    enabled BOOLEAN NOT NULL DEFAULT FALSE,
    updated_by UUID NOT NULL REFERENCES profiles(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- testimonials
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    status testimonial_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-------------------------------------------------------------------------------
-- Row Level Security (RLS)
-------------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE curricula ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactive_step_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_session_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin (security definer to bypass RLS)
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- profiles RLS: Read/Update own row
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id OR is_admin());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR is_admin());

-- parent_student_links RLS
CREATE POLICY "Parents view own links" ON parent_student_links FOR SELECT USING (
    parent_id = auth.uid() OR student_id = auth.uid() OR is_admin()
);

-- cohort_memberships RLS
CREATE POLICY "View own memberships" ON cohort_memberships FOR SELECT USING (
    profile_id = auth.uid() OR is_admin() OR EXISTS (
        SELECT 1 FROM cohort_memberships cm 
        WHERE cm.cohort_id = cohort_memberships.cohort_id 
        AND cm.profile_id = auth.uid() 
        AND cm.role_in_cohort = 'instructor'
    )
);

-- progress RLS
CREATE POLICY "Students write own progress" ON progress FOR INSERT WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Students update own progress" ON progress FOR UPDATE USING (profile_id = auth.uid());
CREATE POLICY "Read progress" ON progress FOR SELECT USING (
    profile_id = auth.uid() OR is_admin() OR EXISTS (
        SELECT 1 FROM cohort_memberships cm
        WHERE cm.profile_id = auth.uid() AND cm.role_in_cohort = 'instructor'
        AND cm.cohort_id IN (
            SELECT cohort_id FROM cohort_memberships WHERE profile_id = progress.profile_id
        )
    )
);

-- interactive_step_attempts RLS
CREATE POLICY "Insert own attempts" ON interactive_step_attempts FOR INSERT WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Read attempts" ON interactive_step_attempts FOR SELECT USING (
    profile_id = auth.uid() OR is_admin() OR EXISTS (
        SELECT 1 FROM cohort_memberships cm
        WHERE cm.profile_id = auth.uid() AND cm.role_in_cohort = 'instructor'
        AND cm.cohort_id IN (
            SELECT cohort_id FROM cohort_memberships WHERE profile_id = interactive_step_attempts.profile_id
        )
    )
);

-- submissions RLS
CREATE POLICY "Students manage own submissions" ON submissions FOR ALL USING (student_id = auth.uid());
CREATE POLICY "Instructors view cohort submissions" ON submissions FOR SELECT USING (
    is_admin() OR EXISTS (
        SELECT 1 FROM cohort_memberships cm
        WHERE cm.profile_id = auth.uid() AND cm.role_in_cohort = 'instructor'
        AND cm.cohort_id IN (
            SELECT cohort_id FROM cohort_memberships WHERE profile_id = submissions.student_id
        )
    )
);

-- submission_reviews RLS
CREATE POLICY "Students read reviews on own submissions" ON submission_reviews FOR SELECT USING (
    EXISTS (SELECT 1 FROM submissions s WHERE s.id = submission_id AND s.student_id = auth.uid()) OR is_admin()
);

-- portfolio_projects RLS
CREATE POLICY "Public portfolios require consent" ON portfolio_projects FOR SELECT USING (
    visibility = 'public' AND EXISTS (
        SELECT 1 FROM parent_student_links psl 
        WHERE psl.student_id = portfolio_projects.student_id 
        AND psl.consent_status = 'granted'
    )
    OR student_id = auth.uid()
    OR is_admin()
);

-- ai_interactions RLS
CREATE POLICY "Admin only read for AI interactions" ON ai_interactions FOR SELECT USING (is_admin());

-- admin_audit_log RLS & GRANT limits
CREATE POLICY "Admin only read for audit log" ON admin_audit_log FOR SELECT USING (is_admin());
REVOKE UPDATE, DELETE ON admin_audit_log FROM authenticated, anon, service_role;

-- feature_flags RLS
CREATE POLICY "Public read for enabled flags" ON feature_flags FOR SELECT USING (enabled = true OR is_admin());

-- testimonials RLS
CREATE POLICY "Public read for published testimonials" ON testimonials FOR SELECT USING (status = 'published' OR author_id = auth.uid() OR is_admin());

-- safety_flags RLS
CREATE POLICY "Reporter view own reports" ON safety_flags FOR SELECT USING (reporter_id = auth.uid() OR is_admin());
CREATE POLICY "Reporter insert" ON safety_flags FOR INSERT WITH CHECK (reporter_id = auth.uid());

-- General public read policies for curriculum and static data
CREATE POLICY "Public tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Public lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Public rubrics" ON rubrics FOR SELECT USING (true);
CREATE POLICY "Public projects" ON projects FOR SELECT USING (true);
