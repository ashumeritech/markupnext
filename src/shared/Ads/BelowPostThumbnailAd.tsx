import React, { useEffect } from "react";

type GoogleAdProps = {
  slot?: string;
  format?: string;
  responsive?: boolean;
};

const BelowPostThumbnail: React.FC<GoogleAdProps> = ({ slot = "6153030873", format = "auto", responsive = true }) => {
  useEffect(() => {
    // Dynamically load the Google AdSense script
    const script = document.createElement("script");
    script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.onload = () => {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    };
    document.body.appendChild(script);
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "inline-block", width: "728px", height: '90px' }}
      data-ad-client="ca-pub-7917136682488387"
      data-ad-slot={slot}
    // data-ad-format={format}
    // data-full-width-responsive={responsive ? "true" : "false"}
    ></ins>
  );
};

export default BelowPostThumbnail;
