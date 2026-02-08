# Google Review Request System - Quick Guide

## ✅ What Was Implemented

A complete review collection system to help gather more Google reviews from satisfied clients.

---

## 🔗 Two Pages Created

### 1. **Main Review Request Page**
**URL:** `https://mobile-notary-management.com/leave-review`

**Features:**
- Beautiful thank-you message
- Large "Write a Google Review" button
- 5-star rating visual
- Alternative platforms (Yelp, Signing Agent)
- Private feedback options
- Mobile-optimized design

**When to use:** Share this link immediately after completing an appointment

---

### 2. **QR Code Page (Printable)**
**URL:** `https://mobile-notary-management.com/leave-review/qr`

**Features:**
- Large, scannable QR code
- Print-optimized layout
- Download QR code as image
- Usage instructions for clients
- Professional design

**When to use:** Print and keep in your notary bag, or save to your phone to show clients

---

## 📱 How to Use This System

### **Method 1: Text the Link (Easiest)**
Right after appointment, text the client:
```
Thank you for using Mobile Notary Management!
I'd really appreciate if you could leave a quick review:
https://mobile-notary-management.com/leave-review
```

### **Method 2: Show QR Code**
1. Open on your phone: `https://mobile-notary-management.com/leave-review/qr`
2. Show to client: "Would you mind scanning this to leave a review?"
3. Client scans with phone camera
4. They're taken directly to review page

### **Method 3: Print & Carry**
1. Visit: `https://mobile-notary-management.com/leave-review/qr`
2. Click "Print QR Code"
3. Laminate the printout
4. Keep in your notary bag
5. Show to clients after appointments

### **Method 4: Email Follow-up**
Include in thank-you emails:
```
Subject: Thank you for choosing Mobile Notary Management!

Hi [Client Name],

Thank you for trusting me with your notarization needs today.
I hope everything went smoothly!

If you have a moment, I'd be grateful if you could share your
experience on Google. It really helps other families in the
Bay Area find reliable notary services.

Leave a review: https://mobile-notary-management.com/leave-review

Thank you again!

[Your Name]
Mobile Notary Management
(510) 393-1860
```

---

## 💡 Best Practices

### **Timing Matters**
- ✅ **Best:** Ask immediately after appointment while positive experience is fresh
- ✅ **Good:** Send follow-up text/email within 24 hours
- ❌ **Avoid:** Waiting more than 2-3 days

### **How to Ask**
- Be genuine: "Your review really helps other families find me"
- Make it easy: Have link ready to share
- Don't pressure: "If you have a moment" not "I need you to"
- Show QR code: Visual reminder is less pushy than verbal ask

### **Who to Ask**
- ✅ Clearly satisfied clients
- ✅ Clients who expressed gratitude
- ✅ Repeat customers
- ✅ Professional clients (realtors, attorneys)
- ⚠️ Skip if appointment had any issues (fix problem first)

---

## 📊 What Happens When Client Clicks

1. **Client receives link or scans QR code**
2. **Lands on beautiful thank-you page** with gold/navy branding
3. **Sees large "Write a Google Review" button**
4. **Clicks button** → Opens Google review page
5. **Writes review** on Google Business Profile
6. **Review appears** on your Google listing (usually within hours)

---

## 🎯 Goals

**Short-term:** Collect 2-3 reviews per week
**Medium-term:** Reach 100+ reviews in 6 months
**Long-term:** Maintain 4.9+ star average with 200+ reviews

**Benefits:**
- Higher Google Maps ranking
- More trust from potential clients
- Better conversion rate on website
- Stand out from competitors
- Valuable feedback for improvement

---

## 🔧 Technical Details

### **Review Links Configured**

All links in `/src/lib/constants.ts`:

```typescript
social: {
  google: "https://g.page/mobile-notary-management",
  googleReview: "https://g.page/r/CaSj3qGd7KNNEAI/review", // Direct review link
  yelp: "https://www.yelp.com/biz/mobile-notary-management-hercules-12",
}
```

### **QR Code**

- Generated via QR Server API
- Points to: `/leave-review` page
- 400x400 pixel high-quality code
- Scannable from 2+ feet away

### **Mobile Optimization**

- Responsive design (works on all devices)
- Large tap targets (easy to click on mobile)
- Fast loading
- Works offline (QR code can be saved)

---

## 📋 Checklist: Getting Started

- [ ] Visit `/leave-review/qr` on your phone
- [ ] Bookmark the page for quick access
- [ ] Test scanning the QR code with your phone
- [ ] Print one copy and laminate it
- [ ] Keep laminated copy in notary bag
- [ ] Add review link to email signature
- [ ] Set reminder to request reviews after each appointment
- [ ] Track review count weekly

---

## 🚀 Advanced Tips

### **Add to Business Cards**
Print QR code on back of business cards with text:
"Scan to leave a review"

### **Add to Email Signature**
```
---
[Your Name]
Mobile Notary Management
(510) 393-1860

⭐ Happy with my service? Leave a review:
https://mobile-notary-management.com/leave-review
```

### **Create Template Text**
Save in phone for easy copy/paste:
"Thanks for choosing Mobile Notary Management! Leave a review: https://mobile-notary-management.com/leave-review"

### **Follow-up Automation**
If you use Calendly/booking system:
- Add review link to confirmation email
- Add to post-appointment email
- Include in SMS reminders

---

## 📈 Tracking Success

### **Monitor These Metrics:**
1. **Google Business Profile** → Check review count weekly
2. **Review conversion rate** → Reviews per appointment (target: 30-40%)
3. **Average rating** → Maintain 4.8+ stars
4. **Review velocity** → Steady stream better than bursts

### **Where to Check:**
- Google Business Profile dashboard
- Google Maps listing
- Search "mobile notary management" on Google

---

## ❓ FAQs

**Q: What if client doesn't have Google account?**
A: They can also leave reviews on Yelp or provide private feedback via email/phone.

**Q: Can I incentivize reviews?**
A: No - Google prohibits offering compensation for reviews. Keep it organic.

**Q: What if someone leaves a bad review?**
A: Respond professionally within 24 hours. Acknowledge issue, explain resolution, show you care.

**Q: How long does review take to appear?**
A: Usually immediate, but Google may take up to 24 hours to verify and publish.

**Q: Client says they can't find the review page?**
A: Make sure they're logged into their Google account and have location services enabled.

---

## ✅ Success Checklist

After every appointment:

1. **Close the appointment professionally**
2. **Mention reviews naturally:** "If you're happy with the service, I'd love a review"
3. **Show QR code or text link immediately**
4. **Thank them regardless** of whether they commit to review
5. **Follow up in 24 hours** if they were particularly happy
6. **Track in spreadsheet:** Client name, date, review requested (Y/N), review received (Y/N)

---

## 🎉 You're All Set!

The review system is live and ready to use. Start collecting reviews today!

**Quick Access URLs:**
- Review page: `/leave-review`
- QR code page: `/leave-review/qr`

**Need help?** Check the codebase or contact your developer.

---

**Last Updated:** 2026-02-08
**Status:** ✅ Live and ready to use
