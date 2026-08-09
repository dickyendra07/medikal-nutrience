"use client";

import { useEffect, useState } from "react";
import { CmsCard, CmsSectionHeader } from "@/components/cms/CmsUi";
import { listArticles, type ArticleListResponse } from "@/lib/cms/article-api";

export function ArticleDashboardMetrics() {
  const [data, setData] = useState<ArticleListResponse | null>(null);

  useEffect(() => {
    void listArticles({ limit: 5 }).then(setData).catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Memuat metrik artikel">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white" />)}
      </div>
    );
  }

  const metrics = [
    ["Total", data.summary.total],
    ["Terbit", data.summary.published],
    ["Draft", data.summary.draft],
    ["Terjadwal", data.summary.scheduled],
  ] as const;

  return (
    <CmsCard className="mt-5">
      <CmsSectionHeader
        eyebrow="Editorial"
        title="Ringkasan artikel"
        description="Status publikasi dan aktivitas editorial terbaru."
        action={<a href="/cms/articles" className="text-[11px] font-semibold text-[#08704c] hover:text-[#065e40]">Buka artikel →</a>}
      />
      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 xl:grid-cols-4">
        {metrics.map(([label, value]) => (
          <article key={label} className="bg-white px-4 py-3.5">
            <p className="text-xl font-semibold tracking-[-0.025em] text-slate-900">{value}</p>
            <p className="mt-1 text-[10px] font-medium text-slate-500">{label}</p>
          </article>
        ))}
      </div>
      {data.recentActivity.length ? (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Pembaruan terbaru</p>
          <div className="mt-2 divide-y divide-slate-100">
            {data.recentActivity.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-center justify-between gap-4 py-2 text-xs">
                <p className="min-w-0 truncate text-slate-600"><span className="font-semibold text-[#08704c]">{activity.action}</span> · {activity.article.title}</p>
                <span className="shrink-0 text-[10px] text-slate-400">{activity.actor?.name || "Sistem"}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-500">Belum ada aktivitas artikel terbaru.</p>
      )}
    </CmsCard>
  );
}
