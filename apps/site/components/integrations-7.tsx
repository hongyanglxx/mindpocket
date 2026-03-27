"use client"

import { PLATFORM_CONFIG, PlatformIcon, type PlatformKey } from "@repo/icons/web"
import Link from "next/link"
import { LogoIcon } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { useSiteI18n } from "@/lib/site-i18n"
import { cn } from "@/lib/utils"

const sliderRows = [
  [
    { id: "wechat", platform: "wechat" },
    { id: "xiaohongshu", platform: "xiaohongshu" },
    { id: "bilibili", platform: "bilibili" },
    { id: "zhihu", platform: "zhihu" },
    { id: "juejin", platform: "juejin" },
    { id: "qq", platform: "qq" },
    { id: "twitter", platform: "twitter" },
    { id: "github", platform: "github" },
    { id: "youtube", platform: "youtube" },
    { id: "reddit", platform: "reddit" },
    { id: "medium", platform: "medium" },
    { id: "notion", platform: "notion" },
  ],
  [
    { id: "github", platform: "github" },
    { id: "youtube", platform: "youtube" },
    { id: "wechat", platform: "wechat" },
    { id: "reddit", platform: "reddit" },
    { id: "xiaohongshu", platform: "xiaohongshu" },
    { id: "notion", platform: "notion" },
    { id: "bilibili", platform: "bilibili" },
    { id: "twitter", platform: "twitter" },
    { id: "zhihu", platform: "zhihu" },
    { id: "medium", platform: "medium" },
    { id: "juejin", platform: "juejin" },
    { id: "qq", platform: "qq" },
  ],
  [
    { id: "medium", platform: "medium" },
    { id: "notion", platform: "notion" },
    { id: "zhihu", platform: "zhihu" },
    { id: "github", platform: "github" },
    { id: "wechat", platform: "wechat" },
    { id: "youtube", platform: "youtube" },
    { id: "qq", platform: "qq" },
    { id: "xiaohongshu", platform: "xiaohongshu" },
    { id: "reddit", platform: "reddit" },
    { id: "bilibili", platform: "bilibili" },
    { id: "twitter", platform: "twitter" },
    { id: "juejin", platform: "juejin" },
  ],
] as const

export default function IntegrationsSection() {
  const { t } = useSiteI18n()
  return (
    <section>
      <div className="bg-muted/30 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="bg-muted/25 group relative mx-auto max-w-[22rem] items-center justify-between space-y-6 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] sm:max-w-md">
            <div
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"
              role="presentation"
            />
            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10}>
                {sliderRows[0].map(({ id, platform }) => (
                  <IntegrationCard key={`row-1-${id}`}>
                    <ColoredPlatformIcon platform={platform} />
                  </IntegrationCard>
                ))}
              </InfiniteSlider>
            </div>

            <div>
              <InfiniteSlider gap={24} reverse speed={20} speedOnHover={10}>
                {sliderRows[1].map(({ id, platform }) => (
                  <IntegrationCard key={`row-2-${id}`}>
                    <ColoredPlatformIcon platform={platform} />
                  </IntegrationCard>
                ))}
              </InfiniteSlider>
            </div>
            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10}>
                {sliderRows[2].map(({ id, platform }) => (
                  <IntegrationCard key={`row-3-${id}`}>
                    <ColoredPlatformIcon platform={platform} />
                  </IntegrationCard>
                ))}
              </InfiniteSlider>
            </div>
            <div className="absolute inset-0 m-auto flex size-fit justify-center gap-2">
              <IntegrationCard
                className="shadow-black-950/10 size-16 bg-white/25 shadow-xl backdrop-blur-md backdrop-grayscale dark:border-white/10 dark:shadow-white/15"
                isCenter={true}
              >
                <LogoIcon />
              </IntegrationCard>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-medium md:text-4xl">
              {t.integrations.title}
            </h2>
            <p className="text-muted-foreground">{t.integrations.subtitle}</p>

            <Button asChild size="sm" variant="outline">
              <Link href="#">{t.integrations.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ColoredPlatformIcon({ platform }: { platform: PlatformKey }) {
  return (
    <PlatformIcon
      className="size-5.5"
      platform={platform}
      style={{ color: PLATFORM_CONFIG[platform].colorHex }}
    />
  )
}

const IntegrationCard = ({
  children,
  className,
  isCenter = false,
}: {
  children: React.ReactNode
  className?: string
  position?:
    | "left-top"
    | "left-middle"
    | "left-bottom"
    | "right-top"
    | "right-middle"
    | "right-bottom"
  isCenter?: boolean
}) => {
  return (
    <div className={cn("bg-background relative z-20 flex size-12 rounded-full border", className)}>
      <div className={cn("m-auto size-fit *:size-5.5", isCenter && "*:size-8")}>{children}</div>
    </div>
  )
}
