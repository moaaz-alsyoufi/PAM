import PageMetaData from "@/components/PageMetaData";
import React from "react";

const AIPage: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PageMetaData title={"Ai"} />
      <iframe
        src="https://dbai.karamentreprises.com"
        style={{
          width: "100%",
          height: "calc(100vh - 115px)",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
        title="AI Dashboard"
        allowFullScreen
      />
    </div>
  );
};

export default AIPage;
