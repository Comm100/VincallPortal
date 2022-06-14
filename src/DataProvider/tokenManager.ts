export const tokenManager = {
  setToken(token: string) {
    try {
      localStorage.setItem("vincall-token", token);
    } catch (e) {
      console.error("Set token failed!", e);
    }
  },
  getToken(): string {
    return localStorage.getItem("vincall-token")!;
  },
  removeToken(): string {
    return localStorage.removeItem("vincall-token")!;
  },
};
