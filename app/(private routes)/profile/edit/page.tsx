'use client';

import type { User } from '@/types/user';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMe, updateMe } from '@/lib/api/clientApi';

export default function EditProfilePage() {
  const router = useRouter();

  const { setUser } = useAuthStore();

  const [username, setUsername] = useState('');

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['me'],
    queryFn: getMe,
  });

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { username: string }) =>
      updateMe({ username: payload.username }),

    onSuccess: (updatedUser: User) => {
      setUser(updatedUser);

      router.push('/profile');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ username });
  };

  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user.username}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isPending}
            >
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
