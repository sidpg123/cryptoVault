"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { encryptData, storeEncryptedData } from "@/lib/cryptojs"
import phraseAtom from "@/store/PhraseAtom"
import { useRecoilState } from "recoil"
import { PasswordInput } from "./PasswordInput"

const FormSchema = z.object({

  Password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

export function PasswordInputFrom() {
    
    const [phrase, setPhrase] = useRecoilState(phraseAtom);
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Password: "",
    },
  })

  async function  onSubmit(data: z.infer<typeof FormSchema>) {

    const encryptedPhrase = encryptData(phrase.phrase, data.Password);
    storeEncryptedData('encryptedPhrase', encryptedPhrase)
    setPhrase({
        phrase: encryptedPhrase
    })

    const encryptedPassword = encryptData(data.Password, data.Password);
    storeEncryptedData('encryptedPassword', encryptedPassword)
    await fetch('/api/set-cookie?key=isOnboarded&value=true');
    router.replace('/auth');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <PasswordInput field={field} placeholder="Enter your password" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
