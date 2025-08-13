"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export function InfoAlert() {
  const [open, setOpen] = React.useState(false);
  const path = usePathname();

  React.useEffect(() => {
    if (path?.includes("workspace") && !sessionStorage.getItem("workspaceInfoShown")) {
      setOpen(true);
      sessionStorage.setItem("workspaceInfoShown", "true");
    }
  }, [path]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
          <Info size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>How to use</AlertDialogTitle>
          <AlertDialogDescription>
            Click on <strong>Code</strong> to view the generated code and click on <strong>Preview</strong> to see the in-browser output.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="cursor-pointer">Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
