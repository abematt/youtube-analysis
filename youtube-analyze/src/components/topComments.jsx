import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as React from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";

function TopComments({ comment }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:w-6/12 lg:mt-4">
      {/*<div className="grid grid-cols-3 w-7/12 mt-4"> */}
      {Array.isArray(comment) &&
        comment.map((commentObject, index) => (
          <Card
            className="flex flex-col w-1/2 justify-between m-1 border-2 border-slate-500 lg:w-1/4"
            key={index + 1}
          >
            <CardContent className="m-5 p-1/12">
              {/* <CardTitle className="text-s m-2">
                {index+1}
                </CardTitle> */}
              <CardDescription className="text-xs h-20 overflow-auto">
                {commentObject.translatedText ? commentObject.translatedText : commentObject.text}
              </CardDescription>
              <CardFooter className="flex justify-center gap-1 text-xs pb-1 mt-3">
                <Badge
                  className="w-auto cursor-default"
                  style={{ backgroundColor: "#fcd34d", color: "black" }}
                >
                  {commentObject.likes} Likes
                </Badge>
                <HoverCard>
                  <HoverCardTrigger>
                    <Badge
                      className="w-auto cursor-pointer"
                      style={{ backgroundColor: "#84cc16", color: "black" }}
                    >
                      {commentObject.translatedText ? 'Translated' : 'Original'}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-stone-950 text-white">
                    {commentObject.text}
                  </HoverCardContent>
                </HoverCard>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
    </div>

    // <Collapsible
    //   open={isOpen}
    //   onOpenChange={setIsOpen}
    //   className="w-80 h-96 overflow-hidden"
    // >
    //   <div className="flex items-center justify-between space-x-4 px-4">
    //     <h4 className="text-sm font-semibold">
    //       Top Youtube Comments
    //     </h4>
    //     <CollapsibleTrigger asChild>
    //       <Button variant="ghost" size="sm" className="w-9 p-0">
    //         <ChevronsUpDown className="h-4 w-4" />
    //         <span className="sr-only">Toggle</span>
    //       </Button>
    //     </CollapsibleTrigger>
    //   </div>
    //   {Array.isArray(comment) &&
    //   comment.map((commentObject,index)=> commentObject.language !== "en" && (
    //     <Popover key={index+1}>
    //     <PopoverTrigger>
    //     <CollapsibleContent key={index+1} asChild>
    //       <div className="rounded-md border px-4 py-3 font-mono text-xs">
    //         {commentObject.translatedText}
    //       </div>
    //     </CollapsibleContent>
    //     <PopoverContent className="w-80">
    //         {commentObject.text}
    //         </PopoverContent>
    //     </PopoverTrigger>
    //     </Popover>
    //     )
    //   )}
    // </Collapsible>
  );
}

export default TopComments;
