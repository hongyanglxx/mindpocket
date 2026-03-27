"use client"

import { Database, MessageSquareText, Sparkles, Tags } from "lucide-react"
import { useSiteI18n } from "@/lib/site-i18n"

const highlightIcons = [Sparkles, Tags, MessageSquareText, Database]

export default function ContentSection() {
  const { t } = useSiteI18n()
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.92))] px-6 py-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] md:px-10 md:py-12">
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:26px_26px] opacity-40"
          />
          <div
            aria-hidden
            className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-sky-200/70 bg-white/85 px-4 py-1.5 text-sm text-sky-700 shadow-sm">
                {t.content.badge}
              </span>
              <h2 className="max-w-xl text-4xl font-medium tracking-tight text-balance lg:text-5xl">
                {t.content.title}
              </h2>
              <div className="max-w-xl space-y-4 text-base leading-7 text-muted-foreground">
                <p>{t.content.paragraph1}</p>
                <p>{t.content.paragraph2}</p>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/92 p-4 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.5)] backdrop-blur-sm md:p-5">
                <div className="mb-4 flex items-start justify-between gap-4 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/85 p-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-900">{t.content.panelTitle}</p>
                    <p className="max-w-xs text-sm leading-6 text-slate-600">
                      {t.content.panelSubtitle}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <span className="size-2 rounded-full bg-sky-400" />
                    <span className="size-2 rounded-full bg-cyan-300" />
                    <span className="size-2 rounded-full bg-slate-300" />
                  </div>
                </div>

                <div className="relative rounded-[1.5rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_45%),linear-gradient(180deg,rgba(248,250,252,0.96),rgba(241,245,249,0.9))] p-3">
                  <div className="grid min-h-[26rem] content-end gap-3 sm:grid-cols-2">
                    {t.content.highlights.map((item, index) => {
                      const Icon = highlightIcons[index]
                      return (
                        <div
                          className="rounded-2xl border border-white/70 bg-white/88 p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.55)] backdrop-blur-sm"
                          key={item.title}
                        >
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                              <Icon className="size-4" />
                            </div>
                            <p className="text-sm font-medium text-slate-900">{item.title}</p>
                          </div>
                          <p className="text-xs leading-5 text-slate-600">{item.detail}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Offset shell adds a technical frame without overpowering the content. */}
              <div
                aria-hidden
                className="absolute -bottom-5 -right-5 -z-10 hidden h-40 w-40 rounded-[2rem] border border-sky-200/70 bg-sky-50/70 lg:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
