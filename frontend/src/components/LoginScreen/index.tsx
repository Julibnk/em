import styles from './styles.module.css';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || event === 'USER_DELETED' || session === null) {
    // delete cookies on sign out
    const expires = new Date(0).toUTCString();
    document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
  } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
    document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
  }
});

const LoginScreen = () => {
  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          socialLayout='horizontal'
          providers={['facebook']}
          // socialButtonSize='xlarge'
        />
      </div>
    </div>
  );
};

export default LoginScreen;
