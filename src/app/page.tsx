"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedHelmet, setSelectedHelmet] = useState<string>("helmet.png");

  const helmetOptions = [
    { id: "helmet.png", name: "Neon", preview: "/helmet.png" },
    { id: "helmet3.png", name: "Ocean", preview: "/helmet3.png" },
    { id: "helmet4.png", name: "Dark Neon", preview: "/helmet4.png" },
    {
      id: "helmet2.png",
      name: "JUP",
      preview: "/helmet2.png",
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
      setGeneratedImage(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("helmet", selectedHelmet);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate image");
      }

      setGeneratedImage(result.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = `bubbleheads-helmet-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImagePress = () => {
    if (!generatedImage) return;

    // For mobile devices, try to trigger download
    if (
      navigator.userAgent.match(
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      )
    ) {
      // Create a temporary canvas to convert base64 to blob
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new window.Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            // Try to use the Web Share API if available (mobile browsers)
            if (
              navigator.share &&
              navigator.canShare &&
              navigator.canShare({
                files: [
                  new File([blob], "bubblehead-avatar.png", {
                    type: "image/png",
                  }),
                ],
              })
            ) {
              const file = new File(
                [blob],
                `bubbleheads-helmet-${Date.now()}.png`,
                { type: "image/png" }
              );
              navigator
                .share({
                  files: [file],
                  title: "My Bubblehead Avatar",
                  text: "Check out my new Bubblehead avatar!",
                })
                .catch(() => {
                  // Fallback to download if share fails
                  downloadImage();
                });
            } else {
              // Fallback to regular download
              downloadImage();
            }
          }
        }, "image/png");
      };

      img.src = `data:image/png;base64,${generatedImage}`;
    } else {
      // Desktop - just download
      downloadImage();
    }
  };

  return (
    <>
      {/* Full-page loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-slate-800"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin"></div>
            </div>

            <h3 className="text-xl font-semibold text-slate-100 mb-4">
              Generating Your Bubblehead Avatar
            </h3>

            <p className="text-slate-300 mb-2">
              Please wait, generating image can take like 3 - 5 minutes to
              finish
            </p>

            <p className="text-sm text-slate-400">
              AI is combining your photo with the space helmet design...
            </p>

            <div className="mt-6 flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        {/* Header */}
        <header className="px-4 py-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="The Bubbleheads Logo"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                The Bubbleheads
              </h1>
            </div>
          </div>
        </header>

        <div className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Transform your profile picture to become a Bubblehead!
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-8">
              {/* Social Links */}
              <div className="pb-8 mb-8 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-slate-200 mb-6 text-center">
                  Find The Bubbleheads on...
                </h3>
                <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap">
                  {/* Link 1: DYORhub */}
                  <a
                    href="https://dyorhub.xyz/tokens/3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 rounded-xl p-4 w-20 h-20 flex items-center justify-center transition-colors"
                    aria-label="DYORhub"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="#E2E8F0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22V2Z" />
                    </svg>
                  </a>
                  {/* Link 2: Axiom */}
                  <a
                    href="https://axiom.trade/t/3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 rounded-xl p-4 w-20 h-20 flex items-center justify-center transition-colors"
                    aria-label="Axiom"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="#E2E8F0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 4L6 12H18L12 4Z M4 18L6 14H18L20 18H4Z" />
                    </svg>
                  </a>
                  {/* Link 3: gmgn.ai */}
                  <a
                    href="https://gmgn.ai/sol/token/eKMpq0u9_3G1yVFfKzZxsvTnAnJMQzZBtyTpfWUTY6G7685nRjups"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 rounded-xl p-4 w-20 h-20 flex items-center justify-center transition-colors"
                    aria-label="gmgn.ai"
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ imageRendering: "pixelated" }}
                    >
                      <rect x="5" y="4" width="1" height="1" fill="#4ade80" />
                      <rect x="10" y="4" width="1" height="1" fill="#4ade80" />
                      <rect x="4" y="5" width="1" height="1" fill="#4ade80" />
                      <rect x="5" y="5" width="6" height="1" fill="#86efac" />
                      <rect x="11" y="5" width="1" height="1" fill="#4ade80" />
                      <rect x="3" y="6" width="1" height="1" fill="#4ade80" />
                      <rect x="4" y="6" width="8" height="1" fill="#86efac" />
                      <rect x="12" y="6" width="1" height="1" fill="#4ade80" />
                      <rect x="2" y="7" width="1" height="1" fill="#4ade80" />
                      <rect x="3" y="7" width="1" height="1" fill="#86efac" />
                      <rect x="4" y="7" width="1" height="1" fill="#4ade80" />
                      <rect x="5" y="7" width="6" height="1" fill="#86efac" />
                      <rect x="11" y="7" width="1" height="1" fill="#4ade80" />
                      <rect x="1" y="8" width="1" height="1" fill="#4ade80" />
                      <rect x="2" y="8" width="1" height="1" fill="#86efac" />
                      <rect x="3" y="8" width="1" height="1" fill="#4ade80" />
                      <rect x="4" y="8" width="7" height="1" fill="#86efac" />
                      <rect x="11" y="8" width="1" height="1" fill="#4ade80" />
                      <rect x="4" y="9" width="1" height="1" fill="#f97316" />
                      <rect x="5" y="9" width="5" height="1" fill="#fdba74" />
                      <rect x="10" y="9" width="1" height="1" fill="#f97316" />
                      <rect x="5" y="10" width="1" height="1" fill="#f97316" />
                      <rect x="6" y="10" width="3" height="1" fill="#fdba74" />
                      <rect x="9" y="10" width="1" height="1" fill="#f97316" />
                    </svg>
                  </a>
                  {/* Link 4: DexScreener */}
                  <a
                    href="https://dexscreener.com/solana/dufuudxe8eh663dfwx16n8lufcanyeseqwgvodoshzxc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 rounded-xl p-4 w-20 h-20 flex items-center justify-center transition-colors"
                    aria-label="DexScreener"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="#E2E8F0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 8.5L9.0625 12.375H14.9375L12 8.5ZM7.5 9.375C6.80964 9.375 6.25 9.93464 6.25 10.625C6.25 11.3154 6.80964 11.875 7.5 11.875C8.19036 11.875 8.75 11.3154 8.75 10.625C8.75 9.93464 8.19036 9.375 7.5 9.375ZM16.5 9.375C15.8096 9.375 15.25 9.93464 15.25 10.625C15.25 11.3154 15.8096 11.875 16.5 11.875C17.1904 11.875 17.75 11.3154 17.75 10.625C17.75 9.93464 17.1904 9.375 16.5 9.375ZM4.375 20L7.5 16.25L9.375 18.75L12 15.625L14.625 18.75L16.5 16.25L19.625 20H4.375Z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-slate-100">
                    Upload Your Photo
                  </h2>

                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors bg-slate-900/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`cursor-pointer flex flex-col items-center space-y-4 ${
                        isLoading ? "pointer-events-none opacity-50" : ""
                      }`}
                    >
                      {previewUrl ? (
                        <div className="relative w-48 h-48">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            className="object-cover rounded-lg border-2 border-emerald-400/30"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-lg font-medium text-slate-200">
                              Click to upload your photo
                            </p>
                            <p className="text-sm text-slate-400">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!selectedFile || isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
                  >
                    Generate Bubblehead Profile
                  </button>

                  {error && (
                    <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-slate-100">
                    Generated Result
                  </h2>

                  <div className="border-2 border-slate-600 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center bg-slate-900/50">
                    {generatedImage ? (
                      <div className="space-y-4">
                        <div
                          className="relative w-64 h-64 mx-auto cursor-pointer group"
                          onClick={handleImagePress}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleImagePress();
                            }
                          }}
                          aria-label="Tap to save image"
                        >
                          <Image
                            src={`data:image/png;base64,${generatedImage}`}
                            alt="Generated profile"
                            fill
                            className="object-cover rounded-lg border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/25 group-hover:border-emerald-400 transition-all duration-200"
                          />
                          {/* Mobile tap indicator */}
                          <div className="md:hidden absolute inset-0 bg-black/20 rounded-lg opacity-0 group-active:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Tap to Save
                            </div>
                          </div>
                          {/* Desktop hover indicator */}
                          <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-200 items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Click to Save
                            </div>
                          </div>
                        </div>

                        {/* Mobile hint text */}
                        <p className="text-xs text-slate-400 md:hidden">
                          Tap the image above to save
                        </p>

                        <button
                          onClick={downloadImage}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-2 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Download Bubblehead Avatar
                        </button>
                      </div>
                    ) : (
                      <div className="text-slate-400">
                        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p>Your Bubblehead avatar will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Helmet Selection Carousel */}
              <div className="mt-12 pt-8 border-t border-slate-700">
                <h3 className="text-lg font-semibold text-slate-200 mb-6 text-center">
                  Choose Your Helmet Design:
                </h3>

                {/* Helmet Carousel */}
                <div className="relative">
                  <div className="flex justify-center">
                    <div className="flex gap-6 overflow-x-auto pb-4 px-4 pt-3 scrollbar-thin min-w-0 max-w-[354px] md:max-w-[454px]">
                      {helmetOptions.map((helmet) => (
                        <div
                          key={helmet.id}
                          className={`flex-shrink-0 relative cursor-pointer transition-all duration-200 ${
                            selectedHelmet === helmet.id
                              ? "scale-105"
                              : "hover:scale-102"
                          }`}
                          onClick={() => setSelectedHelmet(helmet.id)}
                        >
                          <div
                            className={`relative w-24 h-24 md:w-32 md:h-32 p-3 md:p-4 rounded-xl border-2 transition-all duration-200 ${
                              selectedHelmet === helmet.id
                                ? "border-emerald-400 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 shadow-lg shadow-emerald-500/25"
                                : "border-slate-600 bg-gradient-to-br from-slate-800 to-slate-700 hover:border-slate-500"
                            }`}
                          >
                            <Image
                              src={helmet.preview}
                              alt={helmet.name}
                              fill
                              className="object-contain p-1"
                            />

                            {/* Selected indicator */}
                            {selectedHelmet === helmet.id && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center z-10 shadow-lg">
                                <svg
                                  className="w-4 h-4 text-slate-900"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Helmet name */}
                          <p
                            className={`text-center text-xs mt-2 px-1 transition-colors duration-200 ${
                              selectedHelmet === helmet.id
                                ? "text-emerald-300 font-medium"
                                : "text-slate-400"
                            }`}
                          >
                            {helmet.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll indicator */}
                  <div className="flex justify-center mt-2">
                    <p className="text-slate-500 text-xs">
                      ← Swipe to see more helmets →
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-slate-400 text-sm">
              Powered by{" "}
              <a
                href="https://x.com/TheBubble_Heads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors underline decoration-emerald-400/30 hover:decoration-emerald-300/50"
              >
                The Bubbleheads
              </a>{" "}
              • Join The Bubbleheads cult Today!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
