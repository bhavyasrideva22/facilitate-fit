import { ResponsiveRadar } from "@nivo/radar";

interface RadarData extends Record<string, unknown> {
  dimension: string;
  score: number;
  fullMark: number;
}

interface RadarChartProps {
  data: RadarData[];
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <div className="h-96 w-full">
      <ResponsiveRadar
        data={data}
        keys={["score"]}
        indexBy="dimension"
        maxValue={100}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        borderColor="hsl(var(--border))"
        gridLabelOffset={20}
        dotSize={8}
        dotColor="hsl(var(--primary))"
        dotBorderWidth={2}
        dotBorderColor="hsl(var(--background))"
        enableDotLabel={true}
        dotLabel="score"
        dotLabelYOffset={-12}
        colors={["hsl(var(--primary))"]}
        fillOpacity={0.15}
        blendMode="normal"
        animate={true}
        motionConfig="gentle"
        isInteractive={true}
        theme={{
          background: "transparent",
          text: {
            fill: "hsl(var(--foreground))",
            fontSize: 12,
          },
          grid: {
            line: {
              stroke: "hsl(var(--border))",
              strokeWidth: 1,
            },
          },
          dots: {
            text: {
              fill: "hsl(var(--foreground))",
              fontSize: 11,
              fontWeight: 600,
            },
          },
        }}
      />
    </div>
  );
}