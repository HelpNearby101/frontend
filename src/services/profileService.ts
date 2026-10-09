import { CURRENT_USER_ID, users } from "@/lib/mock-data";
import type { User } from "@/lib/types";
import { API, http, mock } from "./config";

export const profileService = {
  getUsers(): Promise<User[]> {
    return API.profile ? http(API.profile, "/users") : mock(users);
  },
  getCurrentUser(): Promise<User> {
    return API.profile ? http(API.profile, "/users/me") : mock(users.find((u) => u.id === CURRENT_USER_ID)!);
  },
  getUser(id: string): Promise<User | null> {
    return API.profile ? http(API.profile, `/users/${id}`) : mock(users.find((u) => u.id === id) ?? null);
  },
};
