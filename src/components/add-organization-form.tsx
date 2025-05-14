"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganizationList } from "@clerk/nextjs";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { organizationSchema } from "@/app/schemas/new-organization";

type AddOrganizationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Organization = {
  name: string;
};

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function AddOrganizationForm({
  open,
  onOpenChange,
}: AddOrganizationProps) {
  const { isLoaded, createOrganization, setActive } = useOrganizationList();

  const form = useForm<Organization>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: Organization) {
    if (!createOrganization || !isLoaded) return;

    try {
      const slug = generateSlug(data.name);
      const res = await createOrganization({
        name: data.name,
        slug,
      });

      await setActive({ organization: res });
      // closing modal
      handleClose();

      setTimeout(() => {
        window.location.href = `/organization/${slug}`;
      }, 1200);
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
    }
  }

  function handleClose() {
    onOpenChange(false);
  }
  // TODO: handle loading
  if (!isLoaded) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Organization</DialogTitle>
          <DialogDescription hidden>Add a New Organization</DialogDescription>
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
                      placeholder="e.g., Backend Devs"
                      className="font-mono"
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
      </DialogContent>
    </Dialog>
  );
}
