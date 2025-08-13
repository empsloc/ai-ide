
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import React, { useEffect } from "react";
import { toast } from "sonner";

function Workspace() {
  
  return (
    <div className="p-3 pr-5 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10  bg--500">
        <ChatView />
        <div className="col-span-2 bg--600">
          <CodeView /> 
        </div>
      </div>
    </div>
  );
}

export default Workspace;
