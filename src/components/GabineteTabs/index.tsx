"use client";

import ButtonSwitch from "@/components/ButtonSwitch";
import { SetStateAction, useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { IPost, getPost } from "@/lib/getPost";

const ShowPost = dynamic(() => import("@/components/GabineteTabs/ShowPost"));

const GabineteTabs = () => {
  const [activeTab, setActiveTab] = useState<"legislacao" | "comissoes">(
    "legislacao",
  );

  const [postLegislacao, setPostLegislacao] = useState<IPost>();
  const [postComissoes, setPostComissoes] = useState<IPost>();

  const fetchPost = useCallback(async () => {
    try {
      if (!postLegislacao || !postComissoes) {
        const [fetchedPostLegislacao, fetchedPostComissoes] = await Promise.all(
          [getPost("gabinete-legislacao"), getPost("gabinete-comissoes")],
        );

        setPostLegislacao(fetchedPostLegislacao);
        setPostComissoes(fetchedPostComissoes);
      }
    } catch (error) {
      console.log(error);
    }
  }, [postComissoes, postLegislacao]);

  useEffect(() => {
    fetchPost();
  }, [activeTab, fetchPost]);

  const handleButtonClick = (
    tab: SetStateAction<"legislacao" | "comissoes">,
  ) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-96 w-full">
      <div className="mb-16 grid min-h-20 grid-cols-2">
        <div
          className={`hover:bg-calpolygreen-800 ${
            activeTab === "legislacao"
              ? "bg-calpolygreen-800"
              : "bg-calpolygreen-900"
          }`}
        >
          <ButtonSwitch
            label={"Legislação"}
            onClick={() => handleButtonClick("legislacao")}
            className="border-r border-r-calpolygreen-700 border-opacity-50 max-sm:p-4"
          />
        </div>
        <div
          className={`hover:bg-calpolygreen-800 ${
            activeTab === "comissoes"
              ? "bg-calpolygreen-800"
              : "bg-calpolygreen-900"
          }`}
        >
          <ButtonSwitch
            label={"Comissões"}
            onClick={() => handleButtonClick("comissoes")}
            className="border-l border-l-calpolygreen-700 border-opacity-50 max-sm:p-4"
          />
        </div>
      </div>
      <div className="mx-auto mb-16 max-w-screen-xl duration-1000 animate-in fade-in">
        {activeTab === "legislacao" && (
          <>{postLegislacao ? <ShowPost post={postLegislacao} /> : null}</>
        )}
        {activeTab === "comissoes" && (
          <>{postComissoes ? <ShowPost post={postComissoes} /> : null}</>
        )}
      </div>
    </div>
  );
};

export default GabineteTabs;
