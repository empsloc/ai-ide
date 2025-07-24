import { ActionContext } from "@/context/ActionContext";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

function SandpackPreviewClient() {
  const previewRef = useRef<any>(null);
  const { action, setAction } = useContext(ActionContext);
  const { sandpack } = useSandpack();
  useEffect(() => {
    GetSandpackClient();
  }, [sandpack && action]);
  const GetSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log(client);
      const result = await client.getCodeSandboxURL();
      console.log(result);
      if (action?.actionType == "deploy") {
        window?.open("https://" + result?.sandboxId + ".csb.app/");
      } else if (action?.actionType == "export") {
        window?.open(result?.editorUrl);
      }
    }
  };
  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: "80vh" }}
      showNavigator={true}
    />
  );
}

export default SandpackPreviewClient;
