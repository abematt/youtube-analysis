import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";``

import * as React from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";

function TopComments({ comment }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible 
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-80 h-96 overflow-hidden"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          Top Youtube Comments
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {Array.isArray(comment) &&
      comment.map((commentObject,index)=> commentObject.language !== "en" && (
        <Popover key={index+1}>
        <PopoverTrigger>
        <CollapsibleContent key={index+1} asChild>
          <div className="rounded-md border px-4 py-3 font-mono text-xs">
            {commentObject.translatedText}
          </div>
        </CollapsibleContent>
        <PopoverContent className="w-80">
            {commentObject.text}
            </PopoverContent>
        </PopoverTrigger>
        </Popover>
        )
      )}
    </Collapsible>
  );
}

export default TopComments;
