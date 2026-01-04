import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Profile Page - NoteHub',
  description: 'Profile page of NoteHub application',
  openGraph: {
    title: 'Profile Page - NoteHub',
    description: 'Profile page of NoteHub application',
    url: 'https://09-auth-woad-nu.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Profile Page Open Graph Image',
      },
    ],
  },
};

const ProfilePage = async () => {
  const user = await getServerMe();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
