"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Eye, EyeOff, Key } from "lucide-react";

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
  const [showValue, setShowValue] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [maskedValue, setMaskedValue] = useState("");
  const [submittedData, setSubmittedData] = useState<Credential | null>(null);

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
    console.log(data);
    await createCredential(data);
  }

  function copyToClipboard() {
    if (submittedData) {
      navigator.clipboard.writeText(submittedData.credential);
    }
  }

  function resetForm() {
    form.reset();
    setShowValue(false);
    setIsSubmitted(false);
    setMaskedValue("");
    setSubmittedData(null);
  }

  function handleClose() {
    resetForm();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) resetForm();
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {isSubmitted ? "Credential Created" : "Add New Credential"}
          </DialogTitle>
          <DialogDescription>
            {isSubmitted
              ? "Your credential has been created. Make sure to copy the value now as it won't be fully visible again."
              : "Add a new credential to your project. All fields are encrypted at rest."}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted && submittedData ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Credential Name</Label>
              <div className="font-mono p-2 bg-secondary rounded-md">
                {submittedData.name}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Credential Value</Label>
                <div className="flex items-center gap-2">
                  <Button
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="font-mono p-2 bg-secondary rounded-md">
                {showValue ? submittedData.credential : maskedValue}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <div className="p-2 bg-secondary rounded-md">
                {submittedData.type}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-amber-500" />
                <span className="text-sm text-amber-500">
                  {`Make sure to copy your credential now. The full value won't be
                  visible again.`}
                </span>
              </div>
            </div>
          </div>
        ) : (
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
                        <SelectItem value="db-string">
                          Database String
                        </SelectItem>
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
        )}

        {isSubmitted && (
          <DialogFooter>
            <Button onClick={handleClose}>Done</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
