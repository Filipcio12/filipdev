"use client";

import React, { useRef, useEffect } from "react";

const RecursiveTree = () => {
  const canvasRef = useRef(null);
  const angle = 90; // Angle for branching
  const length = 100; // Initial length of the tree branches

  const drawBranch = (ctx, startX, startY, angle, length) => {
    if (length < 2) return; // Stop recursion if the branch is too short

    // Calculate the end point of the branch
    const endX = startX + length * Math.cos((angle * Math.PI) / 180);
    const endY = startY - length * Math.sin((angle * Math.PI) / 180);

    // Draw the branch
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Recursively draw the left and right branches
    drawBranch(ctx, endX, endY, angle - 15, length * 0.7); // Left branch
    drawBranch(ctx, endX, endY, angle + 15, length * 0.7); // Right branch
  };

  const drawTree = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.strokeStyle = "green"; // Set branch color
    ctx.lineWidth = 2; // Set branch width

    // Start drawing the tree from the bottom center of the canvas
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height);
    drawBranch(ctx, 0, 0, angle, length);
    ctx.restore();
  };

  useEffect(() => {
    drawTree(); // Draw the tree when the component mounts
  }, []);

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
