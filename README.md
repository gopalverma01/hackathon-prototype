# ♻ GreenPass – AI-Powered E-Waste Reverse Supply Chain

> **Turning India’s informal e-waste sector into a safe, fair, and traceable digital network**



## 📌 About the Project

**GreenPass** is an **AI-powered reverse supply chain** connecting **Citizens → Kabadiwalas → Recyclers** in a **safe, profitable, and traceable way**.

⚠ **Note:** This repository contains a **prototype** version.  
The prototype demonstrates the workflow; the README describes the **full vision**.

---

## ❌ Problem

India generates **3.2 million+ tonnes** of e-waste annually, and:

- 90% is handled informally by kabadiwalas without safety measures
- Profits are inconsistent and unfair
- OEMs have **no traceable EPR compliance proof**
- Unsafe battery disposal causes **fires & pollution**

---

## ✅ The GreenPass Solution

**Snap → Price → Pickup → Traceability**

1. 📸 **Citizen** uploads e-waste photo via PWA or WhatsApp bot
2. 🤖 **AI Model** detects category, brand & condition
3. 💰 **Pricing Engine** calculates market scrap value (shows 0.75× to customer for profit margin)
4. 🚚 **Kabadiwala** picks up, performs safety check & adds to lot
5. 🏭 **Recyclers** bid in real time → winner gets a **digital manifest**
6. 📜 **Citizen** receives a **GreenPass QR** with recycling proof & CO₂ saved

---

## 🧠 How AI Detection & Pricing Works *(Full Vision)*

### 1️⃣ Image Classification
- **TensorFlow.js (MobileNet)** – Instant detection in browser
- **Tesseract.js OCR** – Extracts brand/model text

### 2️⃣ Pricing Engine

DetectedPrice = BasePrice × ConditionFactor × DemandFactor
CustomerPrice = DetectedPrice × 0.75


**Example:**  
Laptop → Base ₹1000 × ConditionFactor 1.1 = ₹1100 market value  
Customer sees ₹825 → Margin left for kabadiwala & recycler

---

## 🖥 Prototype Workflow (Implemented)

**Citizen:** Snap photo → See price → Book pickup  
**Kabadiwala:** Pickup → Safety check → Add to lot  
**Recycler:** View lots → Place bids → Win lot  
**Citizen:** Scan QR → View recycling proof

---

## 🛠 Tech Stack

**Frontend:** React / Next.js PWA, WhatsApp Bot  
**Backend:** Node.js / NestJS, PostgreSQL, AWS S3, WebSockets  
**AI:** TensorFlow.js, Tesseract.js, Rule-based battery safety detection  
**Other Tools:** Razorpay, Mapbox, QR Code generation

---

## 📦 Installation (Prototype)

```bash
# Clone the repo
git clone https://github.com/your-username/greenpass.git
cd greenpass

# Install dependencies
npm install

# Run locally
npm run dev
```
## This runs the prototype version. AI features and backend  mentioned above are part of the future roadmap.

Impact Goals (Full Vision)

♻ Recycle thousands of tonnes annually

💵 Direct & instant payouts to kabadiwalas

🌱 Trackable CO₂ savings for every citizen

📜 Verifiable EPR compliance for OEMs
