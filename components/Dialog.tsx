"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { AuthForm } from "./Auth";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

function CustomDialog() {
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState(""); // Store the password here

  function onSuccess() {
    setSuccess(true);
  }

  function handlePasswordSubmit(password: string) {
    setPassword(password); // Save the password to state
    console.log("Entered Password:", password);
  }

  function closeDialog() {
    setSuccess(false)
  }
  return (
    <Dialog onOpenChange={(open) => !open && closeDialog()}>
      <DialogTrigger asChild>
      <Button className="mt-3 bg-white/10 text-white border border-none hover:bg-white/20 hover:text-white focus:bg-white/30 focus:border focus:border-white" variant={"outline"} >View Phrase</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Secret Phrase</DialogTitle>
          <DialogDescription>
            Never share your secret phrase with anyone
          </DialogDescription>
        </DialogHeader>
        {!success ? <AuthForm onSuccess={onSuccess} onPasswordSubmit={handlePasswordSubmit} /> : <div>Entered Password: {password}</div> }
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={closeDialog}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
