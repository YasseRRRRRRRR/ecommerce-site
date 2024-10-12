import { signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="bg-white py-20">
      <label htmlFor="email">Display Name:</label>
      <input id="name" name="name" type="text" required />
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
