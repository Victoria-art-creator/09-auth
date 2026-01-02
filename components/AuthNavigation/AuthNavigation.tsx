'use client';
import css from './AuthNavigation.module.css';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/clientApi';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearIsAuthenticated();
      router.push('/sign-in');
    }
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.logoutItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}

//     return (
//          <li className={css.navigationItem}>
//   <a href="/profile" prefetch={false} className={css.navigationLink}>
//     Profile
//   </a>
// </li>

// <li className={css.navigationItem}>
//   <p className={css.userEmail}>User email</p>
//   <button className={css.logoutButton}>
//     Logout
//   </button>
// </li>

// <li className={css.navigationItem}>
//   <a href="/sign-in" prefetch={false} className={css.navigationLink}>
//     Login
//   </a>
// </li>

// <li className={css.navigationItem}>
//   <a href="/sign-up" prefetch={false} className={css.navigationLink}>
//     Sign up
//   </a>
// </li>);
