"use client";

import ButtonSwitch from "@/components/ButtonSwitch";
import ServicosAoPublico from "@/components/ServicosAoPublico";
import ServicosAoServidor from "@/components/ServicosAoServidor";

import { useState } from "react";

const HomeTabs = () => {
  const [activeTab, setActiveTab] = useState("servicos-ao-publico");

  const handleButtonClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      <div className="mb-16 grid min-h-20 grid-cols-2">
        <div
          className={`hover:bg-calpolygreen-800 ${
            activeTab == "servicos-ao-publico"
              ? "bg-calpolygreen-800"
              : "bg-calpolygreen-900"
          }`}
        >
          <ButtonSwitch
            label={"Serviços online ao público"}
            onClick={() => handleButtonClick("servicos-ao-publico")}
            className="border-r border-r-calpolygreen-700 border-opacity-50 max-sm:p-4"
          />
        </div>
        <div
          className={`hover:bg-calpolygreen-800 ${
            activeTab == "servicos-ao-servidor"
              ? "bg-calpolygreen-800"
              : "bg-calpolygreen-900"
          }`}
        >
          <ButtonSwitch
            label={"Serviços online ao servidor"}
            onClick={() => handleButtonClick("servicos-ao-servidor")}
            className="border-l border-l-calpolygreen-700 border-opacity-50 max-sm:p-4"
          />
        </div>
      </div>
      <div className="mx-auto mb-16 max-w-screen-xl duration-1000 animate-in fade-in">
        {activeTab === "servicos-ao-publico" && <ServicosAoPublico />}
        {activeTab === "servicos-ao-servidor" && <ServicosAoServidor />}
      </div>
    </div>
  );
};

export default HomeTabs;
