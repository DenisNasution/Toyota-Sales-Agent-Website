// import React from "react";
import { Helmet } from "react-helmet-async";

interface props {
  title: string;
  description: string;
  name: string;
  type: string;
  link: string;
  keyword: string;
}
export default function SEO({
  title,
  description,
  name,
  type,
  link,
  keyword,
}: props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keyword} />
      <link rel='canonical' href={link} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta
        property='og:image'
        content='https://toyotakotamedan.com/assets/banner.png'
        data-react-helmet='true'
      />
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
}

// export default SEO;
