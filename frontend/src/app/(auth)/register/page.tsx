"use client";
import Link from "next/link";
import { ArrowDown, Link as LinkUrl } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterFormData, registerSchema } from "./register.schema";
import { FlipWords } from "@/components/ui/flip-words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { toast } from "sonner";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const flipWords = ["fast", "simple", "trackble"];

  const typewriterWords = [
    {
      text: "https://sho.rt/aW36Fd",
    },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    const response = await fetch("/api/register", {
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

    toast.success("Account created successfully!");
    router.push("/login");
  };

  return (
    <section className="flex w-full h-full mx-0 my-auto">
      <div className="w-full lg:w-1/2 flex items-center flex-col my-auto">
        <div className="text-left">
          <LinkUrl className="text-primary mx-auto mb-10" size={50} />
          <h2 className="text-2xl font-bold mb-2 text-white">
            Sign up for an account
          </h2>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-y-6 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="Name"
              placeholder="Your Name"
              required
              className={cn(
                "input mt-1.5 w-full",
                errors.name ? "input-error" : "input-primary",
              )}
              {...register("name")}
            />
            {errors.name && (
              <span className="text-error block mt-1.5">
                {errors.name.message}
              </span>
            )}
          </div>

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
            Sign Up
          </button>
          <div className="divider divider-neutral"></div>
          <span className="text-center ">
            Already have an account?{" "}
            <Link
              href="/login"
              className="hover:text-primary hover:underline text-white"
            >
              Sign in
            </Link>
          </span>
        </form>
      </div>
      <div className="divider divider-horizontal lg:flex hidden"></div>
      <div className="w-1/2 text-center lg:block hidden py-14">
        <h2 className="text-2xl text-white mb-6">Shorten your URL</h2>
        <h2 className="text-5xl mx-auto font-normal text-white">
          Turn long URLs into{" "}
          <FlipWords className="text-accent" words={flipWords} />
          links
        </h2>

        <div className="flex flex-col items-center mt-14">
          <div className="card card-border border-neutral bg-base-300 w-max">
            <span className="card-body card-title">
              https://mywebsite.com/blog/how-to-build-a-successful-product...
            </span>
          </div>

          <div className="flex flex-col items-center my-3">
            <div className="h-5 w-px bg-base-content/20" />

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <ArrowDown size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">
                Shortened
              </span>
            </div>

            <div className="h-5 w-px bg-base-content/20" />
          </div>

          <div className="card card-border border-neutral bg-base-300 w-max">
            <span className="card-body">
              <TypewriterEffectSmooth
                words={typewriterWords}
                className="text-xl text-primary"
                cursorClassName="h-8 w-[2px]"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
