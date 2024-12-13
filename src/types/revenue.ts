import { z } from 'zod';

export const revenueSourcesSchema = z.object({
  // Social Platforms
  youtube: z.boolean().default(false),
  instagram: z.boolean().default(false),
  tiktokCreator: z.boolean().default(false),
  tiktokShop: z.boolean().default(false),
  tiktokAffiliate: z.boolean().default(false),
  
  // Course/Community
  coursesSales: z.boolean().default(false),
  skool: z.boolean().default(false),
  membershipSites: z.boolean().default(false),
  coaching: z.boolean().default(false),
  
  // Other Revenue
  sponsorships: z.boolean().default(false),
  merchandise: z.boolean().default(false),
  consulting: z.boolean().default(false),
  speaking: z.boolean().default(false),
  digitalProducts: z.boolean().default(false)
});

export const revenueAmountsSchema = z.object({
  monthlyRevenue: z.number().default(0)
});

export type RevenueSources = z.infer<typeof revenueSourcesSchema>;
export type RevenueAmounts = z.infer<typeof revenueAmountsSchema>;

export const REVENUE_CATEGORIES = {
  social: {
    title: 'Social Platforms',
    sources: [
      { key: 'youtube', label: 'YouTube' },
      { key: 'instagram', label: 'Instagram' },
      { key: 'tiktokCreator', label: 'TikTok Creator Fund' },
      { key: 'tiktokShop', label: 'TikTok Shop' },
      { key: 'tiktokAffiliate', label: 'TikTok Affiliate' }
    ]
  },
  courses: {
    title: 'Courses & Community',
    sources: [
      { key: 'coursesSales', label: 'Course Sales' },
      { key: 'skool', label: 'Skool Community' },
      { key: 'membershipSites', label: 'Membership Sites' },
      { key: 'coaching', label: 'Coaching' }
    ]
  },
  other: {
    title: 'Other Revenue',
    sources: [
      { key: 'sponsorships', label: 'Sponsorships' },
      { key: 'merchandise', label: 'Merchandise' },
      { key: 'consulting', label: 'Consulting' },
      { key: 'speaking', label: 'Speaking' },
      { key: 'digitalProducts', label: 'Digital Products' }
    ]
  }
} as const;