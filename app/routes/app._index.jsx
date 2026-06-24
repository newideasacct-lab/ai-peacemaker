import { authenticate } from "../shopify.server";
import { useState } from "react";
import {
  Page, Layout, Card, Text, Badge, Button, Banner,
  Divider, BlockStack, InlineStack, Box, Tabs,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const AGENTS = [
  { emoji: "🤖", name: "Mavrick", role: "GMC Policy & Suspension Remediation", status: "active" },
  { emoji: "💛", name: "Goldie", role: "Affiliate/Tax/Commission Ledger", status: "active" },
  { emoji: "📦", name: "Sourcing-Bot", role: "Supplier Ingestion & Normalization", status: "active" },
  { emoji: "🔍", name: "SEO-Agent", role: "Search Visibility & Meta-Data Intelligence", status: "idle" },
  { emoji: "📈", name: "Growth-Ops", role: "Marketing & Organic Traffic Generation", status: "idle" },
  { emoji: "👁️", name: "Vision-Eye", role: "Computer Vision & Image Compliance", status: "active" },
  { emoji: "🔒", name: "Shield-Bot", role: "Security/GDPR/Hard-Wipe Governance", status: "active" },
  { emoji: "💰", name: "Profit-Guard", role: "Margin Monitoring & Ad-Pause", status: "warning" },
  { emoji: "🔄", name: "Crawl-Sync", role: "Real-time Landing Page vs. Feed Sync", status: "active" },
  { emoji: "⚙️", name: "Admin-Bot", role: "Deep-link Navigation & Settings Automation", status: "idle" },
];

const NODE_CATEGORIES = [
  { label: "🧥 Apparel", nodes: [
    { id: 1, name: "Gender Attribute", status: "critical", affected: 34 },
    { id: 2, name: "Age Group Attribute", status: "warning", affected: 12 },
    { id: 3, name: "Size Normalization", status: "compliant", affected: 0 },
    { id: 4, name: "Color Standardization", status: "warning", affected: 8 },
    { id: 5, name: "Pattern Detection", status: "compliant", affected: 0 },
  ]},
  { label: "🏷️ Identifiers", nodes: [
    { id: 6, name: "GTIN Checksum", status: "critical", affected: 57 },
    { id: 7, name: "MPN Compliance", status: "warning", affected: 23 },
    { id: 8, name: "Brand Enforcement", status: "compliant", affected: 0 },
    { id: 9, name: "Identifier_Exists Flag", status: "compliant", affected: 0 },
    { id: 10, name: "ISBN Validation", status: "compliant", affected: 0 },
  ]},
  { label: "🖼️ Image Quality", nodes: [
    { id: 11, name: "Overlay Stripping", status: "critical", affected: 19 },
    { id: 12, name: "Low-Res Rescaling", status: "warning", affected: 11 },
    { id: 13, name: "Placeholder Detection", status: "critical", affected: 7 },
    { id: 14, name: "Broken Link Detection", status: "compliant", affected: 0 },
    { id: 15, name: "404/500 Crawl Error", status: "warning", affected: 3 },
  ]},
  { label: "💲 Pricing", nodes: [
    { id: 16, name: "Landing Page Price Mismatch", status: "critical", affected: 14 },
    { id: 17, name: "Invalid Sale Price", status: "compliant", affected: 0 },
    { id: 18, name: "Currency Formatting", status: "compliant", affected: 0 },
    { id: 19, name: "Price Refresh Sync", status: "warning", affected: 6 },
    { id: 20, name: "Pricing Extension (Reserved)", status: "compliant", affected: 0 },
  ]},
  { label: "📝 Content", nodes: [
    { id: 21, name: "Title Length", status: "warning", affected: 9 },
    { id: 22, name: "Title Spam Detection", status: "compliant", affected: 0 },
    { id: 23, name: "Keyword Stuffing", status: "compliant", affected: 0 },
    { id: 24, name: "All-Caps Sanitization", status: "warning", affected: 4 },
    { id: 25, name: "Description Rewrite", status: "critical", affected: 41 },
  ]},
  { label: "🚚 Shipping", nodes: [
    { id: 26, name: "Missing Weight", status: "critical", affected: 28 },
    { id: 27, name: "Missing Dimensions", status: "warning", affected: 15 },
    { id: 28, name: "Shipping Cost Auto-Calc", status: "compliant", affected: 0 },
    { id: 29, name: "Region-Based Override", status: "compliant", affected: 0 },
    { id: 30, name: "Shipping Extension (Reserved)", status: "compliant", affected: 0 },
  ]},
  { label: "🧾 Tax/Unit", nodes: [
    { id: 31, name: "Unit Price Measure", status: "compliant", affected: 0 },
    { id: 32, name: "Regional Tax Auto-Calc", status: "compliant", affected: 0 },
    { id: 33, name: "Tax Attribute Injection", status: "warning", affected: 5 },
    { id: 34, name: "Tax Extension (Reserved)", status: "compliant", affected: 0 },
    { id: 35, name: "Unit Extension (Reserved)", status: "compliant", affected: 0 },
  ]},
  { label: "🚫 Restricted", nodes: [
    { id: 36, name: "Adult Content Flag", status: "compliant", affected: 0 },
    { id: 37, name: "Counterfeit/Trademark Detection", status: "warning", affected: 2 },
    { id: 38, name: "Pharma/Weapon Hold", status: "compliant", affected: 0 },
    { id: 39, name: "Restricted Extension (Reserved)", status: "compliant", affected: 0 },
    { id: 40, name: "Restricted Extension (Reserved)", status: "compliant", affected: 0 },
  ]},
  { label: "⚙️ System Logic", nodes: [
    { id: 41, name: "SKU Duplication", status: "warning", affected: 7 },
    { id: 42, name: "Category Taxonomy Mismatch", status: "critical", affected: 22 },
    { id: 43, name: "ID Conflict Resolution", status: "compliant", affected: 0 },
    { id: 44, name: "Feed Loop Detection", status: "compliant", affected: 0 },
    { id: 45, name: "System Extension (Reserved)", status: "compliant", affected: 0 },
  ]},
  { label: "🏛️ Policy Trust", nodes: [
    { id: 46, name: "Footer Injection", status: "critical", affected: 1 },
    { id: 47, name: "Contact Verification", status: "compliant", affected: 0 },
    { id: 48, name: "Policy Page Generation", status: "warning", affected: 1 },
    { id: 49, name: "Appeal Automation", status: "compliant", affected: 0 },
    { id: 50, name: "Policy Extension (Reserved)", status: "compliant", affected: 0 },
  ]},
];

const PENDING_TASKS = [
  { title: "Fix missing GTINs", agent: "Mavrick", products: 57, risk: "critical", impact: 34 },
  { title: "Strip promotional overlays", agent: "Vision-Eye", products: 19, risk: "critical", impact: 28 },
  { title: "Rewrite missing descriptions", agent: "SEO-Agent", products: 41, risk: "high", impact: 22 },
  { title: "Inject missing shipping weights", agent: "Sourcing-Bot", products: 28, risk: "high", impact: 18 },
  { title: "Fix category taxonomy mismatches", agent: "Admin-Bot", products: 22, risk: "medium", impact: 14 },
  { title: "Resolve landing page price mismatches", agent: "Crawl-Sync", products: 14, risk: "critical", impact: 20 },
];

const BILLING_TIERS = [
  { name: "Free", price: "$0", desc: "25 products, 5 GMC fixes/day, Mavrick limited", best: false },
  { name: "Starter", price: "$39", desc: "500 products, unlimited fixes, CSV exports", best: false },
  { name: "Growth", price: "$89", desc: "2,500 products, Autopilot, full analytics", best: false },
  { name: "Pro", price: "$179", desc: "10,000 products, unlimited spy, priority support", best: false },
  { name: "Titan", price: "$249", desc: "Unlimited everything, API access, white-label, dedicated SLA", best: true },
];

function statusBadge(s) {
  if (s === "critical") return <Badge tone="critical">❌ Critical</Badge>;
  if (s === "warning") return <Badge tone="warning">⚠️ Warning</Badge>;
  return <Badge tone="success">✅ Compliant</Badge>;
}
function riskBadge(r) {
  if (r === "critical") return <Badge tone="critical">Critical</Badge>;
  if (r === "high") return <Badge tone="warning">High</Badge>;
  if (r === "medium") return <Badge tone="attention">Medium</Badge>;
  return <Badge>Low</Badge>;
}
function agentBadge(s) {
  if (s === "active") return <Badge tone="success">Active</Badge>;
  if (s === "warning") return <Badge tone="warning">Alert</Badge>;
  return <Badge tone="info">Idle</Badge>;
}

export default function Index() {
  const [tab, setTab] = useState(0);

  const tabs = [
    { id: "cmd", content: "🛡️ Command Center" },
    { id: "tools", content: "🔧 Full Toolset" },
    { id: "billing", content: "💳 Plans & Billing" },
  ];

  const allNodes = NODE_CATEGORIES.flatMap(c => c.nodes);
  const critCount = allNodes.filter(n => n.status === "critical").length;
  const warnCount = allNodes.filter(n => n.status === "warning").length;
  const health = Math.max(0, Math.round(((50 - critCount * 2 - warnCount) / 50) * 100));

  return (
    <Page title="🛡️ AI Peacemaker — Master Command Center">
      <Tabs tabs={tabs} selected={tab} onSelect={setTab} />
      <Box paddingBlockStart="400">

        {/* ── TAB 0: COMMAND CENTER ── */}
        {tab === 0 && (
          <Layout>
            <Layout.Section>
              <Banner
                title={`Global Compliance Health: ${health}% — ${critCount} Critical, ${warnCount} Warnings`}
                tone={critCount > 0 ? "critical" : warnCount > 0 ? "warning" : "success"}
              >
                <Text as="p">Mavrick and Vision-Eye are actively remediating. {PENDING_TASKS.length} tasks pending approval.</Text>
              </Banner>
            </Layout.Section>

            {/* AGENTS */}
            <Layout.Section variant="oneThird">
              <Card>
                <BlockStack gap="300">
                  <Text variant="headingMd" as="h2">🤖 Agent Ecosystem</Text>
                  <Divider />
                  {AGENTS.map((a, i) => (
                    <Box key={i} padding="200" background="bg-surface-secondary" borderRadius="200">
                      <InlineStack align="space-between" blockAlign="center">
                        <BlockStack gap="050">
                          <Text variant="bodyMd" fontWeight="bold">{a.emoji} {a.name}</Text>
                          <Text variant="bodySm" tone="subdued">{a.role}</Text>
                        </BlockStack>
                        {agentBadge(a.status)}
                      </InlineStack>
                    </Box>
                  ))}
                </BlockStack>
              </Card>
            </Layout.Section>

            {/* 50-NODE GRID */}
            <Layout.Section variant="oneThird">
              <Card>
                <BlockStack gap="300">
                  <Text variant="headingMd" as="h2">📡 50-Node GMC Diagnostic Array</Text>
                  <Divider />
                  {NODE_CATEGORIES.map((cat, ci) => (
                    <BlockStack key={ci} gap="200">
                      <Text variant="headingSm" as="h3">{cat.label}</Text>
                      {cat.nodes.map(node => (
                        <Box key={node.id} padding="150" background="bg-surface-secondary" borderRadius="200">
                          <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="050">
                              <Text variant="bodySm" fontWeight="bold">Node {node.id} — {node.name}</Text>
                              {node.affected > 0 && <Text variant="bodySm" tone="subdued">{node.affected} products affected</Text>}
                            </BlockStack>
                            <InlineStack gap="100" blockAlign="center">
                              {statusBadge(node.status)}
                              {node.status !== "compliant" && <Button size="slim" tone="critical">Fix</Button>}
                            </InlineStack>
                          </InlineStack>
                        </Box>
                      ))}
                      <Divider />
                    </BlockStack>
                  ))}
                </BlockStack>
              </Card>
            </Layout.Section>

            {/* TASK MANAGER + HEALTH */}
            <Layout.Section variant="oneThird">
              <BlockStack gap="400">
                <Card>
                  <BlockStack gap="300">
                    <Text variant="headingMd" as="h2">📋 Task Manager</Text>
                    <Divider />
                    {PENDING_TASKS.map((t, i) => (
                      <Box key={i} padding="200" background="bg-surface-secondary" borderRadius="200">
                        <BlockStack gap="150">
                          <InlineStack align="space-between">
                            <Text variant="bodyMd" fontWeight="bold">{t.title}</Text>
                            {riskBadge(t.risk)}
                          </InlineStack>
                          <Text variant="bodySm" tone="subdued">Agent: {t.agent} · {t.products} products · +{t.impact}% impact</Text>
                          <InlineStack gap="200">
                            <Button size="slim" tone="success">✅ Approve</Button>
                            <Button size="slim" tone="critical">❌ Reject</Button>
                          </InlineStack>
                        </BlockStack>
                      </Box>
                    ))}
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="300">
                    <Text variant="headingMd" as="h2">📊 Health Stats</Text>
                    <Divider />
                    <InlineStack align="space-between">
                      <Text variant="headingXl" as="h2">{health}%</Text>
                      <Badge tone={health >= 80 ? "success" : "warning"}>Compliance Score</Badge>
                    </InlineStack>
                    <Divider />
                    <InlineStack align="space-between">
                      <Text variant="bodySm">Active GMC Disapprovals:</Text>
                      <Badge tone="critical">23 Active</Badge>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text variant="bodySm">Suspension Risk:</Text>
                      <Badge tone="warning">Medium</Badge>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text variant="bodySm">Feed Parity:</Text>
                      <Badge tone="success">In Sync</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">Last sync: 4 minutes ago</Text>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Layout.Section>
          </Layout>
        )}

        {/* ── TAB 1: FULL TOOLSET ── */}
        {tab === 1 && (
          <Layout>
            <Layout.Section>
              <BlockStack gap="400">
                {[
                  { title: "📦 A. Sourcing & Data Tools", tools: [
                    { name: "Supplier API Connector", desc: "7-source automated ingest: AliExpress, CJ, Zendrop, Spocket, SaleHoo, Faire, Modalyst.", btn: "Connect Supplier" },
                    { name: "Normalization Engine", desc: "Clean and standardize all incoming SKU data to GMC-compliant format.", btn: "▶ Run Engine" },
                    { name: "GTIN Injector", desc: "Query Global Product Database to retrieve and inject valid GTINs.", btn: "🔍 GPDB Lookup" },
                    { name: "Bulk-Edit Sanitizer", desc: "Batch-process error remediations across the entire catalog.", btn: "⚡ Run Batch Fix" },
                  ]},
                  { title: "🔍 B. SEO & Marketing Tools", tools: [
                    { name: "Meta-Tag Generator", desc: "AI-powered bulk meta titles and descriptions across full catalog.", btn: "Generate Meta-Tags" },
                    { name: "Schema Architect", desc: "Inject JSON-LD rich snippet schema for Google Rich Results.", btn: "Inject Schema" },
                    { name: "Alt-Text Automator", desc: "Vision AI-driven alt-text for every product image.", btn: "Run Alt-Text AI" },
                    { name: "Trend Researcher", desc: "Discover high-opportunity topics from Pinterest and Reddit.", btn: "Discover Trends" },
                    { name: "Ad-Creative Optimizer", desc: "Remove overlays and optimize images for Google Shopping and Meta Ads.", btn: "Optimize Creatives" },
                    { name: "Content Seeder", desc: "Schedule and distribute SEO-optimized content on a defined cadence.", btn: "Schedule Content" },
                  ]},
                  { title: "🕵️ C. Operation & Spy Tools", tools: [
                    { name: "Profit Shield", desc: "Monitor margins and auto-pause ads when products fall below threshold.", btn: "Configure" },
                    { name: "Competitor Tracker", desc: "Real-time competitor stock and price monitoring.", btn: "Add Competitor" },
                    { name: "Health Dashboard", desc: "Visual 0–100% compliance monitor across all 50 nodes.", btn: "View Report" },
                    { name: "Audit Ledger", desc: "Immutable event log of every automated action taken.", btn: "Download CSV" },
                    { name: "Deep-Link Manager", desc: "Auto-navigate to any Shopify Admin settings page for instant remediation.", btn: "Open Links" },
                  ]},
                  { title: "🔒 D. Governance & Security Tools", tools: [
                    { name: "Encryption Vault", desc: "Hardware-backed secure storage for all API credentials.", btn: "View Vault" },
                    { name: "Identity Manager", desc: "Verify and auto-populate merchant identity data for GMC compliance.", btn: "Verify Identity" },
                    { name: "Policy Injector", desc: "Generate and publish compliant Privacy Policy, ToS, and Return Policy pages.", btn: "Generate Pages" },
                    { name: "Audit Reporter", desc: "Downloadable compliance PDFs formatted for Google Support appeals.", btn: "Download PDF" },
                    { name: "Data Hard-Wipe", desc: "Complete deletion of all merchant data within 48 hours. Irreversible.", btn: "⚠️ Request Wipe", tone: "critical" },
                  ]},
                ].map((section, si) => (
                  <Card key={si}>
                    <BlockStack gap="300">
                      <Text variant="headingMd" as="h2">{section.title}</Text>
                      <Divider />
                      {section.tools.map((tool, ti) => (
                        <Box key={ti}>
                          <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="050">
                              <Text variant="bodyMd" fontWeight="bold">{tool.name}</Text>
                              <Text variant="bodySm" tone="subdued">{tool.desc}</Text>
                            </BlockStack>
                            <Button size="slim" tone={tool.tone}>{tool.btn}</Button>
                          </InlineStack>
                          {ti < section.tools.length - 1 && <Box paddingBlockStart="200"><Divider /></Box>}
                        </Box>
                      ))}
                    </BlockStack>
                  </Card>
                ))}
              </BlockStack>
            </Layout.Section>
          </Layout>
        )}

        {/* ── TAB 2: BILLING ── */}
        {tab === 2 && (
          <Layout>
            <Layout.Section>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">💳 Plans & Billing</Text>
                  <Text variant="bodySm" tone="subdued">Native Shopify Subscription Billing. Upgrade or downgrade anytime.</Text>
                  <Divider />
                  <InlineStack gap="400" align="start" wrap>
                    {BILLING_TIERS.map((tier, i) => (
                      <Box key={i} padding="400" background={tier.best ? "bg-surface-selected" : "bg-surface-secondary"} borderRadius="300" minWidth="180px">
                        <BlockStack gap="300">
                          <InlineStack align="space-between">
                            <Text variant="headingMd" as="h3">{tier.name}</Text>
                            {tier.best && <Badge tone="success">👑 Best Value</Badge>}
                          </InlineStack>
                          <Text variant="headingXl" as="p" fontWeight="bold">{tier.price}<Text variant="bodySm" tone="subdued">/mo</Text></Text>
                          <Text variant="bodySm" tone="subdued">{tier.desc}</Text>
                          <Button tone={tier.best ? "success" : undefined} variant={tier.best ? "primary" : "secondary"}>
                            {tier.best ? "Upgrade to Titan 👑" : `Select ${tier.name}`}
                          </Button>
                        </BlockStack>
                      </Box>
                    ))}
                  </InlineStack>
                </BlockStack>
              </Card>
            </Layout.Section>
          </Layout>
        )}

      </Box>
    </Page>
  );
}