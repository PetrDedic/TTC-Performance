// components/PromotionalBanner.jsx
// This component displays promotional banners that are active and within their date range
// It automatically switches between desktop and mobile versions based on screen size
// Uses Mantine Carousel for smooth transitions between multiple banners
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import { Box, Image, AspectRatio, Center, Skeleton } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import "@mantine/carousel/styles.css";

const PromotionalBanner = () => {
  const [activeBanners, setActiveBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const autoplay = useRef(Autoplay({ delay: 7000 }));
  // Use Mantine's useMediaQuery to detect mobile devices
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchActiveBanners();
  }, []);

  // Fetch active banners from the database
  const fetchActiveBanners = async () => {
    setLoading(true);
    const now = new Date().toISOString();

    // Fetch banners that:
    // 1. Are marked as active
    // 2. Either have no start date or have a start date in the past
    // 3. Either have no end date or have an end date in the future
    const { data, error } = await supabase
      .from("promotional_banners")
      .select("*")
      .eq("is_active", true)
      .or(`start_date.is.null,start_date.lte.${now}`)
      .or(`end_date.is.null,end_date.gte.${now}`)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching promotional banners:", error);
    } else {
      setActiveBanners(data || []);
    }

    setLoading(false);
  };

  // If no active banners or still loading, render nothing or a placeholder
  if (loading) {
    return <Skeleton height={isMobile ? 300 : 200} radius={0} animate={true} />;
  }

  if (activeBanners.length === 0) {
    return null;
  }

  // If only one banner, render it without carousel
  if (activeBanners.length === 1) {
    const banner = activeBanners[0];
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
      withControls={activeBanners.length > 1}
      plugins={[autoplay.current]}
      style={{ maxWidth: 960 }}
    >
      {activeBanners.map((banner) => {
        const imageUrl = isMobile
          ? banner.mobile_image_url
          : banner.desktop_image_url;

        const slideContent = (
          <AspectRatio ratio={isMobile ? 4 / 5 : 16 / 9}>
            <Image
              src={imageUrl}
              alt={banner.title}
              fit="cover"
              w="100%"
              h="100%"
            />
          </AspectRatio>
        );

        return (
          <Carousel.Slide key={banner.id}>
            {banner.link_url ? (
              <Link
                href={banner.link_url}
                passHref
                style={{ textDecoration: "none" }}
              >
                {slideContent}
              </Link>
            ) : (
              slideContent
            )}
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default PromotionalBanner;
