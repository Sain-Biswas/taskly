"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupForm = z.object({
  username: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export default function SignupForm() {
  const form = useForm({
    resolver: zodResolver(signupForm),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupForm>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-4/5 max-w-96 space-y-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
