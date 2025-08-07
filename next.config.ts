import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Handle subdomain routing for links.thebubblehead.xyz
        {
          source: "/",
          destination: "/links",
          has: [
            {
              type: "host",
              value: "links.bubbleheads.xyz",
            },
          ],
        },
      ],
    };
  },
};

export default nextConfig;
