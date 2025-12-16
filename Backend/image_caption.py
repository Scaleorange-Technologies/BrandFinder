'''import easyocr
import os
from google.generativeai import configure, GenerativeModel

# ─── Configuration ─────────────────────────────────────────────────────────────
GEMINI_API_KEY = "AIzaSyAoUqbb1Pt0KthdQkyzZ6duOMgZ9Vysh3I"
configure(api_key=GEMINI_API_KEY)
gemini = GenerativeModel("models/gemini-2.5-flash")

reader = easyocr.Reader(['en'])

# ─── OCR Text Extraction ───────────────────────────────────────────────────────
def extract_text(image_path):
    results = reader.readtext(image_path, detail=0)
    extracted_text = " ".join(results).strip()
    return extracted_text

# ─── LLM: Extract Grocery Product & Detailed Category ──────────────────────────
def extract_grocery_from_text_llm(raw_text):
    prompt = f"""
You are an expert grocery product identifier and classifier.

The following text has been extracted from an image that contains a grocery item or grocery product packaging:

\"\"\"{raw_text}\"\"\"

Your task:
1. Identify any grocery-related product name(s) in the text.
2. For each identified product, classify it into one of the following broad grocery categories and also specify a detailed sub-category:

Broad categories and sub-categories:
- personal care: soaps, face wash, shampoo, toothpaste, deodorant, skincare
- snack: chips, biscuits, cookies, namkeen
- beverage: juice, soda, tea, coffee, energy drink
- breakfast cereal: oats, corn flakes, muesli
- dairy: milk, butter, cheese, yogurt
- dry fruits: almonds, cashews, walnuts, raisins
- packaged food: noodles, pasta, sauces, ready-to-eat meals
- cleaning supplies: detergent, dishwash liquid, floor cleaner
- cooking essentials: oil, spices, salt, sugar
- frozen food: frozen vegetables, frozen meat, ice cream
- vegetables / fruits: fresh vegetables, fresh fruits

Only return actual grocery product names and their sub-categories — avoid slogans, offers, weights, quantities, or marketing descriptions.

✅ Output format:
product_name: broad_category > sub_category

If no grocery items are detected, return:
No grocery items detected.
"""
    try:
        response = gemini.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("❌ Gemini API Error:", e)
        return ""

# ─── Gemini Brand Detection ─────────────────────────────────────────────────────
def detect_brand_from_text(raw_text):
    prompt = f"""
You are a brand recognition expert.

From the following OCR-extracted text:
\"\"\"{raw_text}\"\"\"

Identify only the main **brand name** (e.g., Santoor, Colgate, Dettol, etc.). 
Do NOT include slogans, product descriptions, or extra words.

✅ Output format:
Brand: <brand_name>

If no brand is confidently identified, return:
Brand: Not detected
"""
    try:
        response = gemini.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("❌ Gemini Brand Detection Error:", e)
        return "Brand: Error"

# ─── Extract Queries from Gemini Output ────────────────────────────────────────
def extract_product_queries(response_text):
    lines = response_text.splitlines()
    queries = []
    for line in lines:
        if ":" in line:
            product, category = line.split(":", 1)
            # Remove the '>' character and extra spaces to make a clean search query
            clean_category = category.replace(">", "").strip()
            query = f"{product.strip()} {clean_category}"
            queries.append(query)
    return queries

# ─── Main Pipeline ─────────────────────────────────────────────────────────────
def main(image_path):
    print(f"\n📷 Processing image: {image_path}")
    
    raw_text = extract_text(image_path)
    print(f"🧾 Extracted OCR Text:\n{raw_text}")

    grocery_response = extract_grocery_from_text_llm(raw_text)
    print(f"🛒 Gemini Product Output:\n{grocery_response}")

    brand_response = detect_brand_from_text(raw_text)
    print(f"🏷️ Detected Brand:\n{brand_response}")

# ─── Entry Point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    image_path = "Image_1.jpeg"  # Replace this with your actual image path
    main(image_path)'''






import easyocr
import os
from google.generativeai import configure, GenerativeModel

# ─── Configuration ─────────────────────────────────────────────────────────────
GEMINI_API_KEY = "AIzaSyAoUqbb1Pt0KthdQkyzZ6duOMgZ9Vysh3I"
configure(api_key=GEMINI_API_KEY)
gemini = GenerativeModel("models/gemini-2.5-flash")

reader = easyocr.Reader(['en'])

# ─── OCR Text Extraction ───────────────────────────────────────────────────────
def extract_text(image_path):
    results = reader.readtext(image_path, detail=0)
    extracted_text = " ".join(results).strip()
    return extracted_text

