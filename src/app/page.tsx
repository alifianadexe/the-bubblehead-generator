"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          <div className="max-w-4xl mx-auto flex items-center justify-center space-x-4">
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
        </header>

        <div className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Transform your profile picture to become a Bubblehead!
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-8">
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
                        <div className="relative w-64 h-64 mx-auto">
                          <Image
                            src={`data:image/png;base64,${generatedImage}`}
                            alt="Generated profile"
                            fill
                            className="object-cover rounded-lg border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/25"
                          />
                        </div>
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p>Your Bubblehead avatar will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Helmet Preview */}
              <div className="mt-12 pt-8 border-t border-slate-700">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">
                  We&apos;ll combine your photo with this space helmet design:
                </h3>
                <div className="flex justify-center">
                  <div className="relative w-32 h-32 p-4 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-600">
                    <Image
                      src="/helmet.png"
                      alt="Space helmet design"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>
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
                • Join The Bubbleheads cult Today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
