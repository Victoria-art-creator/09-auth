import User from '@/types/user';
import type { Note } from '../../types/note';
import { nextServer } from './api';

export default interface NoteHTTPResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

export const fetchNotes = async (
  search?: string,
  page = 1,
  tag?: string,
): Promise<NoteHTTPResponse> => {
  const response = await nextServer.get<NoteHTTPResponse>(`/notes`, {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  // const res = await nextServer.post<User>('/auth/register', data);
  // return res.data;
  const { data: user } = await nextServer.post('/auth/register', data);
  return user;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const { data: user } = await nextServer.post('/auth/login', data);
  return user;
  // const res = await nextServer.post<User>('/auth/login', data);
  // return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};

export const logout = async () => {
  await nextServer.post('/auth/logout');
};
