"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocossdload } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "../utils/render-Predictions";

let detectInterval;

function ObjectDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const webCamRef = useRef(null);
  const canvsRef = useRef(null);

  async function runObjectDetection(net) {
    if (
      canvsRef.current &&
      webCamRef.current !== null &&
      webCamRef.current.video?.readyState === 4
    ) {
      canvsRef.current.width = webCamRef.current.video.videoWidth;
      canvsRef.current.height = webCamRef.current.video.videoHeight;

      //find all detected objects
      const detectedObject = await net.detect(
        webCamRef.current.video,
        undefined,
        0.6
      );
      const context = canvsRef.current.getContext("2d");
      renderPredictions(detectedObject, context);
    }
  }

  const cocoRun = async () => {
    setIsLoading(true);
    const net = await cocossdload();
    setIsLoading(false);
    detectInterval = setInterval(() => {
      runObjectDetection(net);
      //   console.log("msk");
    }, 100);
  };

  const showMyVideo = () => {
    if (
      webCamRef.current !== null &&
      webCamRef.current.video?.readState === 4
    ) {
      const myVideoWidth = webCamRef.current.video.videoWidth;
      const myVideoHeight = webCamRef.current.video.videoHeight;
      webCamRef.current.video.width = myVideoWidth;
      webCamRef.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    cocoRun();
    showMyVideo();
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient">Loading...</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md ">
          {/* webcam */}
          <Webcam
            ref={webCamRef}
            className="rounded-md w-full lg:h-[720px]"
            muted
          />
          {/* Canvas */}
          <canvas
            ref={canvsRef}
            className="absolute top-0 left-0 z-999999 w-fulllg:h-[720px]"
          />
        </div>
      )}
    </div>
  );
}

export default ObjectDetection;
