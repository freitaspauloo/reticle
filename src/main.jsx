import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Skeleton from "./Skeleton.jsx";
import Features from "./Features.jsx";
import FeaturesSkeleton from "./FeaturesSkeleton.jsx";
import Insights from "./Insights.jsx";
import InsightsSkeleton from "./InsightsSkeleton.jsx";
import NudgeaiLanding from "./NudgeaiLanding.jsx";

const path = window.location.pathname.replace(/\/$/, "") || "/";
const page =
  path === "/nudgeai"
    ? <NudgeaiLanding />
    : path === "/insights/skeleton"
      ? <InsightsSkeleton />
      : path === "/insights"
        ? <Insights />
        : path === "/features/skeleton"
          ? <FeaturesSkeleton />
          : path === "/features"
            ? <Features />
            : path === "/skeleton"
              ? <Skeleton />
              : <App />;

createRoot(document.getElementById("root")).render(
  <StrictMode>{page}</StrictMode>,
)
