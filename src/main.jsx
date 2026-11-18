import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Skeleton from "./Skeleton.jsx";
import Features from "./Features.jsx";
import FeaturesSkeleton from "./FeaturesSkeleton.jsx";
import Insights from "./Insights.jsx";
import InsightsSkeleton from "./InsightsSkeleton.jsx";
import GrowcodeLanding from "./GrowcodeLanding.jsx";
import GrowcodeSkeleton from "./GrowcodeSkeleton.jsx";
import FinlayerLanding from "./FinlayerLanding.jsx";
import FinlayerSkeleton from "./FinlayerSkeleton.jsx";
import FeaturesSec from "./FeaturesSec.jsx";
import ChainovaLanding from "./ChainovaLanding.jsx";
import ChainovaSkeleton from "./ChainovaSkeleton.jsx";
import FeaturesSecSkeleton from "./FeaturesSecSkeleton.jsx";
import NudgeaiLanding from "./NudgeaiLanding.jsx";
import NudgeaiSkeleton from "./NudgeaiSkeleton.jsx";
import AieigenLanding from "./AieigenLanding.jsx";
import AieigenSkeleton from "./AieigenSkeleton.jsx";
import IncredibleLanding from "./IncredibleLanding.jsx";
import IncredibleSkeleton from "./IncredibleSkeleton.jsx";

const path = window.location.pathname.replace(/\/$/, "") || "/";

const routes = {
  "/": <App />,
  "/orb": <App />,
  "/feature-cards": <Features />,
  "/features": <Features />,
  "/insights": <Insights />,
  "/magenta-landscape": <GrowcodeLanding />,
  "/growcode": <GrowcodeLanding />,
  "/browser-frame": <FinlayerLanding />,
  "/finlayer": <FinlayerLanding />,
  "/feature-rail": <FeaturesSec />,
  "/features-sec": <FeaturesSec />,
  "/blueprint": <ChainovaLanding />,
  "/chainova": <ChainovaLanding />,
  "/spaceman-moon": <NudgeaiLanding />,
  "/nudgeai": <NudgeaiLanding />,
  "/light-rays": <AieigenLanding />,
  "/aieigen": <AieigenLanding />,
  "/prompt-bar": <IncredibleLanding />,
  "/incredible": <IncredibleLanding />,
  "/skeleton": <Skeleton />,
  "/feature-cards/skeleton": <FeaturesSkeleton />,
  "/features/skeleton": <FeaturesSkeleton />,
  "/insights/skeleton": <InsightsSkeleton />,
  "/magenta-landscape/skeleton": <GrowcodeSkeleton />,
  "/growcode/skeleton": <GrowcodeSkeleton />,
  "/browser-frame/skeleton": <FinlayerSkeleton />,
  "/finlayer/skeleton": <FinlayerSkeleton />,
  "/feature-rail/skeleton": <FeaturesSecSkeleton />,
  "/features-sec/skeleton": <FeaturesSecSkeleton />,
  "/blueprint/skeleton": <ChainovaSkeleton />,
  "/chainova/skeleton": <ChainovaSkeleton />,
  "/spaceman-moon/skeleton": <NudgeaiSkeleton />,
  "/nudgeai/skeleton": <NudgeaiSkeleton />,
  "/light-rays/skeleton": <AieigenSkeleton />,
  "/aieigen/skeleton": <AieigenSkeleton />,
  "/prompt-bar/skeleton": <IncredibleSkeleton />,
  "/incredible/skeleton": <IncredibleSkeleton />,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>{routes[path] ?? <App />}</StrictMode>,
)
