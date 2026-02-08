# 🤖 Full Automation Setup Guide (No Database!)

## Complete Hands-Free Review Collection

---

## 🎯 Overview

This system is **completely automatic** - no database, no manual work, zero maintenance.

### **How It Works:**

```
1. Client books on Calendly
   ↓
2. Calendly webhook → Your server
   ↓
3. Server → Resend: "Schedule email for 24 hours from now"
   ↓
4. Resend stores the scheduled email
   ↓
5. 24 hours later → Resend automatically sends email
   ↓
6. Client receives review request
   ↓
7. Client leaves review
```

**No database. No cron jobs. No manual work. Ever.**

---

## ⚡ Quick Setup (30 Minutes)

### **Step 1: Sign Up for Resend** (5 minutes)

1. Visit https://resend.com
2. Sign up (free account - 100 emails/day)
3. Verify your email
4. Get API key:
   - Dashboard → API Keys
   - Create API Key
   - Copy the key (starts with `re_...`)

### **Step 2: Verify Domain** (10 minutes)

**Option A: Use Your Domain (Recommended)**
```
1. Resend Dashboard → Domains
2. Click "Add Domain"
3. Enter: mobile-notary-management.com
4. Add DNS records they provide:
   - TXT record for verification
   - DKIM records for authentication
5. Wait 5-10 minutes for DNS propagation
6. Click "Verify"
```

**Option B: Use Resend's Domain (Testing Only)**
```
Use: onboarding@resend.dev
Good for testing, but deliverability is lower
```

### **Step 3: Add Environment Variables** (2 minutes)

Create or edit `.env.local` in your project root:

```env
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=Mobile Notary Management <noreply@mobile-notary-management.com>

# Calendly Webhook (optional for security)
CALENDLY_WEBHOOK_SECRET=your_webhook_secret_here
```

### **Step 4: Install Resend Package** (1 minute)

```bash
npm install resend
```

### **Step 5: Deploy Your App** (2 minutes)

```bash
# If using Vercel:
vercel --prod

# Or any hosting platform
```

### **Step 6: Configure Calendly Webhook** (10 minutes)

1. **Upgrade Calendly to Professional**
   - Go to https://calendly.com/pricing
   - Select Professional plan ($12/month)
   - Required for webhooks

2. **Set Up Webhook:**
   ```
   Calendly Dashboard → Account → Integrations → Webhooks

   Webhook URL: https://your-domain.com/api/webhooks/calendly

   Select Events:
   ☑ Invitee Created (when someone books)

   Save
   ```

3. **Test Webhook:**
   - Book a test appointment on your Calendly
   - Check your server logs
   - Should see: "✅ Review request scheduled for..."

---

## ✅ Testing

### **Test 1: Manual Form**

```
1. Visit: /admin/send-review
2. Enter your own email
3. Submit form
4. Check server logs for confirmation
5. Wait 24 hours (or check Resend dashboard for scheduled email)
```

### **Test 2: Calendly Webhook**

```
1. Book a test appointment on your Calendly
2. Use your personal email
3. Check server logs immediately
4. Should see: "✅ Review request scheduled..."
5. Check Resend dashboard → Scheduled Emails
6. Should show email scheduled for 24 hours from appointment end
```

### **Test 3: Verify Scheduled Emails**

```
Resend Dashboard → Emails → Scheduled

You should see:
- Recipient email
- Subject: "Thank you for choosing Mobile Notary Management!"
- Scheduled time: 24 hours after appointment
- Status: Scheduled
```

---

## 🔧 Configuration Options

### **Adjust Timing** (Default: 24 hours)

Edit `/src/app/api/webhooks/calendly/route.ts`:

```typescript
// Change from 24 hours to 2 hours:
const reviewRequestTime = new Date(endTime.getTime() + 2 * 60 * 60 * 1000);

// Or 48 hours:
const reviewRequestTime = new Date(endTime.getTime() + 48 * 60 * 60 * 1000);
```

### **Customize Email Template**

Edit the `emailBody` in both:
- `/src/app/api/webhooks/calendly/route.ts` (Calendly webhook)
- `/src/app/api/send-review-request/route.ts` (Manual form)

```typescript
const emailBody = `
Hi ${clientName},

[Your custom message here]

Leave a review: ${reviewUrl}

Thanks!
${BUSINESS.name}
`.trim();
```

---

## 📊 Monitoring & Analytics

### **Check Scheduled Emails:**

Resend Dashboard → Emails → Scheduled
- See all pending review requests
- Cancel if needed
- View details

### **Check Sent Emails:**

Resend Dashboard → Emails → All
- Delivery status
- Open rates (if tracking enabled)
- Click rates
- Bounces

### **Calendly Analytics:**

Calendly Dashboard → Analytics
- Total bookings
- No-show rate
- Booking sources

---

## 💰 Costs

### **Free Tier (Sufficient for Most):**

- **Resend:** 100 emails/day, 3,000/month = FREE
- **Calendly Professional:** $12/month
- **Total:** $12/month

### **Scaling:**

If you send more than 100 emails/day:

- **Resend Pro:** $20/month for 50,000 emails
- **Total:** $32/month

---

## 🎯 What Happens Automatically

### **Client Books Appointment:**

