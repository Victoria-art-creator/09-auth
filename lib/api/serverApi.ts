import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import NoteHTTPResponse from './clientApi';
// import { nextServer } from './api';
import { api } from '../../app/api/api';

export async function checkServerSession() {
  const cookieStore = await cookies();

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getServerMe(): Promise<User | null> {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch {
    return null;
  }
}

export const fetchNotes = async (
  search?: string,
  page = 1,
  tag?: string,
): Promise<NoteHTTPResponse> => {
  const cookieStore = await cookies();
  try {
    const response = await api.get<NoteHTTPResponse>(`/notes`, {
      params: {
        page,
        perPage: 12,
        ...(search ? { search } : {}),
        ...(tag ? { tag } : {}),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response.data ?? { notes: [], totalPages: 0 };
  } catch {
    return { notes: [], totalPages: 0, page: 1, perPage: 12 };
  }
};

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}
