# Site Social Platform Icons Design

## Goal

Replace the generic tool and AI brand logos in the site integrations section with a denser set of social and content platform icons that better match the product's bookmark capture story.

## Decision

- Keep the existing integrations section layout, motion, and center logo.
- Replace the current rotating logos with mixed Chinese and global social/content platforms.
- Reuse the shared icon set from `@repo/icons/web` instead of adding new assets.

## Platform Set

- WeChat
- Xiaohongshu
- Bilibili
- Zhihu
- Juejin
- QQ
- X
- GitHub
- YouTube
- Reddit
- Medium
- Notion

## Implementation Notes

- Use three `InfiniteSlider` rows with slightly different ordering to avoid visible repetition.
- Keep the center `LogoIcon` as the focal point.
- Preserve the existing card shell and only normalize icon sizing.
- Avoid changing copy in this pass.
