import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { IconGithub } from "../components/icons/IconGithub";
import { IconGoogle } from "../components/icons/IconGoogle";
import { IconRobot } from "../components/icons/IconRobot";
import { useLogin } from "../hooks/useLogin";

export default function LoginView() {
  const { login, register } = useLogin();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (location.pathname.includes("login")) await login(email, password);
    else register(username, email, password);
  };
  return (
    <main>
      <div className="min-h-screen flex items-center flex-col bg-gradient-to-br from-background to-background">
        <div className="container flex flex-col items-center justify-center min-h-screen py-12">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {location.pathname.includes("login")
                  ? "Wellcome back"
                  : "Create account"}
              </h1>
            </div>
            {location.pathname.includes("register") && (
              <div className="flex flex-col items-center space-y-2">
                <div className="avatar">
                  <div className="ring-primary bg-stone-800 ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    {!email.length ? (
                      <div className="flex h-full flex-1 justify-center items-center">
                        <IconRobot className="h-12 w-12" />
                      </div>
                    ) : (
                      <img
                        src={`https://robohash.org/${email}.png`}
                        alt="avatar"
                      />
                    )}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  Unique avatar based on your email
                </span>
              </div>
            )}
            <div className="grid gap-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      placeholder="nombre@ejemplo.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className="input w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {location.pathname.includes("register") && (
                    <div className="grid gap-2">
                      <label
                        htmlFor="username"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Username
                      </label>
                      <input
                        id="username"
                        placeholder="jhon"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="username"
                        autoCorrect="off"
                        className="input w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Password
                      </label>
                      {location.pathname.includes("login") && (
                        <Link
                          to="/forgot-password"
                          className="text-sm font-medium text-primary hover:underline underline-offset-4"
                        >
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      className="input w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 space-x-2">
                    <input id="remember" type="checkbox" className="checkbox" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Rememberme
                    </label>
                  </div>
                  <button
                    disabled={!email || !password}
                    type="submit"
                    className="w-full btn btn-primary"
                  >
                    {location.pathname.includes("login")
                      ? "Sign in"
                      : "Sign up"}
                  </button>
                </div>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full divider" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="w-full btn btn-outline">
                  <IconGithub className="h-4 w-4" />
                  Github
                </button>
                <button type="button" className="w-full btn btn-outline">
                  <IconGoogle className="h-4 w-4" />
                  Google
                </button>
              </div>
            </div>

            {location.pathname.includes("login") ? (
              <div className="px-8 pt-8 text-center text-sm text-muted-foreground">
                Don't have an account?
                <Link
                  to="/register"
                  className="hover:text-primary underline underline-offset-4 ml-2"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="px-8 pt-8 text-center text-sm text-muted-foreground">
                Already registerd?
                <Link
                  to="/login"
                  className="hover:text-primary underline underline-offset-4 ml-2"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
