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
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { retrieveDecryptedData } from "@/lib/cryptojs";
import { Badge } from "./ui/badge";

function CustomDialog() {
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState(""); // Store the password here
  const [phrase, setPhrase] = useState("");
  const [strings, setStrings] = useState<string[]>([""]);

  function onSuccess() {
    setSuccess(true);
  }

  function handlePasswordSubmit(password: string) {
    setPassword(password); // Save the password to state
    // console.log("Entered Password:", password);
  }

  useEffect(() => {
    if (password) {
      const fetchDecryptedPhrase = async () => {
        try {
          const decryptedPhrase = await retrieveDecryptedData(
            "encryptedPhrase",
            password
          );

          if (decryptedPhrase) {
            // Check if decryptedPhrase is not undefined
            const words = decryptedPhrase.split(" ");
            setStrings(words);
          } else {
            setStrings([]); // Optionally clear `strings` if decryptedPhrase is undefined
          }
        } catch (error) {
          console.error("Failed to retrieve or decrypt data:", error);
        }
      };

      fetchDecryptedPhrase();
    }
  }, [password]);
  // `password` as a dependency ensures this effect runs when password is updated
 
  function closeDialog() {
    setSuccess(false);
    setPhrase(""); // Clear the phrase when the dialog is closed
  }
  
  const words = phrase.split(" ");
  return (
    <Dialog onOpenChange={(open) => !open && closeDialog()}>
      <DialogTrigger asChild>
        <Button
          className="mt-3 bg-white/10 text-white border border-none hover:bg-white/20 hover:text-white focus:bg-white/30 focus:border focus:border-white"
          variant={"outline"}
        >
          View Phrase
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Secret Phrase</DialogTitle>
          <DialogDescription>
            Never share your secret phrase with anyone
          </DialogDescription>
        </DialogHeader>
        {!success ? (
          <AuthForm
            onSuccess={onSuccess}
            onPasswordSubmit={handlePasswordSubmit}
          />
        ) : (
          <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded">
            {strings &&
              strings.map((word, index) => (
                <Badge key={index} className="p-2 bg-blue-100 text-blue-700">
                  {`${index}) ${word}`}
                  {/* {word} */}
                </Badge>
              ))}
          </div>
        )}
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