```
Tuesday 10:00 AM - Client books on Calendly
Tuesday 10:00 AM - Webhook fires
Tuesday 10:00 AM - Your server receives booking
Tuesday 10:00 AM - Server calculates: appointment at Friday 2 PM
Tuesday 10:00 AM - Server schedules email for Saturday 2 PM
Tuesday 10:00 AM - Resend queues the email

[You do nothing]

Friday 2:00 PM - Appointment happens
Friday 2:30 PM - Appointment ends

[You still do nothing]

Saturday 2:30 PM - Resend automatically sends email
Saturday 2:30 PM - Client receives review request
Saturday 3:15 PM - Client leaves 5-star review ⭐⭐⭐⭐⭐
```

**Your involvement: ZERO**

---

## 🚨 Troubleshooting

### **Issue: Webhook not receiving events**

**Check:**
1. Webhook URL is correct (https, not http)
2. Endpoint is deployed and accessible
3. Calendly Professional plan is active
4. Events are selected in Calendly webhook settings

**Test:**
```bash
# Manually test endpoint:
curl -X POST https://your-domain.com/api/webhooks/calendly \
  -H "Content-Type: application/json" \
  -d '{"event":"test"}'
```

### **Issue: Emails not sending**

**Check:**
1. RESEND_API_KEY is set in environment variables
2. Domain is verified in Resend dashboard
3. FROM_EMAIL matches verified domain
4. Check Resend dashboard for errors

**Test:**
```bash
# Check env vars are loaded:
console.log('Resend key:', process.env.RESEND_API_KEY ? 'Set' : 'Missing');
```

### **Issue: Emails going to spam**

**Fix:**
1. Verify domain in Resend (add DKIM records)
2. Use verified domain, not resend.dev
3. Warm up domain (send to yourself first)
4. Avoid spammy words ("FREE", "CLICK NOW")
5. Include unsubscribe link

### **Issue: Wrong timing**

**Fix:**
```typescript
// Check timezone calculation
const endTime = new Date(scheduled_event.end_time);
console.log('Appointment ends:', endTime.toISOString());

const reviewTime = new Date(endTime.getTime() + 24 * 60 * 60 * 1000);
console.log('Review scheduled:', reviewTime.toISOString());
```

---

## 🔒 Security Best Practices

### **Verify Webhook Signature:**

```typescript
// In production, uncomment signature verification:
const signature = request.headers.get("calendly-webhook-signature");
if (!verifySignature(body, signature, process.env.CALENDLY_WEBHOOK_SECRET)) {
  return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
}
```

### **Rate Limiting:**

Add rate limiting to prevent abuse:

```typescript
// Example: Max 100 webhooks per hour
const rateLimiter = new RateLimiter(100, '1 hour');
if (!rateLimiter.check(request.ip)) {
  return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
}
```

### **Environment Variables:**

Never commit `.env.local` to git:

```bash
# Add to .gitignore:
.env.local
.env*.local
```

---

## 📈 Expected Results

### **Week 1:**
- 5 appointments booked
- 5 review requests sent automatically
- 2-3 reviews received (40-60% conversion)

### **Month 1:**
- 20 appointments booked
- 20 review requests sent automatically
- 6-8 reviews received (30-40% conversion)
- Zero manual work

### **Month 3:**
- 60 appointments booked
- 60 review requests sent automatically
- 18-24 reviews received (30% conversion)
- Still zero manual work

### **Month 6:**
- 120 appointments booked
- 120 review requests sent automatically
- 36-48 reviews received
- 100+ total reviews on Google
- Top 3 local search ranking
- 50% more bookings from better visibility

---

## 🎨 Customization Ideas

### **Add More Review Platforms:**

```typescript
// Also include Yelp link
const emailBody = `
...
Leave a Google review: ${reviewUrl}

Or review on Yelp: ${BUSINESS.social.yelp}
...
`;
```

### **Personalize by Service Type:**

```typescript
// Different messages for different services
const templates = {
  'Real Estate': 'Thank you for trusting me with your real estate transaction...',
  'Hospital': 'Thank you for allowing me to assist during this important time...',
  'Apostille': 'Thank you for choosing me for your international document needs...',
};

const emailBody = templates[serviceType] || defaultTemplate;
```

### **Add Incentive (Carefully!):**

```typescript
// Note: Google prohibits direct compensation for reviews
const emailBody = `
...
As a thank you for your time, I'd love to offer you 10% off
your next notarization. (No purchase necessary to leave a review!)
...
`;
```

---

## ✅ Setup Checklist

- [ ] Resend account created
- [ ] Domain verified in Resend
- [ ] API key added to .env.local
- [ ] `npm install resend` completed
- [ ] Code deployed to production
- [ ] Calendly upgraded to Professional
- [ ] Webhook configured in Calendly
- [ ] Test booking created
- [ ] Confirmation in server logs
- [ ] Scheduled email visible in Resend dashboard
- [ ] Test email received after 24 hours

---

## 🎉 You're Done!

The system is now **fully automatic**:

✅ **No database** - Resend handles scheduling
✅ **No cron jobs** - Resend handles timing
✅ **No manual work** - Calendly webhook triggers everything
✅ **Scales infinitely** - Works for 1 or 1,000 appointments/day
✅ **Zero maintenance** - Set it and forget it

**Total cost:** $12/month (Calendly Professional)
**Total time investment:** 30 minutes setup
**Ongoing work:** ZERO

---

## 📞 Support

**Resend Issues:**
- Docs: https://resend.com/docs
- Support: support@resend.com

**Calendly Issues:**
- Help Center: https://help.calendly.com
- Support: Contact via dashboard

**Code Issues:**
- Check server logs
- Test endpoints with curl
- Verify environment variables

---

**Status:** ✅ Fully Automatic - No Database Required
**Last Updated:** 2026-02-08
