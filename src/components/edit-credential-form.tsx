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
import { editCredential } from "@/app/actions/edit-credential";
import { Credential } from "@/types/credentials";
import { credentialTypesList } from "@/credential-type-list";
import {
  EditCredentialResource,
  editCredentialSchema,
} from "@/app/schemas/edit-credential";

type EditCredentialFormProps = {
  credential: EditCredentialResource;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditCredentialForm({
  credential,
  open,
  onOpenChange,
}: EditCredentialFormProps) {
  const { organization } = useOrganization();

  const [showValue, setShowValue] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<EditCredentialResource>({
    resolver: zodResolver(editCredentialSchema),
    defaultValues: {
      id: credential.id,
      name: credential.name,
      credential: "",
      type: credential.type,
      description: credential.description,
    },
  });

  async function onSubmit(data: EditCredentialResource) {
    const credentialDB: Credential = {
      ...data,
    };
    credentialDB.organizationId = organization!.id as string;
    const res = await editCredential(credentialDB);

    if (!res.ok) {
      toast.error(res.errors?.server);
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
          <DialogTitle>Update Credential</DialogTitle>
          <DialogDescription hidden>Update credential.</DialogDescription>
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
                      {credentialTypesList.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
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
                  : "Updating Credential"}
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
