"use client";

// components/PromotionalBanner.jsx
// This component displays promotional banners that are active and within their date range
// It automatically switches between desktop and mobile versions based on screen size
// Uses Mantine Carousel for smooth transitions between multiple banners
import React, { useState, useRef } from "react";
import Link from "next/link";
import { Image, AspectRatio } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import styles from "../styles/PromotionalBanner.module.css";

const PromotionalBanner = ({ data }) => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  // Use Mantine's useMediaQuery to detect mobile devices
  const isMobile = useMediaQuery("(max-width: 768px)");

  // If no active banners or still loading, render nothing or a placeholder
  if (data.length === 0) {
    return null;
  }

  // If only one banner, render it without carousel
  if (data.length === 1) {
    const banner = data[0];
    const imageUrl = isMobile
      ? banner.mobile_image_url
      : banner.desktop_image_url;

    const BannerContent = () => (
      <AspectRatio ratio={isMobile ? 4 / 5 : 16 / 9}>
        <Image
          src={imageUrl}
          alt={banner.title}
          fit="cover"
          w="100%"
          style={{ cursor: banner.link_url ? "pointer" : "default" }}
        />
      </AspectRatio>
    );

    // Wrap in Link if we have a URL
    if (banner.link_url) {
      return (
        <Link
          href={banner.link_url}
          passHref
          style={{ textDecoration: "none" }}
        >
          <BannerContent />
        </Link>
      );
    }

    return <BannerContent />;
  }

  // For multiple banners, use carousel
  return (
    <Carousel
      loop
      withIndicators
      withControls={data.length > 1}
      emblaOptions={{
        loop: true,
        dragFree: true,
        align: "center",
      }}
      slideGap={32}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
      style={{ maxWidth: 960, borderRadius: 32 }}
      className={styles.carousel}
      classNames={{
        indicator: styles.indicator,
      }}
    >
      {data.map((banner) => {
        const imageUrl = isMobile
          ? banner.mobile_image_url
          : banner.desktop_image_url;

        const slideContent = (
          <AspectRatio
            ratio={isMobile ? 4 / 5 : 16 / 9}
            style={{ borderRadius: 32 }}
          >
            <Image
              src={imageUrl}
              alt={banner.title}
              fit="cover"
              w="100%"
              h="100%"
              style={{ borderRadius: 32 }}
            />
          </AspectRatio>
        );

        return (
          <Carousel.Slide key={banner.id} style={{ borderRadius: 32 }}>
            {banner.link_url ? (
              <Link
                href={banner.link_url}
                passHref
                style={{ textDecoration: "none" }}
              >
                {slideContent}
              </Link>
            ) : (
              <React.Fragment key={banner.id}>{slideContent}</React.Fragment>
            )}
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default PromotionalBanner;
