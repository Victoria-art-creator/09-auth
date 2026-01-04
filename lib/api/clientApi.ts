import type { User } from '@/types/user';
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
  });

  return response.data;
};

export type CreateNotePayload = {
  title: string;
  content?: string;
  tag: string;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);

  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserPayload = {
  username?: string;
  avatar?: string;
};

export async function updateMe(payload: UpdateUserPayload): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
}
