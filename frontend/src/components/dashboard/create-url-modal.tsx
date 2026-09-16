"use client";

import { UrlFormData, urlSchema } from "@/schemas/url.schema";
import { createUrlAction } from "@/actions/urls";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "cn";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateUrlModal() {
  const [serverError, setServerError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUrlAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });

      const modal = document.getElementById("my_modal_3");

      if (modal instanceof HTMLDialogElement) {
        modal.close();
      }
      toast.success("URL Created Successfully");
      reset();
    },

    onError: (error) => {
      setServerError(error.message);
    },
  });

  const openModal = () => {
    const modal = document.getElementById("my_modal_3");

    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = (data: UrlFormData) => {
    setServerError(null);

    const payload = {
      originalUrl: data.originalUrl,
      expiresAt: data.expiresAt
        ? new Date(`${data.expiresAt}T23:59:59`).toISOString()
        : undefined,
    };

    mutation.mutate(payload);
  };

  return (
    <>
      <button className="btn btn-primary font-bold" onClick={openModal}>
        New Url
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-5">New URL</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="url">URL</label>

              <input
                type="text"
                id="url"
                placeholder="https://your.url.com"
                required
                className={cn(
                  "input mt-1.5 w-full",
                  errors.originalUrl ? "input-error" : "input-primary",
                )}
                {...register("originalUrl")}
              />

              {errors.originalUrl && (
                <span className="text-error block mt-1.5">
                  {errors.originalUrl.message}
                </span>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="expiresAt">Expiration date</label>

              <input
                type="date"
                id="expiresAt"
                className={cn(
                  "input mt-1.5 w-full",
                  errors.expiresAt ? "input-error" : "input-primary",
                )}
                {...register("expiresAt")}
              />

              {errors.expiresAt && (
                <span className="text-error block mt-1.5">
                  {errors.expiresAt.message}
                </span>
              )}
            </div>

            {serverError && (
              <span className="text-error block text-center">
                {serverError}
              </span>
            )}

            <button
              className="btn btn-primary mt-5"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
