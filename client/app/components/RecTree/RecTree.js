"use client";

import React, { useRef, useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas.js";

const RecursiveTree = () => {
  const canvasRef = useRef(null);
  const angle = 90; // Angle for branching
  const length = 100; // Initial length of the tree branches
  const [branches, setBranches] = useState([]);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);

  const defineBranch = (startX, startY, angle, length) => {
    if (length < 2) return; // Stop recursion if the branch is too short

    // Calculate the end point of the branch
    const endX = startX + length * Math.cos((angle * Math.PI) / 180);
    const endY = startY - length * Math.sin((angle * Math.PI) / 180);

    setBranches((prevBranches) => [
      ...prevBranches,
      { startX, startY, endX, endY },
    ]);

    // Recursively draw the left and right branches
    defineBranch(endX, endY, angle - 15, length * 0.7); // Left branch
    defineBranch(endX, endY, angle + 15, length * 0.7); // Right branch
  };

  const drawBranch = (ctx, branch) => {
    const { startX, startY, endX, endY } = branch;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "green";
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
      setCurrentBranchIndex((prevIndex) => (prevIndex + 1) % branches.length);
    }, 140);

    return () => clearInterval(intervalId);
  }, [branches.length]);

  useEffect(() => {
    draw();
  }, [currentBranchIndex]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{ border: "1px solid black" }}
    />
  );
};

export default RecursiveTree;
