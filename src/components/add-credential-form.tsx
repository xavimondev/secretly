"use client";

import type React from "react";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Copy, Eye, EyeOff, HelpCircle, Key } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddCredentialFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  environment?: string;
}

export function AddCredentialForm({
  open,
  onOpenChange,
  environment,
}: AddCredentialFormProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("api-key");
  const [selectedEnvironment, setSelectedEnvironment] = useState(
    environment || "production"
  );
  const [autoRotate, setAutoRotate] = useState(false);
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [showValue, setShowValue] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [maskedValue, setMaskedValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a masked value for display
    setMaskedValue(
      `${value.substring(0, 4)}${"*".repeat(
        Math.max(0, value.length - 8)
      )}${value.substring(value.length - 4)}`
    );
    setIsSubmitted(true);

    // toast({
    //   title: "Credential created",
    //   description: "Your new credential has been created successfully.",
    // });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    // toast({
    //   title: "Copied to clipboard",
    //   description: "The credential value has been copied to your clipboard.",
    // })
  };

  const resetForm = () => {
    setName("");
    setValue("");
    setType("api-key");
    setSelectedEnvironment(environment || "production");
    setAutoRotate(false);
    setDate(undefined);
    setNotes("");
    setShowValue(false);
    setIsSubmitted(false);
    setMaskedValue("");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

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

        {isSubmitted ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Credential Name</Label>
              <div className="font-mono p-2 bg-secondary rounded-md">
                {name}
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
                {showValue ? value : maskedValue}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="p-2 bg-secondary rounded-md">
                  {type === "api-key" && "API Key"}
                  {type === "token" && "Token"}
                  {type === "db-string" && "Database String"}
                  {type === "password" && "Password"}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Environment</Label>
                <div className="p-2 bg-secondary rounded-md">
                  {selectedEnvironment === "production" && "Production"}
                  {selectedEnvironment === "staging" && "Staging"}
                  {selectedEnvironment === "development" && "Development"}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-amber-500" />
                <span className="text-sm text-amber-500">
                  Make sure to copy your credential now. The full value won't be
                  visible again.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., API_KEY_PRODUCTION"
                  className="font-mono"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="value">Value</Label>
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
                <Input
                  id="value"
                  type={showValue ? "text" : "password"}
                  placeholder="Enter credential value"
                  className="font-mono"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api-key">API Key</SelectItem>
                      <SelectItem value="token">Token</SelectItem>
                      <SelectItem value="db-string">DB String</SelectItem>
                      <SelectItem value="password">Password</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="environment">Environment</Label>
                  <Select
                    value={selectedEnvironment}
                    onValueChange={setSelectedEnvironment}
                  >
                    <SelectTrigger id="environment">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="auto-rotate">Auto-Rotation</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          When enabled, this credential will be automatically
                          rotated based on your project's rotation policy.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch
                  id="auto-rotate"
                  checked={autoRotate}
                  onCheckedChange={setAutoRotate}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="expiration">Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional information about this credential"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Create Credential</Button>
            </DialogFooter>
          </form>
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
