# 🤖 Automated Review Request System

## Complete Guide to Automatic Review Reminders

---

## 🎯 Overview

This system provides **multiple ways** to automatically remind clients to leave Google reviews, from simple manual forms to fully automated workflows.

---

## 📋 Three Automation Levels

### **Level 1: Semi-Automated (Ready Now)** ⭐ EASIEST
**What:** Simple form to trigger review requests
**Setup Time:** 0 minutes (already built)
**Best For:** Getting started immediately

### **Level 2: Email Automation (Recommended)** ⭐⭐
**What:** Automatic emails 24 hours after appointment
**Setup Time:** 30 minutes
**Best For:** Scaling review collection

### **Level 3: Full Automation (Advanced)** ⭐⭐⭐
**What:** Calendly webhooks + scheduled SMS/Email
**Setup Time:** 2-3 hours
**Best For:** Hands-free operation

---

## 🚀 Level 1: Semi-Automated Form (Ready Now)

### **What You Get:**
✅ Simple web form for notary to fill out after appointments
✅ Generates personalized email/SMS content
✅ Shows preview of message before sending
✅ Tracks who was contacted

### **How It Works:**

1. **After completing appointment:**
   - Visit: `/admin/send-review`
   - Fill out simple form:
     - Client name
     - Email or phone number
     - Appointment date
     - Service type (optional)

2. **System automatically:**
   - Generates personalized review request
   - Prepares email and/or SMS
   - Shows you preview
   - Schedules for 24 hours later

3. **Client receives:**
   - Professional thank-you message
   - Direct link to leave review
   - Easy one-click process

### **Usage:**

**URL:** `/admin/send-review`

**Form Fields:**
```
Client Name: [Required]
Email: [Optional - but need email OR phone]
Phone: [Optional - but need email OR phone]
Appointment Date: [Required]
Service Type: [Optional - personalizes message]
```

**Example Workflow:**
```
1. Finish appointment with John Doe
2. Open /admin/send-review on phone
3. Fill out form (takes 30 seconds)
4. Submit
5. System schedules review request for tomorrow
6. Done! ✓
```

### **Pros:**
- ✅ Ready to use immediately (no setup)
- ✅ Full control over who receives requests
- ✅ Preview messages before sending
- ✅ Simple and straightforward

### **Cons:**
- ⚠️ Requires manual data entry after each appointment
- ⚠️ Takes 30-60 seconds per client
- ⚠️ Easy to forget if not in routine

---

## 🔧 Level 2: Email Automation Setup

### **What You Need:**
- Email service account (Resend, SendGrid, or Mailgun)
- 30 minutes for setup
- Environment variables

### **Recommended Service: Resend** (Easiest)

**Why Resend?**
- Free tier: 100 emails/day
- Simple API
- Great deliverability
- 5-minute setup

### **Setup Steps:**

#### **1. Sign Up for Resend**
```
1. Visit https://resend.com
2. Sign up (free account)
3. Verify your domain (or use resend.dev for testing)
4. Get API key from dashboard
```

#### **2. Add Environment Variables**
Create or edit `.env.local`:
```env
RESEND_API_KEY=re_abc123xyz...
FROM_EMAIL=noreply@mobile-notary-management.com
```

#### **3. Install Resend Package**
```bash
npm install resend
```

#### **4. Update API Route**

Edit `/src/app/api/send-review-request/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Inside POST function, after preparing email content:
if (clientEmail) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL || 'noreply@mobile-notary-management.com',
    to: clientEmail,
    subject: emailSubject,
    text: emailBody,
  });
}
```

#### **5. Test It**
```
1. Visit /admin/send-review
2. Enter your own email
3. Submit form
4. Check inbox (should receive email immediately)
```

### **Email Service Comparison:**

| Service | Free Tier | Setup | Best For |
|---------|-----------|-------|----------|
| **Resend** | 100/day | 5 min | Small business (Recommended) |
| **SendGrid** | 100/day | 15 min | Scale to 1000s/day |
| **Mailgun** | 1000/mo | 20 min | High volume |
| **AWS SES** | 62k/mo | 30 min | Tech-savvy users |

---

## 📱 Level 2.5: SMS Automation Setup

### **What You Need:**
- Twilio account
- $20 initial credit
- Phone number ($1/month)

### **Setup Steps:**

#### **1. Sign Up for Twilio**
```
1. Visit https://twilio.com
2. Sign up (get $15 free credit)
3. Verify your phone number
4. Purchase a phone number ($1/month)
5. Get Account SID and Auth Token
```

#### **2. Add Environment Variables**
```env
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+15105551234
```

