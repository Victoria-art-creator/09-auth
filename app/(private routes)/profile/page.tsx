import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Profile Page - NoteHub',
  description: 'Profile page of NoteHub application',
  openGraph: {
    title: 'Profile Page - NoteHub',
    description: 'Profile page of NoteHub application',
    url: 'https://08-zustand-khaki-nine.vercel.app',
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

const ProfilePage = () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="#" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="{avatar}"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
