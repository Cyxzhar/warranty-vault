# Warranty Vault - Build Plan & Launch Strategy

## Executive Summary

**Product:** Warranty Vault - Ultra-simple warranty tracker
**Tagline:** Never lose money on expired warranties again
**MVP Timeline:** 7 days
**Infrastructure Cost:** $0/month
**Target MRR (Month 3):** $100+

---

## Product Spec

### Core Value Proposition
Average household loses $400+/year on expired warranties. Existing solutions are:
- **Bloated** (QuickBooks-level complexity)
- **Expensive** ($5-10/mo for basic features)
- **Privacy-invasive** (require bank connections)
- **Buggy** (slow loading, poor UX per app store reviews)

Warranty Vault is the anti-thesis: **Dead simple. Free. Private.**

### MVP Features (Week 1)

| Feature | Priority | Complexity |
|---------|----------|------------|
| Add warranty (name, date, period) | P0 | Low |
| Upload receipt photo | P0 | Low |
| View all warranties | P0 | Low |
| Status badges (active/expiring/expired) | P0 | Low |
| Filter by status | P1 | Low |
| Delete warranty | P1 | Low |
| LocalStorage persistence | P0 | Low |
| Onboarding screen | P1 | Medium |
| Stats dashboard | P1 | Low |

### Future Features (Post-Launch)

| Feature | Trigger to Build | Monetization |
|---------|------------------|--------------|
| Email reminders | 100 users | Pro ($3/mo) |
| Cloud sync | 200 users | Pro |
| Family sharing | User requests | Pro |
| CSV export | User requests | Pro |
| SMS alerts | Pro revenue > $50/mo | Pro add-on |

---

## Tech Stack

### Frontend (React + Tailwind)
```
/warranty-vault
├── src/
│   ├── components/
│   │   ├── WarrantyCard.jsx
│   │   ├── AddWarrantyModal.jsx
│   │   ├── StatsBar.jsx
│   │   └── Onboarding.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── dateUtils.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

### Deployment
- **Hosting:** Vercel (free tier, unlimited projects)
- **Domain:** warranty-vault.vercel.app (free), upgrade to custom when revenue justifies
- **Analytics:** Plausible free tier OR Simple Analytics ($9/mo when profitable)

### Backend (When Needed)
- **Database:** Supabase free tier (500MB, 50K MAU)
- **Auth:** Supabase Auth (free)
- **Storage:** Supabase Storage (1GB free)
- **Email:** Resend free tier (3K emails/mo)

---

## 7-Day Build Sprint

### Day 1: Project Setup + Core UI
- [ ] Initialize Vite + React + Tailwind
- [ ] Create basic layout (header, main, footer)
- [ ] Build WarrantyCard component
- [ ] Implement Add Warranty modal
- [ ] LocalStorage hook

### Day 2: Core Functionality
- [ ] Add warranty form validation
- [ ] Image upload + preview
- [ ] Date calculations (days until expiry)
- [ ] Status determination logic
- [ ] Delete functionality

### Day 3: Dashboard + Filtering
- [ ] Stats bar (total, active, expiring, expired)
- [ ] Filter buttons
- [ ] Sort by expiry date
- [ ] Empty state design
- [ ] Responsive layout

### Day 4: Polish + Onboarding
- [ ] First-time user onboarding flow
- [ ] Animations (modal, cards)
- [ ] Loading states
- [ ] Error handling
- [ ] Cross-browser testing

### Day 5: Landing Page
- [ ] Hero section with value prop
- [ ] Features section
- [ ] How it works
- [ ] Pricing (Free vs Pro)
- [ ] Email capture form

### Day 6: Pre-Launch
- [ ] SEO meta tags
- [ ] OG images for social sharing
- [ ] Favicon + app icons
- [ ] Deploy to Vercel
- [ ] Test all flows

### Day 7: Launch Day
- [ ] Write Reddit posts (r/personalfinance, r/Frugal, r/homeowners)
- [ ] Prepare Hacker News "Show HN" post
- [ ] Product Hunt draft
- [ ] Share in relevant Discord/Slack communities

---

## Launch Strategy

### Launch Channels (In Order)

**1. Reddit (Day 1)**
Target subreddits:
- r/personalfinance (19M members) - "I built a free tool to track warranties"
- r/Frugal (2.3M) - "Stop losing money on expired warranties"
- r/homeowners (300K) - "Track your appliance warranties for free"
- r/BuyItForLife (2M) - "Keep track of lifetime warranties"

Post template:
```
Title: I kept losing money on expired warranties, so I built a free tracker

