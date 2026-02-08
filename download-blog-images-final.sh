#!/bin/bash

# Blog Images Download Script - FINAL VERSION
# Content-specific images - NO PEOPLE, NO ANIMALS
# All images focus on relevant objects, documents, and concepts

echo "📥 Downloading content-specific blog images..."

# Create directory if it doesn't exist
mkdir -p public/images/blog

# 1. Notary Cost Calculator - Money and coins
echo "Downloading notary-cost-calculator.jpg..."
curl -L "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/notary-cost-calculator.jpg

# 2. Real Estate Documents - House model with keys
echo "Downloading real-estate-documents.jpg..."
curl -L "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/real-estate-documents.jpg

# 3. Apostille Passport - Passport with stamps
echo "Downloading apostille-passport.jpg..."
curl -L "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/apostille-passport.jpg

# 4. Notary vs Agent - Professional certificate/diploma
echo "Downloading notary-signing-documents.jpg..."
curl -L "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/notary-signing-documents.jpg

# 5. Hospital Notary - Medical stethoscope and clipboard
echo "Downloading hospital-notary.jpg..."
curl -L "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/hospital-notary.jpg

# 6. Power of Attorney - Legal books and gavel
echo "Downloading power-of-attorney.jpg..."
curl -L "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/power-of-attorney.jpg

# 7. Mobile Notary - Car keys and documents (mobile service)
echo "Downloading mobile-notary-home.jpg..."
curl -L "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/mobile-notary-home.jpg

# 8. Loan Signing - House with keys on table
echo "Downloading loan-signing.jpg..."
curl -L "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/loan-signing.jpg

echo "✅ All content-specific blog images downloaded!"
echo "Images saved to: public/images/blog/"
ls -lh public/images/blog/
