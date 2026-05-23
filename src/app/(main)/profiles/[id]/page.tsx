import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROFILE_MAP, SAMPLE_PROFILES } from "@/data/profiles";
import { CATEGORIES } from "@/data/questions";
import { shapeScore, scoreLabel, scoreLabelColor } from "@/lib/scoring";
import PoliticalRadarChart from "@/components/PoliticalRadarChart";
import ShareExportPanel from "@/components/ShareExportPanel";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_PROFILES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const profile = PROFILE_MAP[id];
  return {
    title: profile ? `Profile - ${profile.name}` : "Profile",
  };
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const profile = PROFILE_MAP[id];
  if (!profile) notFound();

  const avg = shapeScore(profile.scores);
  const label = scoreLabel(avg);

  return (
    <div className="min-h-screen bg-[#E5E0D2] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link href="/profiles" className="text-[var(--color-accent)] hover:text-[var(--color-accent-deep)]">
            ← All Profiles
          </Link>
        </div>

        {/* Header */}
        <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0A0A0A]">{profile.name}</h1>
              <p className="text-[rgba(10,10,10,0.55)] text-sm">{profile.title}</p>
              <p className="text-[rgba(10,10,10,0.70)] text-sm mt-2 max-w-xl leading-relaxed">
                {profile.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs text-[rgba(10,10,10,0.45)]">Shape Score</div>
              <div className="text-2xl font-bold font-mono text-[var(--color-accent)]">
                {avg >= 0 ? "+" : ""}
                {avg.toFixed(2)}
              </div>
              <div className="text-xs text-[rgba(10,10,10,0.55)]">{label}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-4">
            <PoliticalRadarChart
              scores={profile.scores}
              name={profile.name}
              height={460}
            />
          </div>

          {/* Category scores */}
          <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-[#0A0A0A] mb-4">
              Scores by category
            </h3>
            <div className="space-y-3">
              {CATEGORIES.map((cat) => {
                const score = profile.scores[cat.id] ?? 0;
                const pct = ((score + 1) / 2) * 100;
                const barColor =
                  score >= 0.5
                    ? "bg-emerald-500"
                    : score >= 0.1
                    ? "bg-emerald-400"
                    : score > -0.1
                    ? "bg-slate-400"
                    : score > -0.5
                    ? "bg-orange-400"
                    : "bg-red-500";
                const labelColor = scoreLabelColor(score);

                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[rgba(10,10,10,0.70)] flex items-center gap-1">
                        {cat.emoji} {cat.shortName}
                      </span>
                      <span className={`font-mono font-semibold ${labelColor}`}>
                        {score >= 0 ? "+" : ""}
                        {score.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-1.5 rounded-full bg-[rgba(10,10,10,0.06)] overflow-hidden">
                      <div className="absolute inset-y-0 left-1/2 w-px bg-slate-300 z-10" />
                      <div
                        className={`absolute inset-y-0 rounded-full ${barColor}`}
                        style={{
                          left: score >= 0 ? "50%" : `${pct}%`,
                          width: `${Math.abs(score) * 50}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Embed section */}
        <div className="bg-[#F1EEE5] border border-[rgba(10,10,10,0.12)] rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-[#0A0A0A] mb-1">
            Embed this profile
          </h3>
          <p className="text-xs text-[rgba(10,10,10,0.55)] mb-4">
            Add {profile.name}&apos;s political shape to your website or article.
          </p>
          <ShareExportPanel scores={profile.scores} name={profile.name} />
        </div>
      </div>
    </div>
  );
}
