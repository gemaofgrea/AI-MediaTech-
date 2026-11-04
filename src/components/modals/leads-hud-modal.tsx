"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Database,
  RefreshCw,
  Download,
  Trash2,
  Search,
  Filter,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  Layers,
} from "lucide-react";
import {
  fetchInquiries,
  clearLocalStorageInquiries,
  isFirebaseConfigured,
  type InquirySubmission,
} from "@/lib/firebase";

interface LeadsHudModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadsHudModal({ isOpen, onClose }: LeadsHudModalProps) {
  const [leads, setLeads] = useState<InquirySubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedLead, setSelectedLead] = useState<InquirySubmission | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchInquiries();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen]);

  useEffect(() => {
    const handleAdd = () => loadData();
    window.addEventListener("nexa_inquiry_added", handleAdd);
    return () => window.removeEventListener("nexa_inquiry_added", handleAdd);
  }, []);

  if (!isOpen) return null;

  const filtered = leads.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchQ =
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.id && l.id.toLowerCase().includes(q));
    const matchType = filterType === "All" || l.userType === filterType;
    return matchQ && matchType;
  });

  const exportToJson = () => {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atelier-luma-inquiries-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isConnected = isFirebaseConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0c0c11] border border-[#c5a059]/40 rounded-sm overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 border-b hairline-border bg-[#09090d]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#161622] border border-[#c5a059]/50 flex items-center justify-center text-[#dfc287]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-base sm:text-lg font-bold tracking-wider text-[#f4f3ef] uppercase">
                  ATELIER LUMA // FIRESTORE REGISTRY HUD
                </h3>
                <span className="font-mono-tech text-[10px] text-[#dfc287] border border-[#c5a059]/40 px-1.5 py-0.5 rounded-xs">
                  {leads.length} RECORDS
                </span>
              </div>
              <p className="font-mono-tech text-[10px] text-[#8e8d97] uppercase tracking-wider">
                Evaluation Verification: Live Firestore Collection Records & Commission Intake
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToJson}
              className="px-3 py-1.5 bg-[#14141d] hover:bg-[#1a1a24] text-[#dcd8cf] font-mono-tech text-[10px] uppercase tracking-wider border hairline-border flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>EXPORT JSON</span>
            </button>
            <button
              onClick={loadData}
              className="p-1.5 bg-[#14141d] hover:bg-[#1a1a24] text-[#dcd8cf] border hairline-border transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-[#14141d] hover:bg-[#1a1a24] text-[#8e8d97] hover:text-white border hairline-border transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sync Mode Banner */}
        <div className="px-6 py-2 bg-[#101017] border-b hairline-border flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[11px]">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-[#c5a059]"}`} />
            <span className="text-[#dcd8cf]">
              Storage Architecture:{" "}
              {isConnected
                ? "Live Google Cloud Firestore Initialized ('inquiries' collection)"
                : "Client Local Resilience Storage Active (Ready for Firebase credentials in .env.local)"}
            </span>
          </div>

          <button
            onClick={() => {
              if (confirm("Reset local cache records?")) {
                clearLocalStorageInquiries();
                loadData();
              }
            }}
            className="text-[10px] text-[#8e8d97] hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            <span>RESET CACHE</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b hairline-border bg-[#09090d] flex flex-wrap items-center justify-between gap-3 font-mono-tech text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, email, or reference code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070709] border hairline-border px-8 py-1.5 text-xs text-[#f4f3ef] placeholder-zinc-600 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#070709] border hairline-border px-3 py-1.5 text-xs text-[#dcd8cf] focus:outline-none cursor-pointer"
          >
            <option value="All">All Client Classifications</option>
            <option value="Brand / Enterprise">Brand / Enterprise</option>
            <option value="Fashion Label / Agency">Fashion Label / Agency</option>
            <option value="Indie Filmmaker / Creator">Indie Filmmaker / Creator</option>
            <option value="Creative Talent / Artist">Creative Talent / Artist</option>
            <option value="Individual Visionary">Individual Visionary</option>
          </select>
        </div>

        {/* Records List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3 font-mono-tech">
          {isLoading ? (
            <div className="text-center py-12 text-[#8e8d97] text-xs flex flex-col items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-[#c5a059]" />
              <span>SYNCHRONIZING WITH DATABASE...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-[#8e8d97] text-xs">
              No registered commissions match the query. Submit one through the brief wizard to inspect.
            </div>
          ) : (
            filtered.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="p-4 bg-[#08080c] hover:bg-[#12121a] border hairline-border hover:border-[#c5a059]/40 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#f4f3ef] text-sm">{lead.name}</span>
                    <span className="text-[10px] text-[#dfc287] border border-[#c5a059]/40 px-1.5 py-0.5 rounded-xs">
                      {lead.userType}
                    </span>
                    <span className="text-[10px] text-[#8e8d97]">ID: {lead.id}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#8e8d97]">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#c5a059]" /> {lead.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#c5a059]" /> {lead.mobile}
                    </span>
                    <span className="text-[#dfc287] font-semibold">{lead.budget}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {lead.services.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#14141d] border hairline-border text-[9px] text-[#dcd8cf]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 text-left md:text-right text-[10px] text-[#8e8d97]">
                  <div>{new Date(lead.submittedAt).toLocaleString()}</div>
                  <div className="text-[#dfc287] uppercase mt-1">INSPECT BRIEF →</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Lead Detailed Inspection */}
        {selectedLead && (
          <div className="p-6 bg-[#09090d] border-t border-[#c5a059]/40 font-mono-tech text-xs space-y-4 animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between pb-2 border-b hairline-border">
              <div className="flex items-center gap-2">
                <span className="text-[#c5a059] font-bold">COMMISSION DOSSIER:</span>
                <span className="text-[#f4f3ef] font-semibold">{selectedLead.name}</span>
                <span className="text-[#8e8d97]">({selectedLead.id})</span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-[#8e8d97] hover:text-[#f4f3ef] cursor-pointer"
              >
                CLOSE [✕]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-[#0e0e14] border hairline-border">
                <span className="text-[#8e8d97] text-[10px] uppercase block mb-1">Direct Contact</span>
                <div className="text-[#f4f3ef]">{selectedLead.email}</div>
                <div className="text-[#dfc287] mt-0.5">{selectedLead.mobile}</div>
              </div>

              <div className="p-3 bg-[#0e0e14] border hairline-border">
                <span className="text-[#8e8d97] text-[10px] uppercase block mb-1">Budget & Schedule</span>
                <div className="text-[#dfc287] font-bold">{selectedLead.budget}</div>
                <div className="text-[#8e8d97] mt-0.5">Timeline: {selectedLead.timeline}</div>
              </div>

              <div className="p-3 bg-[#0e0e14] border hairline-border">
                <span className="text-[#8e8d97] text-[10px] uppercase block mb-1">Pipeline Model</span>
                <div className="text-[#f4f3ef]">{selectedLead.preferredPipeline}</div>
                <div className="text-[#8e8d97] mt-0.5">Classification: {selectedLead.userType}</div>
              </div>
            </div>

            <div className="p-3 bg-[#0e0e14] border hairline-border">
              <span className="text-[#8e8d97] text-[10px] uppercase block mb-1">Creative Script Brief:</span>
              <p className="text-[#dcd8cf] text-xs leading-relaxed font-light whitespace-pre-wrap font-sans">
                {selectedLead.projectBrief}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