After my $800 dishwasher broke 2 weeks after the warranty expired, I was 
frustrated. Then I realized I had no idea when ANY of my warranties expired.

So I built Warranty Vault - it's dead simple:
1. Add product + purchase date
2. Set warranty period
3. Get reminded before it expires

No account. No bank connections. Data stays on your device.

Free forever (I'll add a $3/mo Pro tier later for email reminders, but the 
free version does everything most people need).

Would love feedback: [link]
```

**2. Hacker News (Day 2-3)**
```
Show HN: Warranty Vault – Track warranties, get reminded before they expire

I built this after my AC warranty expired 2 weeks before I needed it.

Simple premise:
- Add product + date + warranty length
- Upload receipt photo
- See expiring items at a glance
- Free, no account, local storage only

Stack: React + Tailwind, deployed on Vercel. No backend yet.

Looking for feedback on the UX and whether email reminders would be 
valuable enough for a Pro tier.

[link]
```

**3. Product Hunt (Week 2)**
- Prepare 3 screenshots
- 30-second demo video (Loom)
- Tagline: "Never lose money on expired warranties again"
- Ship on Tuesday/Wednesday 12:01am PT

**4. Direct Outreach (Week 2+)**
- Find Reddit users who complained about warranties
- DM with helpful, non-spammy message
- Engage in comments on warranty-related posts

---

## Pricing Strategy

### Free Tier (Always)
- 10 warranties max
- Receipt photo storage (localStorage)
- In-app expiry alerts
- Works offline

### Pro Tier ($3/month)
- Unlimited warranties
- Email reminders (30 days before)
- SMS alerts (7 days before)
- Cloud sync across devices
- Family sharing (5 users)

### Why $3/month?
- Below psychological threshold for impulse purchase
- 34 paying users = $100 MRR goal
- Competitors charge $5-10/mo for similar features
- Low enough that churn is less painful

---

## Success Metrics

### Week 1
- [ ] MVP deployed
- [ ] 10 test users (friends/family)
- [ ] 0 critical bugs

### Week 2-4
- [ ] 100 active users
- [ ] 5+ Reddit comments/feedback
- [ ] NPS > 7 from early users
- [ ] <10% D7 retention drop

### Month 2
- [ ] 500 active users
- [ ] Launch Pro tier
- [ ] 10+ paying users

### Month 3
- [ ] 1,000+ users
- [ ] $100+ MRR
- [ ] Product-market fit signal: users asking for features

---

## Kill Criteria

**Pivot if (after 6 weeks):**
- <50 users despite active promotion
- No organic growth (100% from your posts)
- 0 users asking for Pro features
- Negative feedback on core concept

**Pivot options:**
1. Narrow focus: Warranty tracker for specific niche (RV owners, photographers)
2. Adjacent problem: Receipt organizer for tax deductions
3. Different audience: B2B warranty management for small businesses

---

## Competitive Moat

### Why Won't Competitors Crush You?

1. **QuickBooks/Expensify** - Overkill, enterprise-focused
2. **Existing warranty apps** - Bloated, buggy, subscription-only
3. **Spreadsheets** - No reminders, easy to forget

Your moat:
- **Simplicity** - Do ONE thing perfectly
- **Free tier** - Generous enough that most users never pay
- **Privacy** - No bank connections, no tracking
- **Speed** - Fast to add, fast to find

---

## Open Questions to Validate

1. Do users actually want email reminders? (Track feature requests)
2. Is $3/mo the right price? (Test $5/mo after 100 users)
3. What's the ideal reminder timing? (30 days? 14 days? Both?)
4. Should there be a mobile app? (PWA first, native later if demand)

---

## Resources Created

1. **warranty-vault.jsx** - Complete React MVP component
2. **warranty-vault-landing.html** - Launch landing page with email capture
3. **This document** - Build plan and launch strategy

---

## Next Immediate Actions

1. ⬜ Set up Vite project locally
2. ⬜ Copy warranty-vault.jsx as starting point
3. ⬜ Deploy landing page to Vercel
4. ⬜ Start collecting emails
5. ⬜ Build MVP over next 5 days
6. ⬜ Launch on Reddit Day 7

Good luck! 🚀
