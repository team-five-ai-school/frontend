"use client";

import { useState } from "react";

import { SegmentedControl } from "@/components/segmented-control";
import { ChaosMap, ChaosMapSkeleton, type ChaosMode } from "@/features/chaos-map/components/chaos-map";
import { HoursMetric } from "@/features/chaos-map/components/hours-metric";
import { ShareCard } from "@/features/chaos-map/components/share-card";

import { chaosMap } from "../mocks";
import { PreviewSection, Specimen, SpecimenGrid, SubHeading } from "./preview-kit";

export function ChaosSection() {
  const [mode, setMode] = useState<ChaosMode>("now");
  return (
    <PreviewSection
      id="chaos"
      title="Карта хаосу"
      description="Керується даними (ChaosMapData). Горизонтальна від 672px ширини контейнера, вертикальна на телефоні. «Показати списком» дає текстову альтернативу."
    >
      <ChaosMap data={chaosMap} />

      <SubHeading>HoursMetric</SubHeading>
      <SpecimenGrid>
        <Specimen label="controlled mode" className="flex-col items-stretch gap-4">
          <SegmentedControl
            label="Режим"
            value={mode}
            onValueChange={setMode}
            options={[
              { value: "now", label: "Зараз" },
              { value: "ai", label: "З AI" },
            ]}
            className="self-start"
          />
          <HoursMetric hoursNow={22} hoursWithAi={7.5} mode={mode} />
        </Specimen>
        <Specimen label="loading" className="flex-col items-stretch">
          <HoursMetric hoursNow={0} hoursWithAi={0} mode="now" loading />
        </Specimen>
      </SpecimenGrid>

      <SubHeading>ShareCard</SubHeading>
      <div className="max-w-xl">
        <ShareCard percent={38} roleTitle="Вчитель" shareUrl="https://team5-ai.vercel.app" />
      </div>

      <SubHeading>Стани</SubHeading>
      <SpecimenGrid>
        <Specimen label="loading" className="flex-col items-stretch" wide>
          <ChaosMapSkeleton />
        </Specimen>
        <Specimen label="empty" className="flex-col items-stretch">
          <ChaosMap data={{ tasks: [], flows: [], totals: { hoursNow: 0, hoursWithAi: 0 } }} />
        </Specimen>
      </SpecimenGrid>
    </PreviewSection>
  );
}
