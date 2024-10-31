"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { retrieveDecryptedData } from "@/lib/cryptojs";
import authAtom from "@/store/authAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { z } from "zod";
import { PasswordInput } from "./PasswordInput";

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

  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authAtom);

  if (isAuthenticated === true) redirect("/wallet");
  // console.log("isauthentedslkjf:", isAuthenticated);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with data:", data);
    const decryptedPassword = retrieveDecryptedData(
      "encryptedPassword",
      data.password
    );
    console.log("decryptedPassword:", decryptedPassword);
    console.log("password", data.password);
    console.log("isEqual:", decryptedPassword === data.password);
  
    if (decryptedPassword === data.password) {
      setIsAuthenticated(true);
      
      try {
        const response = await fetch(
          "/api/set-cookie?key=isAuthenticated&value=true"
        );
  
        if (!response.ok) {
          throw new Error('Failed to set cookie');
        }
  
        const cookieData = await response.json();
        console.log(cookieData);
      } catch (error) {
        console.error("Error setting cookie:", error);
      }
    } else {

    }
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
                <PasswordInput
                  field={field}
                  placeholder="Enter your password"
                />
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
