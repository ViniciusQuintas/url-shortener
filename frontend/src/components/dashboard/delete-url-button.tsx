"use client";

import { deleteUrlAction } from "@/actions/urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteUrlButtonProps {
  id: string;
}

export default function DeleteUrlButton({ id }: DeleteUrlButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteUrlAction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });

      toast.success("URL Deleted Successfully");

      const modal = document.getElementById(`delete-modal-${id}`);

      if (modal instanceof HTMLDialogElement) {
        modal.close();
      }
    },

    onError: () => {
      toast.error("Failed to delete URL");
    },
  });

  const openModal = () => {
    const modal = document.getElementById(`delete-modal-${id}`);

    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  return (
    <>
      {/* Delete button */}
      <button
        type="button"
        onClick={openModal}
        disabled={mutation.isPending}
        aria-label="Delete URL"
      >
        <Trash className="size-5 text-error cursor-pointer hover:opacity-60" />
      </button>

      {/* Confirmation modal */}
      <dialog id={`delete-modal-${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete URL</h3>

          <p className="py-4">
            Are you sure you want to delete this URL? This action cannot be
            undone.
          </p>

          <div className="modal-action">
            {/* Cancel */}
            <form method="dialog">
              <button
                type="submit"
                className="btn"
                disabled={mutation.isPending}
              >
                Cancel
              </button>
            </form>

            {/* Delete */}
            <button
              type="button"
              className="btn btn-error"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>

        {/* Clique fora fecha */}
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
}
