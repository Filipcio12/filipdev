"use client";

import React, { useRef, useEffect, useState } from "react";

const RecursiveTree = () => {
  const canvasRef = useRef(null);
  const angle = 90;
  const length = 80;
  const [branches, setBranches] = useState([]);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(585);

  const defineBranch = (startX, startY, angle, length) => {
    if (length < 2) return;

    const endX = startX + length * Math.cos((angle * Math.PI) / 180);
    const endY = startY - length * Math.sin((angle * Math.PI) / 180);

    setBranches((prevBranches) => [
      ...prevBranches,
      { startX, startY, endX, endY },
    ]);

    defineBranch(endX, endY, angle - 30, length * 0.7);
    defineBranch(endX, endY, angle + 30, length * 0.7);
  };

  const getLength = (startX, startY, endX, endY) => {
    return Math.sqrt(
      (endX - startX) * (endX - startX) + (endY - startY) * (endY - startY),
    );
  };

  const getColorByLength = (length) => {
    if (length > 20) return "#654321";
    return "green";
  };

  const drawBranch = (ctx, branch) => {
    const { startX, startY, endX, endY } = branch;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    const length = getLength(startX, startY, endX, endY);
    ctx.strokeStyle = getColorByLength(length);
    ctx.stroke();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 2;

    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height);

    for (let i = 0; i <= currentBranchIndex && i < branches.length; i++) {
      drawBranch(ctx, branches[i]);
    }

    ctx.restore();
  };

  useEffect(() => {
    defineBranch(0, 0, angle, length);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBranchIndex((prevIndex) => (prevIndex + 20) % branches.length);
    }, 140);

    return () => clearInterval(intervalId);
  }, [branches.length]);

  useEffect(() => {
    draw();
  }, [currentBranchIndex]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth < 768 ? 300 : 585;
      setCanvasWidth(newWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} width={canvasWidth} height={300} />;
};

export default RecursiveTree;
