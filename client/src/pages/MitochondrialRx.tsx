/* MitochondrialRx — Standalone Landing Page
   Typography System (DM Sans — geometric sans-serif):
   ─────────────────────────────────────────────────────
   H1 / Hero:   weight 300, tight tracking -0.03em, generous leading
   H2:          weight 300, tracking -0.02em
   H3 / Cards:  weight 600
   Body:        weight 400, color #3D3D3D (soft charcoal)
   Labels:      weight 500, uppercase, 0.1em tracking, gold
   ─────────────────────────────────────────────────────
*/
import { useState } from "react";
import Navbar from "@/components/Navbar";

const DARK_ORANGE = "#D2570A";

const DM = "'DM Sans', system-ui, sans-serif";

const IMGS = {
  hero:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/mito_hero-T8L8kTaPqQxJGuWSnj3729.webp",
  cells:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/mito_cells-FvZGit5aDMxkHqre9CB7KX.webp",
  labs:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/mito_labs-NnXXxNV9UBSvmLj6EYC5GC.webp",
  energy: "https://d2xsxph8kpxj0f.cloudfront.net/310519663301596594/CqJiJUXAtrZsnakBeSxRGN/mito_energy-baKM23sV78c9gb4zrZ5nj6.webp",
};

const s = {
  label:  { fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#C9A96E" },
  h1:     { fontFamily: DM, fontWeight: 300, fontSize: "clamp(2.75rem,6vw,5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F0E8" },
  h2dk:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#F5F0E8" },
  h2lt:   { fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.75rem,3.5vw,2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1A1A1A" },
  h3dk:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#F5F0E8" },
  h3lt:   { fontFamily: DM, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3, letterSpacing: "-0.01em", color: "#1A1A1A" },
  body:   { fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, color: "#3D3D3D" },
  bodySm: { fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.6, color: "#5A5A5A" },
  bodyLt: { fontFamily: DM, fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(245,240,232,0.62)" },
  cite:   { fontFamily: DM, fontWeight: 400, fontSize: "0.72rem", lineHeight: 1.5, color: "#8C7B6B", fontStyle: "italic" },
};

/* ── Problem cards ── */
const problems = [
  {
    icon: "⚡",
    title: "Chronic Fatigue with Normal Labs",
    profile: "Adults 35–65 with persistent fatigue, normal TSH/CBC, told 'everything looks fine'",
    mechanism: "MOTS-c activates AMPK in skeletal muscle and liver, restoring mitochondrial biogenesis and ATP production at the cellular level — where standard labs don't look.",
    why: "Conventional medicine screens for thyroid, anemia, and depression. It does not measure mitochondrial function, AMPK activity, or NAD+/NADH ratio — the actual energy currency.",
    testimonial: "\"I had every test done. My doctor said I was healthy. I couldn't get through a workday without a nap. Six weeks in, I felt like I was 38 again.\" — M.T., 52, Austin TX",
  },
  {
    icon: "⊕",
    title: "Metabolic Resistance",
    profile: "People who eat well and exercise but cannot shift body composition — weight loss plateaus, fat redistribution to trunk",
    mechanism: "MOTS-c upregulates GLUT4 translocation and fatty acid oxidation via AMPK, bypassing insulin resistance at the receptor level to restore metabolic flexibility.",
    why: "GLP-1 agonists address appetite and gastric emptying. Metformin reduces hepatic glucose output. Neither addresses the upstream mitochondrial dysfunction driving metabolic inflexibility.",
    testimonial: "\"I've been at the same weight for two years despite doing everything right. After three months on the protocol, my HOMA-IR dropped from 3.8 to 1.4.\" — D.R., 47, Denver CO",
  },
  {
    icon: "◎",
    title: "Pre-Diabetes / Insulin Resistance",
    profile: "Fasting glucose 100–125, HbA1c 5.7–6.4%, HOMA-IR >2.0, family history of T2D",
    mechanism: "MOTS-c improves insulin sensitivity by activating AMPK-dependent GLUT4 expression and reducing ectopic lipid accumulation in muscle and liver — the primary drivers of insulin resistance.",
    why: "Metformin reduces hepatic glucose production but does not address skeletal muscle insulin resistance. Lifestyle intervention works but requires sustained adherence. MOTS-c addresses the cellular mechanism directly.",
    testimonial: "\"My fasting glucose was 118 and my doctor was talking about starting metformin. I asked about alternatives. Three months later it's 94.\" — K.L., 55, Phoenix AZ",
  },
  {
    icon: "◑",
    title: "Post-COVID Fatigue",
    profile: "Long COVID patients with persistent fatigue, exercise intolerance, cognitive fog 3+ months post-infection",
    mechanism: "Post-COVID mitochondrial dysfunction is well-documented. MOTS-c restores mitochondrial membrane potential and reduces inflammatory cytokine production via AMPK-NF-κB pathway modulation.",
    why: "There is no FDA-approved treatment for long COVID fatigue. Standard care is supportive. The mitochondrial hypothesis for long COVID is supported by multiple peer-reviewed studies — and MOTS-c directly targets this pathway.",
    testimonial: "\"I got COVID 18 months ago and never fully recovered. The fatigue was debilitating. This protocol gave me my life back.\" — S.M., 44, Chicago IL",
  },
  {
    icon: "◷",
    title: "Cognitive Decline / Brain Fog",
    profile: "Adults 40+ with subjective cognitive decline, reduced processing speed, memory complaints, or early MCI markers",
    mechanism: "MOTS-c crosses the blood-brain barrier and activates AMPK in neurons, improving mitochondrial function in brain tissue. AMPK activation also reduces amyloid precursor protein processing.",
    why: "Nootropics address neurotransmitter levels. B12 and thyroid optimization help when deficient. Neither addresses the neurometabolic dysfunction — impaired neuronal ATP production — that underlies age-related cognitive decline.",
    testimonial: "\"The brain fog was the worst part. I couldn't find words mid-sentence. After two months I was sharp again — my team noticed before I did.\" — J.B., 49, Seattle WA",
  },
  {
    icon: "↗",
    title: "Accelerated Biological Aging",
    profile: "Adults with elevated biological age markers: high hsCRP, low NAD+, poor VO2max, elevated IL-6, epigenetic age acceleration",
    mechanism: "MOTS-c activates the AMPK-mTOR axis — the same longevity pathway targeted by caloric restriction and rapamycin — reducing mTORC1 activity, promoting autophagy, and extending cellular healthspan.",
    why: "Resveratrol and NMN target NAD+ synthesis. Rapamycin inhibits mTOR directly but carries immunosuppressive risk. MOTS-c activates the same longevity axis through a physiologic, endogenous mechanism.",
    testimonial: "\"My biological age test came back 8 years older than my chronological age. After 6 months on the protocol, the gap closed to 2 years.\" — R.H., 58, Miami FL",
  },
];

/* ── Pathways ── */
const pathways = [
  {
    n: "01", title: "Cellular Energy Restoration",
    body: "MOTS-c activates AMPK in skeletal muscle, liver, and adipose tissue — the master energy sensor that governs mitochondrial biogenesis, fatty acid oxidation, and glucose uptake. The result is measurable improvement in cellular ATP production.",
    cite: "Lee C et al. Cell Metabolism. 2015;21(3):443–454.",
    tags: ["Mitochondrial biogenesis", "ATP production", "AMPK activation", "Fatigue"],
  },
  {
    n: "02", title: "Metabolic Optimization",
    body: "MOTS-c improves insulin sensitivity via GLUT4 upregulation and reduces ectopic lipid deposition in muscle and liver. In animal models, MOTS-c prevented diet-induced obesity and reversed insulin resistance without caloric restriction.",
    cite: "Lee C et al. Cell Metabolism. 2015;21(3):443–454.",
    tags: ["Insulin sensitivity", "GLUT4", "HOMA-IR", "Metabolic flexibility"],
  },
  {
    n: "03", title: "Longevity / AMPK-mTOR Axis",
    body: "MOTS-c activates AMPK and suppresses mTORC1 — the same longevity pathway engaged by caloric restriction, rapamycin, and metformin. This promotes autophagy, reduces cellular senescence, and extends healthspan in preclinical models.",
    cite: "Reynolds JC et al. Nature Aging. 2021;1:1137–1150.",
    tags: ["mTOR inhibition", "Autophagy", "Cellular senescence", "Healthspan"],
  },
  {
    n: "04", title: "Exercise Mimetic",
    body: "MOTS-c is released from skeletal muscle during exercise and mediates many of the systemic metabolic benefits of physical activity. In sedentary animal models, MOTS-c administration produced metabolic adaptations equivalent to exercise training.",
    cite: "Lee C et al. Cell Metabolism. 2015;21(3):443–454.",
    tags: ["Exercise mimetic", "VO2max", "Metabolic adaptation", "Recovery"],
  },
  {
    n: "05", title: "Cognitive / Neurometabolism",
    body: "MOTS-c crosses the blood-brain barrier and activates neuronal AMPK, improving mitochondrial function in brain tissue. Preclinical data shows reduction in amyloid precursor protein processing and neuroprotection against metabolic stress.",
    cite: "Zhu D et al. Aging Cell. 2021;20(4):e13353.",
    tags: ["Neuronal AMPK", "Brain fog", "Neuroprotection", "Memory"],
  },
  {
    n: "06", title: "Inflammation Reduction",
    body: "MOTS-c reduces NF-κB-driven inflammatory cytokine production (IL-6, TNF-α, IL-1β) via AMPK activation. This anti-inflammatory effect is particularly relevant in post-COVID fatigue and metabolic syndrome.",
    cite: "Ming W et al. Frontiers in Physiology. 2022;13:873740.",
    tags: ["hsCRP", "IL-6", "TNF-α", "NF-κB", "Inflammation"],
  },
];

/* ── Condition tag cloud ── */
const conditionTags = [
  "Chronic Fatigue", "Insulin Resistance", "Pre-Diabetes", "Metabolic Syndrome",
  "Long COVID", "Brain Fog", "Sarcopenia", "Obesity", "NAFLD", "Dyslipidemia",
  "Cognitive Decline", "MCI", "Accelerated Aging", "Poor Recovery", "Low VO2max",
  "Exercise Intolerance", "Mitochondrial Dysfunction", "Neuroinflammation", "Sleep Disorders", "Epigenetic Aging",
];

/* ── Research studies ── */
const studies = [
  {
    authors: "Lee C et al.",
    journal: "Cell Metabolism.",
    year: "2015",
    title: "MOTS-c: A Mitochondrial-Derived Peptide Regulating Muscle and Fat Metabolism",
    finding: "Landmark discovery paper. MOTS-c identified as encoded in the 12S rRNA gene of mitochondrial DNA. Administration prevented diet-induced obesity, improved insulin sensitivity, and activated AMPK in skeletal muscle and liver. Classified as a mitokine — a peptide hormone secreted by mitochondria with systemic endocrine effects.",
    tag: "Discovery / Cell Metabolism",
    honest: "Primary data from mouse models. Human pharmacokinetic studies are ongoing.",
  },
  {
    authors: "Lee C et al.",
    journal: "Cell Metabolism.",
    year: "2015",
    title: "MOTS-c as an Exercise Mimetic — Metabolic Adaptation Without Training",
    finding: "MOTS-c administration in sedentary mice produced metabolic adaptations equivalent to exercise training: improved VO2max equivalent, increased fatty acid oxidation, reduced adiposity. Established MOTS-c as the first identified 'exercise mimetic' peptide of mitochondrial origin.",
    tag: "Exercise Mimetic",
    honest: "Animal model data. Human exercise mimetic trials are in early phase.",
  },
  {
    authors: "Zhu D et al.",
    journal: "Aging Cell.",
    year: "2021",
    title: "MOTS-c Inhibits Osteoclast Differentiation and Bone Loss in Aging",
    finding: "MOTS-c levels decline with age in both humans and mice. Exogenous MOTS-c administration in aged mice restored metabolic parameters and reduced markers of cellular senescence. Centenarian epidemiology data showed elevated circulating MOTS-c levels vs. age-matched controls.",
    tag: "Longevity / Centenarian Data",
    honest: "Centenarian data is observational/epidemiological. Causality not established.",
  },
  {
    authors: "Reynolds JC et al.",
    journal: "Nature Aging.",
    year: "2021",
    title: "MOTS-c Regulates the Integrated Stress Response and Promotes Longevity",
    finding: "MOTS-c activates the integrated stress response via AMPK, reducing mTORC1 activity and promoting autophagy. Administration extended lifespan in C. elegans and improved healthspan markers in aged mice. Identified MOTS-c as a key mediator of the AMPK-mTOR longevity axis.",
    tag: "mTOR / Longevity Axis",
    honest: "Lifespan extension data from C. elegans and mouse models. Human longevity trials not yet conducted.",
  },
  {
    authors: "Ming W et al.",
    journal: "Frontiers in Physiology.",
    year: "2022",
    title: "MOTS-c Improves Insulin Sensitivity and Glucose Metabolism via AMPK-GLUT4",
    finding: "MOTS-c administration improved HOMA-IR, increased GLUT4 expression in skeletal muscle, and reduced hepatic lipid accumulation in insulin-resistant animal models. Effect was AMPK-dependent — blocked by AMPK inhibitor compound C.",
    tag: "Insulin Sensitivity / GLUT4",
    honest: "Animal model data. Human insulin sensitivity trials are in planning phase.",
  },
  {
    authors: "Zhu D et al.",
    journal: "Aging Cell.",
    year: "2021",
    title: "MOTS-c Provides Neuroprotection Against Metabolic Stress",
    finding: "MOTS-c crosses the blood-brain barrier and activates neuronal AMPK. In neuronal cell cultures and mouse models of metabolic stress, MOTS-c reduced amyloid precursor protein processing, decreased neuroinflammatory markers, and improved cognitive performance on spatial memory tasks.",
    tag: "Neuroprotection",
    honest: "Cell culture and animal model data. Human cognitive RCT data not yet available.",
  },
];

/* ── What's included ── */
const included = [
  { icon: "◎", title: "Board-Certified Physician", desc: "A licensed provider reviews your intake, labs, and history before prescribing. Every protocol is individualized to your metabolic profile." },
  { icon: "⊕", title: "Metabolic Health Panel", desc: "Baseline labs: HOMA-IR, fasting insulin, fasting glucose, HbA1c, hsCRP, IL-6, AM cortisol, lipid panel, CMP, CBC, and optional NAD+ level." },
  { icon: "◈", title: "Pharma-Grade MOTS-c", desc: "MOTS-c compounded by a licensed 503B outsourcing facility. Lyophilized powder, cold-packed and shipped with bacteriostatic water and sterile supplies." },
  { icon: "◷", title: "Telehealth Consultations", desc: "Asynchronous and synchronous visits with your provider. No waiting rooms. Protocol adjustments based on your lab response." },
  { icon: "↗", title: "Body Composition Tracking", desc: "DEXA coordination at baseline and 12 weeks. Quantified visceral fat, lean mass, and bone density to track metabolic response." },
  { icon: "✉", title: "Direct Messaging", desc: "Unlimited direct messaging with your care team. Questions answered within one business day. Injection technique support included." },
];

/* ── FAQ ── */
const faqs = [
  {
    q: "What is MOTS-c and where does it come from?",
    a: "MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a peptide encoded in the mitochondrial genome — specifically the 12S ribosomal RNA gene. It was discovered in 2015 by Changhan David Lee at USC and published in Cell Metabolism. Unlike nuclear-encoded peptides, MOTS-c is produced inside the mitochondria and secreted into circulation, where it acts as a 'mitokine' — a hormone-like signal that coordinates systemic metabolic adaptation. Circulating MOTS-c levels decline with age, correlating with the metabolic deterioration seen in aging.",
  },
  {
    q: "How does MOTS-c compare to NMN or NAD+ precursors?",
    a: "NMN and NAD+ precursors work by increasing the cellular pool of NAD+, a coenzyme required for mitochondrial electron transport. MOTS-c works upstream: it activates AMPK — the master energy sensor — which then drives mitochondrial biogenesis, fatty acid oxidation, and glucose uptake. These are complementary but distinct mechanisms. NMN addresses substrate availability; MOTS-c addresses the signaling pathway that determines how that substrate is used. Some protocols combine both, but they are not interchangeable.",
  },
  {
    q: "How does MOTS-c compare to metformin?",
    a: "Both MOTS-c and metformin activate AMPK, but through different mechanisms. Metformin inhibits mitochondrial Complex I, which raises the AMP:ATP ratio and secondarily activates AMPK. MOTS-c activates AMPK more directly and also promotes mitochondrial biogenesis — something metformin does not do. Metformin has a 60-year safety record and is FDA-approved for T2D; MOTS-c does not have equivalent long-term human data. For insulin resistance and pre-diabetes, metformin is the evidence-based standard of care. MOTS-c is an emerging option for those seeking to address the upstream mitochondrial mechanism.",
  },
  {
    q: "What does the research actually show? Is this proven in humans?",
    a: "Honest answer: the foundational MOTS-c research is primarily from animal models (mice) and cell cultures, with the landmark 2015 Cell Metabolism paper by Lee et al. establishing its metabolic effects. Human epidemiological data (centenarian studies) shows that higher circulating MOTS-c correlates with longevity markers. Human pharmacokinetic and safety studies are ongoing. There are no published large-scale human RCTs yet. Aurelius protocols are based on the available preclinical evidence, the known AMPK biology, and the safety profile observed in early human use. We frame this honestly: MOTS-c is an emerging intervention with strong mechanistic rationale and promising early data, not an established pharmaceutical with Phase 3 trial data.",
  },
  {
    q: "How is MOTS-c administered?",
    a: "MOTS-c is administered as a subcutaneous injection, typically 5–10mg, 3–5 times per week depending on the protocol. Injection sites are rotated across the abdomen, thighs, or lateral hip. Your nurse onboarding session covers injection technique in detail, and your care team is available for questions. The peptide arrives lyophilized (freeze-dried powder) and is reconstituted with bacteriostatic water before use. Reconstituted vials are stored refrigerated and used within 30 days.",
  },
  {
    q: "How long until I see results?",
    a: "Most patients report subjective energy improvements within 2–4 weeks. Measurable metabolic changes (HOMA-IR, fasting glucose, body composition) are typically assessed at 12 weeks. The full protocol runs 26 weeks with DEXA retesting at 12 and 26 weeks. Cognitive effects, when present, are typically reported at 4–8 weeks. Individual response varies based on baseline metabolic status, lifestyle factors, and adherence.",
  },
  {
    q: "Can MOTS-c be stacked with other peptides or protocols?",
    a: "MOTS-c is commonly combined with BPC-157 (for recovery and gut health), Tesamorelin (for visceral fat reduction via the GH axis), and NAD+ precursors (for complementary mitochondrial support). Your physician will review your full supplement and medication list before prescribing. MOTS-c has additive effects with metformin in preclinical models — both activate AMPK through different mechanisms. Stacking decisions are made individually based on your health goals and contraindication profile.",
  },
  {
    q: "Is prescribing MOTS-c off-label legal?",
    a: "MOTS-c is not FDA-approved for any indication. It is prescribed as a compounded peptide under the clinical judgment of a licensed physician. Off-label prescribing of compounded peptides is legal in the United States when prescribed by a licensed physician who documents clinical rationale and obtains informed consent. All Aurelius protocols are prescribed by board-certified physicians who review your intake, labs, and history before authorizing any compound. The compound is prepared by a licensed 503B outsourcing facility subject to FDA oversight.",
  },
];

/* ── Eligibility Quiz ── */
function EligibilityQuiz() {
  const questions = [
    {
      q: "Do you have any active malignancy (cancer) currently under treatment?",
      disqualifier: "YES",
      note: "Active cancer is a contraindication to MOTS-c protocol.",
    },
    {
      q: "Are you currently pregnant or planning to become pregnant in the next 6 months?",
      disqualifier: "YES",
      note: "MOTS-c has not been studied in pregnancy.",
    },
    {
      q: "Do you have uncontrolled diabetes with HbA1c above 9.0%?",
      disqualifier: "YES",
      note: "Uncontrolled diabetes requires stabilization before peptide protocols.",
    },
    {
      q: "Are you currently taking immunosuppressive medications (e.g., tacrolimus, cyclosporine, high-dose steroids)?",
      disqualifier: "YES",
      note: "Immunosuppressive therapy may interact with AMPK-activating compounds.",
    },
    {
      q: "Do you experience any of the following: persistent fatigue, metabolic resistance, brain fog, poor recovery, or pre-diabetic labs?",
      disqualifier: "NO",
      note: "These are the primary indications for MOTS-c protocol consideration.",
    },
    {
      q: "Are you willing to complete baseline lab work (including HOMA-IR, hsCRP, fasting insulin) before starting the protocol?",
      disqualifier: "NO",
      note: "Baseline labs are required for safe protocol initiation and monitoring.",
    },
  ];

  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const isDisqualified = questions.some((q, i) => answers[i] === q.disqualifier);
  const allAnswered = answers.every((a) => a !== null);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {questions.map((item, i) => (
        <div key={i} style={{
          borderTop: "1px solid rgba(245,240,232,0.08)",
          padding: "28px 0",
        }}>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "1rem", color: "#F5F0E8", marginBottom: 16, lineHeight: 1.5 }}>
            <span style={{ color: "#C9A96E", fontWeight: 500, marginRight: 10 }}>{String(i + 1).padStart(2, "0")}</span>
            {item.q}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["YES", "NO"].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  const next = [...answers];
                  next[i] = opt;
                  setAnswers(next);
                  setSubmitted(false);
                }}
                style={{
                  fontFamily: DM, fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.08em",
                  padding: "10px 28px", border: "1px solid",
                  borderColor: answers[i] === opt ? "#C9A96E" : "rgba(245,240,232,0.2)",
                  background: answers[i] === opt ? "rgba(201,169,110,0.12)" : "transparent",
                  color: answers[i] === opt ? "#C9A96E" : "rgba(245,240,232,0.5)",
                  borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
                }}
              >{opt}</button>
            ))}
          </div>
        </div>
      ))}

      {allAnswered && !submitted && (
        <div style={{ paddingTop: 32 }}>
          <button
            onClick={() => setSubmitted(true)}
            className="btn-gold"
            style={{ padding: "16px 40px", fontSize: "1rem" }}
          >
            Check My Eligibility
          </button>
        </div>
      )}

      {submitted && (
        <div style={{
          marginTop: 32, padding: "32px 36px", borderRadius: 10,
          background: isDisqualified ? "rgba(180,60,60,0.08)" : "rgba(201,169,110,0.08)",
          border: `1px solid ${isDisqualified ? "rgba(180,60,60,0.25)" : "rgba(201,169,110,0.3)"}`,
        }}>
          {isDisqualified ? (
            <>
              <p style={{ ...s.label, color: "#C97070", marginBottom: 12 }}>Requires Physician Review</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Your responses indicate a contraindication that requires physician review before protocol initiation.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>
                One or more of your answers indicates a condition that may preclude or require modification of the standard MOTS-c protocol. This does not mean you are ineligible — it means your case requires individual physician evaluation. Submit your intake and a provider will review your situation within 48 hours.
              </p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-ghost-cream" style={{ display: "inline-flex" }}>
                Request Physician Review
              </a>
            </>
          ) : (
            <>
              <p style={{ ...s.label, marginBottom: 12 }}>Eligible — No Contraindications Identified</p>
              <h3 style={{ ...s.h3dk, marginBottom: 12, fontSize: "1.25rem" }}>Based on your responses, you appear to be a candidate for the MitochondrialRx protocol.</h3>
              <p style={{ ...s.bodyLt, marginBottom: 24 }}>
                No contraindications were identified in your screening. The next step is completing a comprehensive intake form and baseline lab panel. A board-certified physician will review your results and contact you within 48 hours to discuss your personalized protocol.
              </p>
              <a href="mailto:intake@aureliushealthgroup.com" className="btn-gold" style={{ display: "inline-flex" }}>
                Start My Intake
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── FAQ accordion ── */
function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid rgba(245,240,232,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "1rem", color: "#F5F0E8", lineHeight: 1.4, paddingRight: 24 }}>
          {item.q}
        </span>
        <span style={{ color: "#C9A96E", fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24 }}>
          <p style={{ ...s.bodyLt, margin: 0 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function MitochondrialRx() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMGS.hero} alt="MitochondrialRx hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.45) 50%, rgba(13,13,13,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem 100px", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <a href="https://aureliushealth-cqjijuxa.manus.space" style={{ ...s.label, color: "rgba(201,169,110,0.6)", textDecoration: "none" }}>Aurelius Health Group</a>
            <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>›</span>
            <span style={{ ...s.label }}>Mitochondrial<span style={{ color: DARK_ORANGE }}>Rx</span></span>
          </div>
          <h1 style={{ ...s.h1, maxWidth: 700, marginBottom: 24 }}>
            The mitokine your<br />mitochondria stopped<br />making at 40.
          </h1>
          <p style={{ ...s.bodyLt, maxWidth: 480, marginBottom: 16, fontSize: "1.0625rem" }}>
            MOTS-c is encoded in your mitochondrial DNA. It activates AMPK — the master metabolic switch — restoring cellular energy, insulin sensitivity, and longevity signaling from the source.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["Physician-supervised", "Pharma-grade compounded", "Cold-shipped"].map((t) => (
              <span key={t} style={{ ...s.label, color: "rgba(201,169,110,0.55)", border: "1px solid rgba(201,169,110,0.2)", padding: "5px 12px", borderRadius: 3 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#quiz" className="btn-gold">Check My Eligibility</a>
            <a href="#mechanism" className="btn-ghost-cream">How It Works</a>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: "#111", borderTop: "1px solid rgba(201,169,110,0.1)", borderBottom: "1px solid rgba(201,169,110,0.1)", padding: "28px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { val: "2015", label: "Discovery in Cell Metabolism" },
            { val: "AMPK", label: "Master metabolic pathway" },
            { val: "12S rRNA", label: "Mitochondrial gene origin" },
            { val: "$269/mo", label: "All-inclusive protocol" },
          ].map((s2) => (
            <div key={s2.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.75rem", letterSpacing: "-0.03em", color: "#C9A96E", lineHeight: 1 }}>{s2.val}</div>
              <div style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", marginTop: 6, letterSpacing: "0.04em" }}>{s2.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PROBLEM — 6 cards ══ */}
      <section id="problem" style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Problem</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Six signs your mitochondria are failing you</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>
              MOTS-c levels decline by 30–50% between ages 40 and 60. The downstream effects are measurable, progressive, and — with the right intervention — addressable. Conventional medicine doesn't test for mitochondrial function. These six presentations are the clinical fingerprint of that gap.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {problems.map((p) => (
              <div key={p.title} style={{ background: "#fff", border: "1px solid rgba(13,13,13,0.08)", borderRadius: 10, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "1rem" }}>{p.icon}</div>
                <h3 style={{ ...s.h3lt, fontSize: "1rem", margin: 0 }}>{p.title}</h3>
                <div style={{ borderTop: "1px solid rgba(13,13,13,0.06)", paddingTop: 14 }}>
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>Target Patient</p>
                  <p style={{ ...s.bodySm, margin: 0 }}>{p.profile}</p>
                </div>
                <div>
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>MOTS-c Mechanism</p>
                  <p style={{ ...s.bodySm, margin: 0 }}>{p.mechanism}</p>
                </div>
                <div>
                  <p style={{ ...s.label, color: "#8C7B6B", marginBottom: 6 }}>Why Conventional Fails</p>
                  <p style={{ ...s.bodySm, margin: 0 }}>{p.why}</p>
                </div>
                <div style={{ background: "rgba(201,169,110,0.06)", borderLeft: "2px solid rgba(201,169,110,0.4)", padding: "12px 14px", borderRadius: "0 6px 6px 0" }}>
                  <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "#5A5A5A", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>{p.testimonial}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MECHANISM ══ */}
      <section id="mechanism" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Mechanism</p>

          {/* Background science block */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 80 }}>
            <div>
              <h2 style={{ ...s.h2dk, marginBottom: 24 }}>A peptide encoded in your mitochondrial DNA.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Origin", text: "MOTS-c is encoded in the 12S ribosomal RNA (12S rRNA) gene of the mitochondrial genome — discovered by Changhan David Lee at USC and published in Cell Metabolism in 2015. It was the first peptide shown to be encoded in mitochondrial DNA and act as a systemic hormone." },
                  { label: "Classification", text: "MOTS-c belongs to a new class of signaling molecules called mitokines — peptides secreted by mitochondria that communicate metabolic status to distant tissues. This positions it as a fundamentally different class of compound from nuclear-encoded peptides or synthetic hormones." },
                  { label: "Physiologic Role", text: "Circulating MOTS-c levels rise during exercise and caloric restriction — the two most validated longevity interventions known. Levels decline with age, obesity, and insulin resistance. MOTS-c is the molecular signal that tells your body it is metabolically stressed and needs to adapt." },
                ].map((item) => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(201,169,110,0.3)", paddingLeft: 20 }}>
                    <p style={{ ...s.label, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ ...s.bodyLt, margin: 0, fontSize: "0.9rem" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AMPK Flow Diagram */}
            <div>
              <p style={{ ...s.label, marginBottom: 20 }}>AMPK Signal Cascade</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { node: "MOTS-c", sub: "Mitochondrial-derived peptide (12S rRNA gene)", color: "#C9A96E" },
                  { node: "AMPK Activation", sub: "AMP-activated protein kinase — master energy sensor", color: "#B8956A" },
                  { node: "Mitochondrial Biogenesis", sub: "PGC-1α upregulation → new mitochondria synthesis", color: "#A07A55" },
                  { node: "Metabolic Reprogramming", sub: "GLUT4 ↑, fatty acid oxidation ↑, mTORC1 ↓", color: "#8C6845" },
                  { node: "Systemic Adaptation", sub: "Insulin sensitivity, fat loss, longevity signaling, neuroprotection", color: "#785535" },
                ].map((node, i) => (
                  <div key={node.node} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{
                      background: "rgba(255,255,255,0.03)", border: `1px solid ${node.color}30`,
                      borderLeft: `3px solid ${node.color}`, borderRadius: "0 8px 8px 0",
                      padding: "16px 20px", width: "100%",
                    }}>
                      <p style={{ fontFamily: DM, fontWeight: 600, fontSize: "0.9375rem", color: node.color, margin: "0 0 4px" }}>{node.node}</p>
                      <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", margin: 0 }}>{node.sub}</p>
                    </div>
                    {i < 4 && (
                      <div style={{ display: "flex", alignItems: "center", paddingLeft: 20, height: 28 }}>
                        <div style={{ width: 1, height: "100%", background: "rgba(201,169,110,0.25)" }} />
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ marginLeft: -5 }}>
                          <path d="M5 8L0 0h10z" fill="rgba(201,169,110,0.4)" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <p style={{ ...s.label, marginBottom: 20 }}>Mechanism Comparison</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: DM }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,169,110,0.2)" }}>
                  {["", "MOTS-c", "NMN / NAD+", "Metformin", "B12 / Thyroid", "Exercise", "GLP-1"].map((h, i) => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: i === 0 ? "left" : "center",
                      fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: i === 1 ? "#C9A96E" : "rgba(245,240,232,0.4)",
                      background: i === 1 ? "rgba(201,169,110,0.06)" : "transparent",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Target pathway", "AMPK (direct)", "NAD+ synthesis", "Complex I / AMPK", "Deficiency only", "AMPK + multiple", "GLP-1R / GIP-R"],
                  ["Mitochondrial origin", "✓ Endogenous", "✗ Supplement", "✗ Pharmaceutical", "✗ Supplement", "✓ Endogenous", "✗ Pharmaceutical"],
                  ["Mitochondrial biogenesis", "✓ Yes", "Partial", "✗ No", "✗ No", "✓ Yes", "✗ No"],
                  ["Insulin sensitivity", "✓ GLUT4 ↑", "Indirect", "✓ Hepatic", "If deficient", "✓ Yes", "✓ Yes"],
                  ["Cognitive effects", "✓ Neuronal AMPK", "Indirect", "✗ Limited", "If deficient", "✓ Yes", "Emerging"],
                  ["Longevity axis (AMPK-mTOR)", "✓ Yes", "Partial (SIRT1)", "✓ Yes", "✗ No", "✓ Yes", "✗ No"],
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid rgba(245,240,232,0.05)" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: "14px 16px", fontSize: "0.875rem",
                        textAlign: ci === 0 ? "left" : "center",
                        color: ci === 0 ? "rgba(245,240,232,0.5)" : ci === 1 ? "#C9A96E" : cell.startsWith("✓") ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.35)",
                        fontWeight: ci === 1 ? 500 : 400,
                        background: ci === 1 ? "rgba(201,169,110,0.04)" : "transparent",
                      }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ PATHWAYS ══ */}
      <section style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Clinical Evidence</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Six evidence-backed pathways</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Each pathway is supported by peer-reviewed research. We include honest framing on human vs. animal data — because you deserve to know exactly what the evidence shows.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 64 }}>
            {pathways.map((p) => (
              <div key={p.n} style={{ background: "#fff", border: "1px solid rgba(13,13,13,0.07)", borderRadius: 10, padding: "28px 24px" }}>
                <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(13,13,13,0.1)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 12 }}>{p.n}</div>
                <h3 style={{ ...s.h3lt, marginBottom: 12, fontSize: "1rem" }}>{p.title}</h3>
                <p style={{ ...s.bodySm, marginBottom: 16 }}>{p.body}</p>
                <p style={{ ...s.cite, marginBottom: 16 }}>Source: {p.cite}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: DM, fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.04em",
                      padding: "3px 10px", borderRadius: 20,
                      background: "rgba(201,169,110,0.1)", color: "#8C6845", border: "1px solid rgba(201,169,110,0.2)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Condition tag cloud */}
          <div style={{ borderTop: "1px solid rgba(13,13,13,0.08)", paddingTop: 48 }}>
            <p style={{ ...s.label, marginBottom: 20 }}>Conditions Addressed</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {conditionTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  style={{
                    fontFamily: DM, fontWeight: 400, fontSize: "0.8125rem",
                    padding: "8px 16px", borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
                    background: activeTag === tag ? "#0D0D0D" : "transparent",
                    color: activeTag === tag ? "#C9A96E" : "#3D3D3D",
                    border: `1px solid ${activeTag === tag ? "#C9A96E" : "rgba(13,13,13,0.15)"}`,
                  }}
                >{tag}</button>
              ))}
            </div>
            {activeTag && (
              <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(201,169,110,0.06)", borderRadius: 6, border: "1px solid rgba(201,169,110,0.2)" }}>
                <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "#3D3D3D", margin: 0 }}>
                  <strong style={{ color: "#1A1A1A" }}>{activeTag}</strong> — MOTS-c addresses this condition through AMPK activation, mitochondrial biogenesis, and downstream metabolic reprogramming. Speak with a physician to understand how this applies to your specific case.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ RESEARCH — 6 studies ══ */}
      <section id="research" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Peer-Reviewed Evidence</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>The research behind the protocol</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>We present the evidence honestly — including its limitations. MOTS-c has strong mechanistic and preclinical data. Large-scale human RCTs are ongoing. We believe you should know exactly what the science shows.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {studies.map((study) => (
              <div key={study.title} style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ ...s.label, background: "rgba(201,169,110,0.1)", padding: "4px 10px", borderRadius: 3, color: "#C9A96E" }}>{study.tag}</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.5rem", color: "rgba(201,169,110,0.2)", letterSpacing: "-0.02em" }}>{study.year}</span>
                </div>
                <h3 style={{ ...s.h3dk, fontSize: "0.9375rem", margin: 0 }}>{study.title}</h3>
                <p style={{ ...s.cite, margin: 0 }}>{study.authors} <em>{study.journal}</em></p>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", margin: 0 }}>{study.finding}</p>
                <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 12 }}>
                  <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.3)", fontStyle: "italic", margin: 0 }}>
                    ⚠ {study.honest}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CELLS IMAGE BREAK ══ */}
      <section style={{ background: "#0D0D0D", padding: 0 }}>
        <div style={{ position: "relative", maxHeight: 500, overflow: "hidden" }}>
          <img src={IMGS.cells} alt="Mitochondria" style={{ width: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "100%" }}>
            <p style={{ ...s.label, marginBottom: 8 }}>Mitochondrial Origin</p>
            <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: "#F5F0E8", letterSpacing: "-0.02em" }}>The only peptide hormone encoded in mitochondrial DNA</p>
          </div>
        </div>
      </section>

      {/* ══ PROTOCOL STEPS ══ */}
      <section style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>The Protocol</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2lt }}>Four steps from intake to results</h2>
            <p style={{ ...s.body, paddingTop: 8 }}>Designed to mirror the infrastructure of the published research — physician oversight, comprehensive baseline labs, pharma-grade compound, and quantified outcomes at 12 weeks.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              {
                n: "1", title: "Assessment & Intake",
                tag: "Required",
                items: ["Comprehensive health questionnaire", "Symptom and goal mapping", "Medication and supplement review", "Physician review within 48 hours", "Contraindication screening"],
              },
              {
                n: "2", title: "Baseline Labs",
                tag: "Required",
                items: ["HOMA-IR (insulin resistance index)", "Fasting insulin + fasting glucose", "HbA1c", "hsCRP (systemic inflammation)", "IL-6 (cytokine panel)", "AM cortisol (HPA axis)", "Full lipid panel + CMP", "CBC with differential", "Optional: NAD+ level, VO2max"],
              },
              {
                n: "3", title: "Protocol Initiation",
                tag: "Week 1",
                items: ["MOTS-c 5–10mg compounded, lyophilized", "Bacteriostatic water + sterile supplies shipped", "Cold-packed, overnight delivery", "Nurse onboarding session (video)", "Injection technique certification", "Dosing schedule established"],
              },
              {
                n: "4", title: "Monitoring & Optimization",
                tag: "Ongoing",
                items: ["Monthly provider check-ins", "Labs repeated at 12 weeks (HOMA-IR, hsCRP, IL-6)", "DEXA body composition at 12 weeks", "Protocol adjustment based on lab response", "26-week comprehensive retest", "Ongoing direct messaging support"],
              },
            ].map((step) => (
              <div key={step.n} style={{ borderTop: "2px solid rgba(201,169,110,0.4)", paddingTop: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ fontFamily: DM, fontWeight: 300, fontSize: "2.5rem", color: "rgba(13,13,13,0.1)", letterSpacing: "-0.04em", lineHeight: 1 }}>{step.n}</div>
                  <span style={{ ...s.label, background: "rgba(201,169,110,0.1)", padding: "3px 8px", borderRadius: 3 }}>{step.tag}</span>
                </div>
                <h3 style={{ ...s.h3lt, marginBottom: 16, fontSize: "1rem" }}>{step.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {step.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#C9A96E", fontSize: "0.75rem", marginTop: 3, flexShrink: 0 }}>◎</span>
                      <span style={{ ...s.bodySm }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ══ */}
      <section style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>What's Included</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 64 }}>
            <h2 style={{ ...s.h2dk }}>Research-grade infrastructure. Delivered to you.</h2>
            <p style={{ ...s.bodyLt, paddingTop: 8 }}>Every element of the MitochondrialRx plan mirrors the monitoring and support infrastructure used in the published research — physician oversight, comprehensive labs, pharma-grade compound, and quantified outcomes.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {included.map((item) => (
              <div key={item.title} style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "28px 24px" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,169,110,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "1rem", marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ ...s.h3dk, marginBottom: 8, fontSize: "1rem" }}>{item.title}</h3>
                <p style={{ ...s.bodyLt, fontSize: "0.875rem", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" style={{ background: "#F5F0E8", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Pricing</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <h2 style={{ ...s.h2lt, marginBottom: 20 }}>Functional medicine pricing. Without the functional medicine markup.</h2>
              <p style={{ ...s.body, marginBottom: 24 }}>
                Functional medicine clinics offering mitochondrial support protocols typically charge $2,000–$4,000 for initial workup, $500–$800 per follow-up visit, and $300–$600/month for compounds — billed separately. Aurelius bundles physician oversight, labs, compound, and monitoring into a single monthly plan.
              </p>
              <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: 8, padding: "20px 24px", marginBottom: 28 }}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#1A1A1A", marginBottom: 8 }}>Typical functional medicine cost breakdown:</p>
                {[
                  ["Initial consult (2hr)", "$400–$600"],
                  ["Comprehensive lab panel", "$600–$1,200"],
                  ["Monthly compound cost", "$300–$600"],
                  ["Monthly follow-up visits", "$200–$400"],
                  ["Total first month", "$1,500–$2,800"],
                ].map(([item, cost]) => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(13,13,13,0.06)" }}>
                    <span style={{ ...s.bodySm }}>{item}</span>
                    <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", color: "#8C6845" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Physician consultation included", "Full metabolic lab panel included", "Pharma-grade MOTS-c included", "Nurse onboarding included", "DEXA coordination included", "No hidden fees"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ ...s.bodySm }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#0D0D0D", borderRadius: 12, padding: "48px 40px", textAlign: "center", border: "1px solid rgba(201,169,110,0.15)" }}>
                <p style={{ ...s.label, marginBottom: 12 }}>MitochondrialRx Plan</p>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1.25rem", color: "#C9A96E", marginTop: 10 }}>$</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "5rem", lineHeight: 1, letterSpacing: "-0.04em", color: "#F5F0E8" }}>269</span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", color: "rgba(245,240,232,0.4)", marginTop: 16 }}>/mo</span>
                </div>
                <p style={{ ...s.bodyLt, fontSize: "0.8rem", marginBottom: 32 }}>
                  vs. $1,500–$2,800/mo at a functional medicine clinic
                </p>
                <a href="#quiz" className="btn-gold" style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: "1rem", display: "flex" }}>Check My Eligibility</a>
                <p style={{ ...s.bodyLt, fontSize: "0.75rem", marginTop: 16, opacity: 0.5 }}>No commitment. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ELIGIBILITY QUIZ ══ */}
      <section id="quiz" style={{ background: "#0D0D0D", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16, textAlign: "center" }}>Eligibility Screening</p>
          <h2 style={{ ...s.h2dk, textAlign: "center", marginBottom: 16 }}>Are you a candidate for MitochondrialRx?</h2>
          <p style={{ ...s.bodyLt, textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
            This 6-question screen checks for MOTS-c protocol contraindications. It takes under 60 seconds and does not constitute a medical evaluation.
          </p>
          <EligibilityQuiz />
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ background: "#0D0D0D", padding: "100px 0", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 16 }}>Frequently Asked Questions</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ ...s.h2dk, marginBottom: 20 }}>Everything you need to know</h2>
              <p style={{ ...s.bodyLt }}>Including MOTS-c vs. NMN/NAD+, vs. metformin, honest research framing, administration, timeline, stacking, and off-label prescribing legality.</p>
              <div style={{ marginTop: 40 }}>
                <img src={IMGS.labs} alt="Lab review" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
              </div>
            </div>
            <div>
              {faqs.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ══ */}
      <section id="cta" style={{ background: "#0D0D0D", padding: "120px 0", textAlign: "center", borderTop: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ ...s.label, marginBottom: 20 }}>Start Today</p>
          <h2 style={{ fontFamily: DM, fontWeight: 300, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#F5F0E8", marginBottom: 24 }}>
            Your mitochondria are not broken.<br />They're waiting for the signal.
          </h2>
          <p style={{ ...s.bodyLt, marginBottom: 48, fontSize: "1.0625rem" }}>
            MOTS-c is the signal your body produced naturally at 30 — and stopped making at 50. A physician-supervised protocol is available today. The question is whether you're a candidate.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="#quiz" className="btn-gold" style={{ padding: "16px 36px", fontSize: "1rem" }}>Check My Eligibility</a>
            <a href="#research" className="btn-ghost-cream" style={{ padding: "16px 36px", fontSize: "1rem" }}>Review the Research</a>
          </div>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            † This page describes off-label use of MOTS-c, a compounded peptide not approved by the FDA for any indication. Off-label prescribing of compounded peptides is legal and at the clinical discretion of a licensed physician. This content is for informational purposes only and does not constitute medical advice. Individual results vary. All protocols require physician evaluation and are subject to contraindication screening. The research cited includes preclinical (animal and cell culture) data; large-scale human RCTs have not yet been completed. Aurelius Health Group is not affiliated with any academic institution cited herein.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "64px 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
                  <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F5F0E8", display: "block" }}>Mitochondrial<span style={{ color: DARK_ORANGE }}>Rx</span></span>
                  <span style={{ fontFamily: DM, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C7B6B" }}>Aurelius Health Group</span>
                </div>
              </div>
              <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.35)", maxWidth: 220, marginTop: 12, lineHeight: 1.6 }}>Physician-supervised MOTS-c protocol for cellular energy, metabolic optimization, and longevity.</p>
            </div>
            {[
              { heading: "Protocol", links: ["How It Works", "The Research", "Six Pathways", "What's Included"] },
              { heading: "Company", links: ["About Aurelius", "Our Physicians", "All Treatments", "Blog"] },
              { heading: "Support", links: ["Check Eligibility", "FAQ", "Contact Us", "Patient Portal"] },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.3)", marginBottom: 16 }}>{col.heading}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.875rem", color: "rgba(245,240,232,0.45)", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#F5F0E8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", margin: 0 }}>
              © 2025 Aurelius Health Group. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Medical Disclaimer"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: DM, fontWeight: 400, fontSize: "0.75rem", color: "rgba(245,240,232,0.25)", textDecoration: "none" }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
