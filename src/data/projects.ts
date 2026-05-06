import { Project } from "../types/project";

export const projects: Project[] = [
  {
    title: "Vault — Web3 Transaction Hub",
    description:
      "Next.js dashboard for simulating, sending, and analysing blockchain transactions. Features MetaMask wallet connection, real-time asset transfer tracking, token balances, net worth calculations, and transaction composition with live calldata decoding. ERC-20/ERC-721 function recognition, risk flagging, and decoded revert reasons powered by Alchemy.",
    screenshots: [
      "/images/Vault-screen1.png",
      "/images/Vault-screen2.png",
      "/images/Vault-screen3.png",
    ],
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Wagmi v2",
      "RainbowKit",
      "viem",
      "Alchemy API",
      "ethers v6",
      "Recharts",
      "TanStack Query",
      "Tailwind CSS",
    ],
    category: "web3",
    github: "https://github.com/AnishChandak18/Vault-Crypto-Dashboard",
    demo: "https://vault-crypto-dashboard.vercel.app",
  },
  {
    title: "Stadium Pulse",
    description:
      "Full-stack social prediction app for IPL fans — private circles, match-winner polls, and per-group leaderboards. Built with Next.js App Router, Prisma, and PostgreSQL. Supabase handles auth, SSR sessions, and Row Level Security. Third-party REST integration supplies live fixture data.",
    screenshots: [
      "/images/Stadium-pulse-screen1.png",
      "/images/Stadium-pulse-screen2.png",
      "/images/Stadium-pulse-screen3.png",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "REST APIs",
    ],
    category: "frontend",
    github: "https://github.com/AnishChandak18/Polling-Tournament-Creator",
    demo: "https://stadium-pulse-app.vercel.app/",
  },
];
