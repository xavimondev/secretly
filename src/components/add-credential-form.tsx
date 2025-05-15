"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { credentialSchema } from "@/app/schemas/new-credential";
import { createCredential } from "@/app/actions/create-credential";
import { Credential } from "@/types/credentials";

interface AddCredentialFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCredentialForm({
  open,
  onOpenChange,
}: AddCredentialFormProps) {
  const { organization } = useOrganization();

  const [showValue, setShowValue] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<Credential>({
    resolver: zodResolver(credentialSchema),
    defaultValues: {
      name: "",
      credential: "",
      type: "",
      description: "",
    },
  });

  async function onSubmit(data: Credential) {
    data.organizationId = organization!.id as string;
    const res = await createCredential(data);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);

    setTimeout(() => {
      handleClose();
    }, 1000);
  }

  function resetForm() {
    form.reset();
    setShowValue(false);
    setIsSubmitted(false);
  }

  function handleClose() {
    resetForm();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Credential</DialogTitle>
          <DialogDescription>
            Add a new credential to your project. All fields are encrypted at
            rest.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., API_KEY_PRODUCTION"
                      className="font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="credential"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Value</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setShowValue(!showValue)}
                    >
                      {showValue ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      type={showValue ? "text" : "password"}
                      placeholder="Enter credential value"
                      className="font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credential type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="api-key">API Key</SelectItem>
                      <SelectItem value="token">Token</SelectItem>
                      <SelectItem value="oauth-token">OAuth Token</SelectItem>
                      <SelectItem value="env-variable">
                        Environment Variable
                      </SelectItem>
                      <SelectItem value="webhook-secret">
                        Webhook Secret
                      </SelectItem>
                      <SelectItem value="client-credentials">
                        Client ID / Client Secret
                      </SelectItem>
                      <SelectItem value="license-key">License Key</SelectItem>
                      <SelectItem value="password">Password</SelectItem>
                      <SelectItem value="db-string">Database String</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional information about this credential"
                      rows={3}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Creating..."
                  : "Create Credential"}
              </Button>
            </DialogFooter>
          </form>
        </Form>

        {isSubmitted && (
          <DialogFooter>
            <Button onClick={handleClose}>Done</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
