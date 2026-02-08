#!/bin/bash

# Blog Images Download Script - NO PEOPLE VERSION
# Downloads royalty-free images from Unsplash focusing on objects, documents, and concepts

echo "📥 Downloading blog images (no people)..."

# Create directory if it doesn't exist
mkdir -p public/images/blog

# Image URLs from Unsplash (1200x630 optimized for web)
# All images focus on objects, documents, and concepts - NO PEOPLE

# 1. Notary Cost Calculator - Calculator and money
echo "Downloading notary-cost-calculator.jpg..."
curl -L "https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/notary-cost-calculator.jpg

# 2. Real Estate Documents - House keys and documents
echo "Downloading real-estate-documents.jpg..."
curl -L "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/real-estate-documents.jpg

# 3. Apostille Passport - US Passport close-up
echo "Downloading apostille-passport.jpg..."
curl -L "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/apostille-passport.jpg

# 4. Notary Signing Documents - Legal documents and pen
echo "Downloading notary-signing-documents.jpg..."
curl -L "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/notary-signing-documents.jpg

# 5. Hospital Notary - Hospital building exterior
echo "Downloading hospital-notary.jpg..."
curl -L "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/hospital-notary.jpg

# 6. Power of Attorney - Legal gavel and documents
echo "Downloading power-of-attorney.jpg..."
curl -L "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/power-of-attorney.jpg

# 7. Mobile Notary Home - Modern home office desk
echo "Downloading mobile-notary-home.jpg..."
curl -L "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/mobile-notary-home.jpg

# 8. Loan Signing - House with sold sign
echo "Downloading loan-signing.jpg..."
curl -L "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80" \
  -o public/images/blog/loan-signing.jpg

echo "✅ All blog images downloaded successfully (NO PEOPLE)!"
echo "Images saved to: public/images/blog/"
ls -lh public/images/blog/