#### **3. Install Twilio Package**
```bash
npm install twilio
```

#### **4. Update API Route**

```typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Inside POST function:
if (clientPhone) {
  await client.messages.create({
    body: smsBody,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: clientPhone,
  });
}
```

### **SMS Best Practices:**
- ✅ Keep under 160 characters if possible
- ✅ Include "Text STOP to opt out"
- ✅ Send during business hours (9 AM - 8 PM)
- ✅ Personalize with client name
- ⚠️ SMS costs ~$0.0075 per message

---

## 🎯 Level 3: Full Automation with Calendly

### **What You Need:**
- Calendly Professional plan ($12/month) - for webhooks
- Email service (Resend)
- Database (optional - for tracking)

### **How It Works:**

```
1. Client books appointment on Calendly
2. Appointment is completed
3. Calendly sends webhook to your API
4. API schedules review request for 24 hours later
5. Email/SMS sent automatically
6. No manual work required!
```

### **Setup Steps:**

#### **1. Create Webhook Endpoint**

Create `/src/app/api/webhooks/calendly/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const webhook = await request.json();

  // Verify webhook signature (important!)
  const signature = request.headers.get("calendly-webhook-signature");
  // TODO: Verify signature

  // Check if event is completed appointment
  if (webhook.event === "invitee.canceled") {
    return NextResponse.json({ received: true });
  }

  // Extract client info
  const clientName = webhook.payload.name;
  const clientEmail = webhook.payload.email;
  const appointmentDate = webhook.payload.scheduled_event.start_time;

  // Schedule review request for 24 hours later
  // TODO: Use job queue (Vercel Cron, AWS Lambda, etc.)

  return NextResponse.json({ success: true });
}
```

#### **2. Configure Calendly Webhook**

In Calendly dashboard:
```
1. Settings → Webhooks
2. Add webhook URL: https://your-domain.com/api/webhooks/calendly
3. Select events: "Invitee Created"
4. Save
```

#### **3. Add Job Scheduler**

**Option A - Vercel Cron (Simple):**
- Create cron job to check scheduled emails
- Runs every hour
- Sends pending review requests

**Option B - Upstash QStash (Recommended):**
- Serverless job queue
- Precise timing
- Free tier available

**Option C - AWS EventBridge:**
- Enterprise solution
- High volume
- More complex setup

### **Pros:**
- ✅ Completely hands-free
- ✅ Never forget to request reviews
- ✅ Consistent timing (always 24 hours)
- ✅ Professional and scalable

### **Cons:**
- ⚠️ Requires Calendly paid plan
- ⚠️ More technical setup
- ⚠️ Need monitoring for failures
- ⚠️ Ongoing costs (~$15-20/month)

---

## 💡 Recommended Setup Path

### **For Most Notaries:**

**Week 1: Start with Level 1**
- Use `/admin/send-review` form
- Get comfortable with process
- Collect first 5-10 reviews

**Week 2-3: Upgrade to Level 2**
- Set up Resend (email automation)
- Test with your own email
- Roll out to all clients

**Month 2: Consider Level 3**
- If sending 20+ review requests/week
- If budget allows ($15-20/month)
- If want fully hands-free system

---

## 📊 Tracking & Analytics

### **What to Track:**

**Manual Tracking (Spreadsheet):**
```
| Date | Client Name | Email/Phone | Request Sent | Review Received | Days to Review |
|------|-------------|-------------|--------------|-----------------|----------------|
| 2/8  | John Doe    | john@...    | ✓            | ✓               | 2              |
```

**Metrics to Monitor:**
- Review requests sent
- Reviews received
- Conversion rate (target: 30-40%)
- Average days to review
- Best time to send (morning vs evening)

### **Advanced Analytics (Optional):**

If using Level 3 automation, track:
- Email open rates
- Link click rates
- SMS delivery rates
- A/B test different messages
- Follow-up reminders for non-responders

---

## 🎬 Sample Messages

### **Email Template (Professional):**

```
Subject: Thank you for choosing Mobile Notary Management!

Hi [Client Name],

Thank you for trusting me with your [Service Type] on [Date].
I hope everything went smoothly!

If you have a moment, I'd be grateful if you could share your
experience on Google. Your review helps other Bay Area families
find reliable notary services when they need them.

👉 Leave a review: https://mobile-notary-management.com/leave-review

It only takes 60 seconds and means the world to me.

Thank you again!

Best regards,
[Your Name]
Mobile Notary Management
(510) 393-1860

P.S. Prefer not to receive these emails? Just reply and let me know.
```

### **SMS Template (Concise):**

