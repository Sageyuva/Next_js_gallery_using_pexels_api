"use client";
import React, { useEffect, useState } from "react";
import ImageCard from "./component/ImageCard";
import debounce from "lodash/debounce";
import axios from "axios";

const Page = () => {
  const [collections, setCollections] = useState([]);
  const [searchQ, setSearchQ] = useState("nature");

  const delayedSetSearchQ = debounce((value) => {
    setSearchQ(value);
  }, 500);

  const searchChange = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${searchQ + " "}`,
        {
          headers: {
            Authorization:
              "eIUdV12UnTsLCGGBuHEOaAtgA7R4WMaWgvWOkhkQcy2k0t6RvX1ns4tz", // Replace with your actual API key
          },
        }
      );
      setCollections(response.data.photos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, [searchQ]); // Call the API whenever searchQ changes

  return (
    <>
      <nav className="w-[100%] text-white h-[60px] text-center text-2xl flex items-center justify-center font-bold">
        Sage Gallery
      </nav>
      <div className="w-[100] flex items-center justify-center gap-2 h-[60px]">
        <input
          value={searchQ}
          onChange={(e) => searchChange(e)}
          className="w-[75%] px-[10px] py-[5px] rounded outline-none font-semibold text-xl"
          type="text"
          placeholder="Search for images"
        />
      </div>
      <div className="p-2 w-[100%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 justify-center items-center">
        {collections.map((image) => (
          <ImageCard key={image.id} imgg={image.src.original} />
        ))}
      </div>
    </>
  );
};

export default Page;
