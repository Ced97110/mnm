#!/bin/bash

# Blog Images Download Script
# Downloads royalty-free images from Unsplash for blog posts

echo "📥 Downloading blog images..."

# Create directory if it doesn't exist
mkdir -p public/images/blog

# Image URLs from Unsplash (1200x630 optimized for web)
# Note: Replace these IDs with actual image IDs from Unsplash

# 1. Notary Cost Calculator
echo "Downloading notary-cost-calculator.jpg..."
curl -L "https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/notary-cost-calculator.jpg

# 2. Real Estate Documents
echo "Downloading real-estate-documents.jpg..."
curl -L "https://images.pexels.com/photos/8962686/pexels-photo-8962686.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" \
  -o public/images/blog/real-estate-documents.jpg

# 3. Apostille Passport
echo "Downloading apostille-passport.jpg..."
curl -L "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/apostille-passport.jpg

# 4. Notary Signing Documents
echo "Downloading notary-signing-documents.jpg..."
curl -L "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/notary-signing-documents.jpg

# 5. Hospital Notary
echo "Downloading hospital-notary.jpg..."
curl -L "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/hospital-notary.jpg

# 6. Power of Attorney
echo "Downloading power-of-attorney.jpg..."
curl -L "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/power-of-attorney.jpg

# 7. Mobile Notary Home
echo "Downloading mobile-notary-home.jpg..."
curl -L "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" \
  -o public/images/blog/mobile-notary-home.jpg

# 8. Loan Signing
echo "Downloading loan-signing.jpg..."
curl -L "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" \
  -o public/images/blog/loan-signing.jpg

echo "✅ All blog images downloaded successfully!"
echo "Images saved to: public/images/blog/"
ls -lh public/images/blog/
