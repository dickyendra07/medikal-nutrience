"use client";

import { useEffect, useState } from "react";
import { listArticles, type ArticleListResponse } from "@/lib/cms/article-api";

export function ArticleDashboardMetrics() {
  const [data, setData] = useState<ArticleListResponse | null>(null);
  useEffect(() => { void listArticles({ limit: 5 }).then(setData).catch(() => setData(null)); }, []);
  if (!data) return <section className="mb-6 grid gap-4 md:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-28 animate-pulse rounded-[1.7rem] bg-white" />)}</section>;
  return <section className="mb-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">Editorial Overview</p><h2 className="mt-2 text-2xl font-black">Aktivitas Artikel</h2></div><a href="/cms/articles" className="text-sm font-black text-[#006b3f]">Buka Article Management →</a></div><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[["Total Artikel", data.summary.total], ["Published", data.summary.published], ["Draft", data.summary.draft], ["Scheduled", data.summary.scheduled]].map(([label, value]) => <article key={String(label)} className="rounded-2xl bg-[#f4fbf8] p-4"><p className="text-3xl font-black text-[#006b3f]">{value}</p><p className="mt-1 text-xs font-black text-[#64748b]">{label}</p></article>)}</div>{data.recentActivity.length ? <div className="mt-5 border-t border-black/5 pt-5"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#64748b]">Pembaruan Terbaru</p><div className="mt-3 grid gap-2 md:grid-cols-2">{data.recentActivity.slice(0, 4).map((activity) => <div key={activity.id} className="rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-[#475569]"><span className="text-[#006b3f]">{activity.action}</span> · {activity.article.title}<span className="mt-1 block font-medium text-[#94a3b8]">{activity.actor?.name || "Sistem"}</span></div>)}</div></div> : null}</section>;
}
