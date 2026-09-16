"use client";
import Link from "next/link";
import { Link as LinkUrl } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();

      setServerError(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <section className="flex items-center my-auto flex-col gap-y-4">
      <div className="text-center">
        <LinkUrl className="text-primary mx-auto mb-10" size={50} />
        <h2 className="text-2xl font-bold mb-2 text-white">
          Sign in your account
        </h2>
        <p className="text-md">Welcome back! Please enter your details.</p>
      </div>
      <form
        className="flex w-full max-w-md flex-col gap-y-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
            className={cn(
              "input mt-1.5 w-full",
              errors.email ? "input-error" : "input-primary",
            )}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-error block mt-1.5">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="•••••••"
            required
            className={cn(
              "input mt-1.5 w-full",
              errors.password ? "input-error" : "input-primary",
            )}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-error block mt-1.5">
              {errors.password.message}
            </span>
          )}
        </div>

        {serverError && (
          <span className="text-error text-center">{serverError}</span>
        )}

        <button className="btn btn-primary" type="submit">
          Sign in
        </button>
        <div className="divider divider-neutral"></div>
        <span className="text-center ">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="hover:text-primary hover:underline text-white"
          >
            Sign up
          </Link>
        </span>
      </form>
    </section>
  );
}
