import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  agentRules: false,
  async headers() {
    return [
      {
        // Opened directly, the PDF still shows in the browser, but saving it keeps this name.
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'inline; filename="Doug-Rocha-Resume.pdf"',
          },
        ],
      },
    ]
  },
}

export default nextConfig