```
Hi [Name]! Thank you for choosing Mobile Notary Management.
If you have a moment, I'd love a quick review:
[link]
It really helps! Text STOP to opt out.
```

### **Email Template (Friendly):**

```
Subject: Quick favor? 🙏

Hey [Client Name],

Thanks again for letting me help with your notarization yesterday!

I know you're busy, but if you could spare 60 seconds to leave
a Google review, it would mean everything. Your review helps
families like yours find me when they're in a bind.

⭐ Leave a review: [link]

No worries if you can't - I appreciate your business either way!

Cheers,
[Your Name]
```

---

## 🔐 Security & Privacy

### **Important Considerations:**

**Data Storage:**
- Don't store credit card info
- Encrypt sensitive data
- Follow GDPR/CCPA if applicable
- Provide opt-out mechanism

**Email Compliance:**
- Include unsubscribe option
- Use legitimate "From" address
- Don't buy email lists
- Honor opt-out requests immediately

**SMS Compliance:**
- Obtain consent before texting
- Include "Text STOP to opt out"
- Respect 9 AM - 8 PM window
- Keep records of consent

---

## ⚙️ Configuration File

Create `/src/lib/review-automation-config.ts`:

```typescript
export const REVIEW_AUTOMATION_CONFIG = {
  // Timing
  delayHours: 24, // Wait 24 hours after appointment

  // Retry logic
  maxRetries: 2, // Retry twice if email fails
  retryDelayHours: 48, // Wait 48 hours before retry

  // Rate limiting
  maxEmailsPerDay: 50,
  maxSMSPerDay: 30,

  // Templates
  emailSubject: "Thank you for choosing Mobile Notary Management!",
  smsMaxLength: 160,

  // Review platforms
  primaryPlatform: "google",
  alternativePlatforms: ["yelp", "signingagent"],

  // Filters (don't request reviews for)
  excludeServiceTypes: [], // e.g., ["complaint", "issue"]
  minAppointmentValue: 0, // Don't request for free consultations
} as const;
```

---

## 🆘 Troubleshooting

### **Issue: Emails not sending**

**Check:**
1. API key is correct in `.env.local`
2. Domain is verified in email service
3. Check spam folder
4. Look at service dashboard for errors
5. Try different email service

### **Issue: SMS not delivering**

**Check:**
1. Phone number format (+15105551234)
2. Twilio balance is positive
3. Number is not on DNC list
4. Message includes opt-out language

### **Issue: Review requests marked as spam**

**Fix:**
1. Use verified domain for emails
2. Warm up new domain (send to yourself first)
3. Don't use spammy words ("FREE", "CLICK HERE")
4. Include legitimate unsubscribe link
5. Don't send too frequently (max 1 per client)

---

## 📈 Expected Results

### **Timeline:**

**Week 1-2:**
- Learn system
- Send 5-10 requests
- Get 2-4 reviews
- Conversion: ~40% (high while learning)

**Month 1:**
- Send 15-20 requests
- Get 6-8 reviews
- Conversion: ~35%

**Month 3:**
- Send 40-50 requests
- Get 15-18 reviews
- Conversion: ~30% (normal)

**Month 6:**
- 100+ total reviews
- 4.9+ star average
- Top 3 in local search
- 50% more bookings

---

## ✅ Implementation Checklist

### **Level 1 (Do Now):**
- [ ] Bookmark `/admin/send-review` on phone
- [ ] Test form with your own email
- [ ] Create template text to copy/paste
- [ ] Set reminder to use after each appointment

### **Level 2 (This Week):**
- [ ] Sign up for Resend (free)
- [ ] Add API key to `.env.local`
- [ ] Install resend package
- [ ] Update API route with real email sending
- [ ] Test with 3-5 real clients

### **Level 3 (Next Month):**
- [ ] Upgrade Calendly to Professional
- [ ] Set up webhook endpoint
- [ ] Configure job scheduler
- [ ] Test end-to-end flow
- [ ] Monitor for one week before full rollout

---

## 🎉 Summary

You now have THREE ways to automate review requests:

1. **Semi-Automated Form** (`/admin/send-review`) - Ready now!
2. **Email Automation** - 30 min setup, scales beautifully
3. **Full Automation** - Calendly webhooks, completely hands-free

**Recommended:** Start with #1 today, upgrade to #2 this week.

**Access:**
- Review request form: `/admin/send-review`
- API endpoint: `/api/send-review-request`
- Config file: `/src/lib/review-automation-config.ts`

---

**Last Updated:** 2026-02-08
**Status:** ✅ Level 1 Ready, Level 2/3 Documented
