"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "./PasswordInput";
import { useRecoilState } from "recoil";
import authAtom from "@/store/authAtom";
import { retrieveDecryptedData } from "@/lib/cryptojs";

const FormSchema = z.object({
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function AuthForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authAtom)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with data:", data);
    const decryptedPassword = retrieveDecryptedData('encryptedPassword', data.password)
    console.log('decryptedPassword:', decryptedPassword);
    console.log('passwrod', data.password);
    console.log('isEqual:', decryptedPassword === data.password)
    
    setIsAuthenticated(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput field={field} placeholder="Enter your password" />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
