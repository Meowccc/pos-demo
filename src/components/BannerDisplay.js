import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const DATA_URL =
  "https://assets.contentstack.io/v3/assets/bltf59a0f025a7625f9/bltf8af9fa934594ea0/image_mapping.json";
const INTERVAL = 5000; // 每張播放 5 秒

// 🔹 styled-components
const SlideshowWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px; /* 可依需求調整 */
  overflow: hidden;
`;

const SlideImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;

// 🔹 React Component
const BannerDisplay = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 抓取資料
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(DATA_URL);
        const json = await res.json();
        const imageUrls = json.data || [];

        if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
          throw new Error("圖片清單為空或格式錯誤");
        }

        setImages(imageUrls);
      } catch (e) {
        console.error("載入圖片失敗：", e);
      }
    };

    fetchImages();
  }, []);

  // 輪播效果
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [images]);

  if (images.length === 0) {
    return (
      <p style={{ color: "white", textAlign: "center", marginTop: "20%" }}>
        載入圖片失敗，請稍後再試。
      </p>
    );
  }

  return (
    <SlideshowWrapper>
      {images.map((url, idx) => (
        <SlideImage key={idx} src={url} alt={`slide-${idx}`} active={idx === currentIndex} />
      ))}
    </SlideshowWrapper>
  );
};

export default BannerDisplay;