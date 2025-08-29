"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .post("/api/auth/signup", {
        name,
        email,
        password,
      })
      .then((res) => {
        if (res.status !== 201) {
          toast.error("Failed to sign up");
        }
        setLoading(false);
        setOpen(false);
        signIn("credentials", {
          name,
          email,
          password,
          redirect: true,
          callbackUrl: "/",
        });
        toast.success(`${name} created successfully`);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "An error occurred", {});
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="underline underline-offset-4 p-0 text-foreground cursor-pointer"
        >
          Sign up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign up for your account</DialogTitle>
          <DialogDescription>
            Enter your email below to create a new account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignup}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-rows items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Nickname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-rows items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-rows items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-rows items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                Confirm
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Sign up"}
            </Button>
          </DialogFooter>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button
            variant={"link"}
            className="p-0 h-auto cursor-pointer text-foreground"
            onClick={() => setOpen(false)}
          >
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
