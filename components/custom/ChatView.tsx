"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon, Sidebar } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Prompt from "@/data/Prompt";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { toast } from "sonner";
export const countToken = (inputText: any) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word: any) => word).length;
};
function ChatView() {
  const { id } = useParams<any>();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState<any>();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateTokens = useMutation(api.users.UpdateToken);
  useEffect(() => {
    id && GetWorkspaceData();
    
  }, [id]);
  useEffect(() => {
    
    toggleSidebar();
  }, []);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };
  const GetAIResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    const aiResp = { role: "ai", content: result.data.result };

    setMessages((prev: any) => [...prev, aiResp]);
    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });

    const prevToken = Number(userDetail?.token);
    const usedToken = Number(countToken(JSON.stringify(aiResp)));
    const token = prevToken - usedToken;
    console.log(prevToken);
    console.log(usedToken);
    console.log(token);
    setUserDetail((prev: any) => ({
      ...prev,
      token: token,
    }));
    await UpdateTokens({
      userId: userDetail?._id,
      token: token,
    });

    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GetAIResponse();
      }
    }
  }, [messages]);

  const onGenerate = (input: any) => {
    if (userDetail?.token < 10) {
      toast("You dont have enough token to generate");
      return;
    }
    setMessages((prev: any) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };
  return (
    <div className="relative h-[85vh] flex flex-col">
      {userDetail && (
          // <Image
          //   className=" mt-40 rounded-full cursor-pointer"
          //   src={userDetail?.picture}
          //   alt="user"
          //   width={40}
          //   height={30}
          //   onClick={toggleSidebar}
          // />
          <Sidebar className="cursor-pointer ml-5 mb-5 " onClick={toggleSidebar}/>
        )}
      {<div className="flex-1 overflow-y-scroll no-scrollbar pl-5">

        {messages&&messages.length>0&&messages?.map((msg: any, index: any) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-7"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            {msg?.role == "user" && (
              <Image
                className="rounded-full"
                width={35}
                height={35}
                src={userDetail?.picture}
                alt="userImage"
              />
            )}
            {/* <ReactMarkdown className="flex flex-col">{msg.content}</ReactMarkdown> */}
            <div className="flex flex-col">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response ...</h2>
          </div>
        )}
      </div>}

      {/* input */}
      <div className="flex gap-2 item-end">
        {/* {userDetail && (
          // <Image
          //   className=" mt-40 rounded-full cursor-pointer"
          //   src={userDetail?.picture}
          //   alt="user"
          //   width={40}
          //   height={30}
          //   onClick={toggleSidebar}
          // />
          <Sidebar className="cursor-pointer mt-40 " onClick={toggleSidebar}/>
        )} */}
        <div
          className="p-5 ml-5 border rounded-xl max-w-xl w-full mt-3"
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <div className="flex gap-2">
            <textarea
              value={userInput}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
              placeholder={Lookup.INPUT_PLACEHOLDER}
              onChange={(event) => setUserInput(event.target.value)}
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
              />
            )}
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
