# 🚨 URGENT: Secure Your Twilio Account First!

## ⚠️ Your Credentials Were Exposed

You shared credentials publicly. **Take these steps immediately:**

---

## 🔒 Step 1: Rotate Credentials (Do This NOW!)

### **Go to Twilio Console:**
1. Visit: https://console.twilio.com
2. Go to **API Keys & Tokens**
3. Find the key starting with `SK9e30d2c6...`
4. Click **Delete**
5. Create a new API Key
6. Copy the new SID and Secret
7. Update `.env.local` with new credentials

**Why?** Anyone who saw this chat can now send SMS using your account and charge you money!

---

## 🔒 Step 2: Check Your OpenAI Key Too

I noticed you also have an OpenAI API key in `.env.local`:
```
OPENAI_API_KEY=sk-proj-ZCg_DAlojZvPPmBP3h...
```

**If this file was ever committed to git or shared:**
1. Go to: https://platform.openai.com/api-keys
2. Delete this key
3. Create a new one
4. Update `.env.local`

---

## ✅ Step 3: Proper Twilio Setup

### **What You Need:**

1. **Account SID** or **API Key SID** (you have API Key)
2. **Auth Token** or **API Key Secret** (you have secret)
3. **Twilio Phone Number** (you need to add this!)

---

## 📱 Getting Your Twilio Phone Number

### **If You Don't Have One Yet:**

1. **Go to Twilio Console:**
   ```
   https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
   ```

2. **Click "Buy a Number"**
   - Search for local number (510 area code recommended)
   - Cost: $1/month
   - Click "Buy"

3. **Copy Your Number:**
   ```
   Example: +15105551234
   ```

4. **Add to `.env.local`:**
   ```env
   TWILIO_PHONE_NUMBER=+15105551234
   ```

---

## 🔧 Complete Configuration

### **Your `.env.local` should have:**

```env
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=SK_your_new_api_key_sid_here
TWILIO_AUTH_TOKEN=your_new_api_secret_here
TWILIO_PHONE_NUMBER=+15105551234

# (Your other keys below...)
```

**Important:**
- Use your NEW credentials (after rotation)
- Phone number must include +1 for US numbers
- Never commit `.env.local` to git

---

## 🧪 Testing

### **Test SMS Sending:**

1. **Start dev server:**
   ```bash
   cd /Users/ced/Desktop/mnm/app
   npm run dev
   ```

2. **Visit:**
   ```
   http://localhost:3000/admin/send-sms
   ```

3. **Enter YOUR phone number**
4. **Click Send**
5. **Check your phone** - should get text!

---

## 🔒 Security Best Practices

### **DO:**
✅ Keep `.env.local` in `.gitignore` (already there)
✅ Use environment variables for all secrets
✅ Rotate credentials if exposed
✅ Use API Keys instead of Account SID (more secure)
✅ Set up Twilio webhook signature verification

### **DON'T:**
❌ Share credentials in chat/messages
❌ Commit `.env.local` to git
❌ Hardcode credentials in code
❌ Share screenshot of credentials
❌ Store credentials in unsecured notes

---

## 📊 Checking Twilio Dashboard

### **After Setup, Monitor:**

1. **Usage:**
   ```
   Console → Monitor → Usage
   See SMS sent, costs incurred
   ```

2. **Logs:**
   ```
   Console → Monitor → Logs → Messaging
   See delivery status, errors
   ```

3. **Balance:**
   ```
   Console → Billing
   Check remaining credit
   ```

---

## 💰 Cost Monitoring

### **Set Up Alerts:**

1. Go to: Console → Billing → Alerts
2. Set alert at $10 (or your comfort level)
3. Get email when threshold hit
4. Prevents surprise charges

---

## 🚀 Next Steps (After Securing Account)

1. **Rotate credentials** (URGENT!)
2. **Get phone number** (if you don't have one)
3. **Update `.env.local`** with new credentials
4. **Test SMS sending** at `/admin/send-sms`
5. **Use after appointments!**

---

## 🆘 Troubleshooting

### **"Authentication error"**
- Check Account SID/API Key is correct
- Check Auth Token/Secret is correct
- Make sure they match (both from same key)

### **"Invalid phone number"**
- Must start with +1 for US numbers
- Example: +15105551234
- No spaces, dashes, or parentheses

### **"Message not delivered"**
- Check Twilio logs for details
- Verify client's number is correct
- Make sure you have account credit

---

## ✅ Security Checklist

Before using in production:

- [ ] Rotated exposed API credentials
- [ ] `.env.local` is in `.gitignore`
- [ ] Never committed credentials to git
- [ ] Set up Twilio usage alerts
- [ ] Tested SMS sending works
- [ ] Phone number added to config

---

**IMPORTANT:** Rotate those credentials NOW before continuing!

---

**Last Updated:** 2026-02-08