# ─── LLM: Extract Grocery Product & Detailed Category ──────────────────────────
def extract_grocery_from_text_llm(raw_text):
    prompt = f"""
You are an expert grocery product identifier and classifier.

The following text has been extracted from an image that contains a grocery item or grocery product packaging:

\"\"\"{raw_text}\"\"\"

Your task:
1. Identify any grocery-related product name(s) in the text.
2. For each identified product, classify it into one of the following broad grocery categories and also specify a detailed sub-category:

Broad categories and sub-categories:
- personal care: soaps, face wash, shampoo, toothpaste, deodorant, skincare
- snack: chips, biscuits, cookies, namkeen
- beverage: juice, soda, tea, coffee, energy drink
- breakfast cereal: oats, corn flakes, muesli
- dairy: milk, butter, cheese, yogurt
- dry fruits: almonds, cashews, walnuts, raisins
- packaged food: noodles, pasta, sauces, ready-to-eat meals
- cleaning supplies: detergent, dishwash liquid, floor cleaner
- cooking essentials: oil, spices, salt, sugar
- frozen food: frozen vegetables, frozen meat, ice cream
- vegetables / fruits: fresh vegetables, fresh fruits

Only return actual grocery product names and their sub-categories — avoid slogans, offers, weights, quantities, or marketing descriptions.

✅ Output format:
product_name: broad_category > sub_category

If no grocery items are detected, return:
No grocery items detected.
"""
    try:
        response = gemini.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("❌ Gemini API Error:", e)
        return ""

# ─── Gemini Brand Detection ─────────────────────────────────────────────────────
def detect_brand_from_text(raw_text):
    prompt = f"""
You are a brand recognition expert.

From the following OCR-extracted text:
\"\"\"{raw_text}\"\"\"

Identify only the main **brand name** (e.g., Santoor, Colgate, Dettol, etc.). 
Do NOT include slogans, product descriptions, or extra words.

✅ Output format:
Brand: <brand_name>

If no brand is confidently identified, return:
Brand: Not detected
"""
    try:
        response = gemini.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("❌ Gemini Brand Detection Error:", e)
        return "Brand: Error"

# ─── Gemini-based Brand Name Auto-correction ────────────────────────────────────
def correct_brand_with_gemini(detected_brand):
    prefix = "Brand: "
    if detected_brand.startswith(prefix):
        brand_name = detected_brand[len(prefix):].strip()
    else:
        brand_name = detected_brand.strip()
    
    if brand_name in ["Not detected", "Error", ""]:
        return detected_brand  # No brand detected or error
    
    prompt = f"""
You are a brand verification and correction expert.

The detected brand name extracted from an OCR image is:
\"\"\"{brand_name}\"\"\"

Please check if this brand name looks correct or if it contains any spelling or OCR errors.

- If you think the brand name is incorrect, provide the most likely corrected brand name.
- If the brand name appears to be correct or if you cannot determine a better version, just reply with the original brand name.

Output format:
Corrected Brand: <corrected_brand_name_or_original>
"""
    try:
        response = gemini.generate_content(prompt)
        corrected_text = response.text.strip()
        # Expect output like: Corrected Brand: Cadbury
        if corrected_text.lower().startswith("corrected brand:"):
            corrected_brand = corrected_text[len("corrected brand:"):].strip()
            return f"Brand: {corrected_brand}"
        else:
            # Unexpected format, return original detected brand
            return detected_brand
    except Exception as e:
        print("❌ Gemini brand correction error:", e)
        return detected_brand

# ─── Extract Queries from Gemini Output ────────────────────────────────────────
def extract_product_queries(response_text):
    lines = response_text.splitlines()
    queries = []
    for line in lines:
        if ":" in line:
            product, category = line.split(":", 1)
            clean_category = category.replace(">", "").strip()
            query = f"{product.strip()} {clean_category}"
            queries.append(query)
    return queries

# ─── Main Pipeline ─────────────────────────────────────────────────────────────
def main(image_path):
    print(f"\n📷 Processing image: {image_path}")
    
    raw_text = extract_text(image_path)
    print(f"🧾 Extracted OCR Text:\n{raw_text}")

    grocery_response = extract_grocery_from_text_llm(raw_text)
    print(f"🛒 Gemini Product Output:\n{grocery_response}")

    brand_response = detect_brand_from_text(raw_text)
    print(f"🏷️ Detected Brand:\n{brand_response}")

    corrected_brand = correct_brand_with_gemini(brand_response)
    print(f"🏷️ Corrected Brand (after process):\n{corrected_brand}")

# ─── Entry Point ───────────────────────────────────────────────────────────────
# if __name__ == "__main__":
#     image_path = "ironbox.webp"  # Replace this with your actual image path
#     main(image_path)
if __name__ == "__main__":
    import sys
    image_path = sys.argv[1]
    result = main(image_path)
    



