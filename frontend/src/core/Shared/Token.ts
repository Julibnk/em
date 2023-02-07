export class Token {
  static get(): string | null {
    return localStorage.getItem('token');
  }

  static set(token: string): void {
    localStorage.setItem('token', token);
  }

  static delete(): void {
    localStorage.removeItem('token');
  }
}
