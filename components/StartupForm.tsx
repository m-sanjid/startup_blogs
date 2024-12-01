"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="px-6 my-5 mx-auto space-y-8 max-w-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-lg border md: min-w-[75%] border-neutral-400/50 border-r-0 border-b-0 shadow-xl shadow-current"
    >
      <div className="pt-2 mt-5">
        <label
          htmlFor="title"
          className="ml-3 text-sm font-medium leading-none text-white text-[18px]"
        >
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="flex py-2 px-3 mt-1 w-full h-16 text-sm text-white rounded-md border-none transition focus-visible:outline-none bg-zinc-800 shadow-input placeholder-text-neutral-600 shadow-[0px_0px_1px_1px_var(--neutral-700)] duration-400 group-hover/input:shadow-none focus-visible:ring-[1.5px] focus-visible:ring-neutral-600"
          required
          placeholder="Startup Title"
        />

        {errors.title && (
          <p className="mt-2 ml-5 text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="ml-3 text-sm font-medium leading-none text-white text-[18px]"
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="flex py-2 px-5 mt-1 w-full h-20 text-sm text-white rounded-md border-none transition focus-visible:outline-none bg-zinc-800 shadow-input placeholder-text-neutral-600 shadow-[0px_0px_1px_1px_var(--neutral-700)] duration-400 group-hover/input:shadow-none focus-visible:ring-[1.5px] focus-visible:ring-neutral-600"
          required
          placeholder="Startup Description"
        />

        {errors.description && (
          <p className="mt-2 ml-5 text-red-500">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="ml-3 text-sm font-medium leading-none text-white text-[18px]"
        >
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="flex py-2 px-5 mt-1 w-full h-16 text-sm text-white rounded-md border-none transition focus-visible:outline-none bg-zinc-800 shadow-input placeholder-text-neutral-600 shadow-[0px_0px_1px_1px_var(--neutral-700)] duration-400 group-hover/input:shadow-none focus-visible:ring-[1.5px] focus-visible:ring-neutral-600"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="mt-2 ml-5 text-red-500">{errors.category}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="link"
          className="ml-3 text-sm font-medium leading-none text-white text-[18px]"
        >
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="flex py-2 px-5 mt-1 w-full h-16 text-sm text-white rounded-md border-none transition focus-visible:outline-none bg-zinc-800 shadow-input placeholder-text-neutral-600 shadow-[0px_0px_1px_1px_var(--neutral-700)] duration-400 group-hover/input:shadow-none focus-visible:ring-[1.5px] focus-visible:ring-neutral-600"
          required
          placeholder="Startup Image URL"
        />

        {errors.link && <p className="mt-2 ml-5 text-red-500">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label
          htmlFor="pitch"
          className="ml-3 text-sm font-medium leading-none text-white text-[18px]"
        >
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 10, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && (
          <p className="mt-2 ml-5 text-red-500">{errors.pitch}</p>
        )}
      </div>
      <div className="flex justify-center items-center p-5 pb-10 m-5">
        <Button
          type="submit"
          className="flex justify-center items-center w-1/2 h-12 bg-gradient-to-l border active:text-red-200 text-neutral-100 border-white/[50] from-white/20 via-white/15 to-white/10 backdrop-blur-lg startup-form_btn hover:text-sky-400 hover:border-sky-500"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send className="ml-2 size-6" color="#0ea5e9" />
        </Button>
      </div>
    </form>
  );
};

export default StartupForm;
