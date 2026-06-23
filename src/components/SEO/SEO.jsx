import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, image, schema }) => {
  const siteUrl = 'https://abhishicommarceclasses.in';
  const defaultTitle = 'Abhishi Commerce Classes - Best Commerce Coaching in Bhagalpur';
  const defaultDescription = 'Expert guidance for Class 11th, 12th, CA Foundation & B.Com. Unlock your true potential with Bhagalpur\'s top commerce classes.';
  const defaultImage = `${siteUrl}/logo.png`;
  const defaultUrl = siteUrl;

  const seoTitle = title ? `${title} | Abhishi Commerce Classes` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${siteUrl}${url}` : defaultUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />

      {/* Dynamic Canonical URL */}
      <link rel="canonical" href={seoUrl} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
