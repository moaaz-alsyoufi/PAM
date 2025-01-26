import React, { useEffect, useState } from "react";
import PageMetaData from "@/components/PageMetaData";

const AIPage: React.FC = () => {
  const [streamlitUrl, setStreamlitUrl] = useState("");

  useEffect(() => {
    // Retrieve the token from localStorage (client-side only)
    const token = localStorage.getItem("authToken") || "";
    // Build the final Streamlit URL
    const finalUrl = `https://dbai2.karamentreprises.com/?token=${encodeURIComponent(token)}`;

    setStreamlitUrl(finalUrl);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PageMetaData title={"Ai"} />
      {streamlitUrl ? (
        <iframe
          src={streamlitUrl}
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
      ) : (
        <p>Loading AI Dashboard...</p>
      )}
    </div>
  );
};

export default AIPage;