# 🚀 FMCG TenderFlow AI: Enterprise Prototype

**TenderFlow AI** is a high-impact B2B mobile application prototype designed for FMCG (Fast-Moving Consumer Goods) businesses. It solves the problem of scattered tender opportunities and labor-intensive manual drafting by using a **Closed-Loop AI Intelligence System**.

---

## 🛠️ Quick Start (Installation & Working)

### 1. Installation
This is a modern React-based web application. To run it locally:
```bash
# Clone the repository
git clone [repository-url]

# Navigate to root
cd tenderflow-ai

# Install dependencies
npm install

# Start the development server
npm start
```

### 2. Environment Configuration (Platform Independence)
The application follows the **12-Factor App** methodology for platform independence. Secrets are never hardcoded.
- **Local Setup**: Copy the `.env` file to your project root and add your Gemini API Key.
- **Production Setup**: Set the `API_KEY` environment variable in your CI/CD or hosting provider (e.g., Vercel, Netlify, AWS).
- **Code Reference**: The application accesses the key via `process.env.API_KEY`, ensuring the logic remains identical across all platforms.

### 3. Operational Workflow
1.  **Discovery**: Browse the **Tender Dashboard**. Tenders are automatically filtered based on your **Manager Profile**.
2.  **Assessment**: Open a tender to view the **Decision Risk Radar** and **Fit Score**. 
3.  **Generation**: Tap **Generate Strategy**. The AI drafts a formal response strictly following the **UWE Bristol Enterprise Template**.
4.  **Learning**: Update past tenders as **'Won'** or **'Lost'** in the Analytics tab to trigger the **AI Self-Correction Protocol**.

---

## 🧠 Core Features & Innovation

### 1. AI Suitability & Explainability
- **Fit Scoring (0-100)**: Rapid analysis using `gemini-3-flash-preview`.
- **Score Attribution Logic**: Transparency into the AI's decision-making process.
- **Authority Intelligence Layer**: Behavioral profiling of government entities.

### 2. Learning Loop & Self-Correction
- **Institutional Memory**: The system remembers historical rejection reasons.
- **Automatic Mitigation**: Future drafts explicitly strengthen sections where the company previously failed.

### 3. Enterprise Drafting
- **UWE Bristol Standards**: Strictly follows professional proposal structures for high-stakes B2B responses.

### 4. Inventory-Aware Bidding
- **Real-time Allocation**: Prevents over-bidding by checking stock before generation.

---

## 🏗️ Technical Architecture
- **Frontend**: React 19 / Tailwind CSS.
- **AI Models**: 
    - `gemini-3-flash-preview` (Risk & Scoring)
    - `gemini-3-pro-preview` (Dossier Synthesis)
- **Security**: Environment-driven `API_KEY` management via `process.env`.

---
*Developed for FMCG Enterprise Decision-Support Contexts.*
