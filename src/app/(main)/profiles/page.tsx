import Link from "next/link";
import { SAMPLE_PROFILES } from "@/data/profiles";
import { shapeScore, scoreLabel } from "@/lib/scoring";
import PoliticalRadarChart from "@/components/PoliticalRadarChart";

export default function ProfilesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Sample Political Profiles
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            These fictional candidate profiles demonstrate how the political shape system
            represents different viewpoints. Click any profile to explore it in detail
            or embed it on your website.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_PROFILES.map((profile) => {
            const avg = shapeScore(profile.scores);
            const label = scoreLabel(avg);
            return (
              <Link
                key={profile.id}
                href={`/profiles/${profile.id}`}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="h-52 pointer-events-none">
                  <PoliticalRadarChart
                    scores={profile.scores}
                    name={profile.name}
                    compact
                    height={208}
                  />
                </div>
                <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {profile.name}
                      </h2>
                      <p className="text-xs text-slate-500">{profile.title}</p>
                    </div>
                    <span className="flex-shrink-0 text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {avg >= 0 ? "+" : ""}
                      {avg.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                    {profile.description}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Overall: <span className="text-slate-600 font-medium">{label}</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 mb-4">
            Want to see your own shape?
          </p>
          <Link
            href="/quiz"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
