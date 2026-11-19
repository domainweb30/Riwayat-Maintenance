import { equipment, getEquipment } from "./config.js";
import { formatDate,formatMoney,formatNumber,escapeHtml } from "./utils.js";
export function populateFilters(){
 const opts=equipment.map(e=>`<option value="${e.id}">${e.id} — ${escapeHtml(e.name)}</option>`).join("");
 document.querySelector("#equipmentFilter").innerHTML='<option value="">Semua peralatan</option>'+opts;
 document.querySelector("#equipmentInput").innerHTML=opts;
}
export function renderTable(records){
 const q=document.querySelector("#searchInput").value.trim().toLowerCase();
 const eqFilter=document.querySelector("#equipmentFilter").value;
 const typeFilter=document.querySelector("#typeFilter").value;
 const filtered=records.filter(r=>(!eqFilter||r.equipmentId===eqFilter)&&(!typeFilter||r.type===typeFilter)&&(!q||[r.condition,r.cause,r.action,r.parts,r.person,getEquipment(r.equipmentId)?.name,r.equipmentId].join(" ").toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date));
 document.querySelector("#recordCount").textContent=`${filtered.length} dari ${records.length} catatan`;
 const tbody=document.querySelector("#historyBody");
 tbody.innerHTML=filtered.map((r,i)=>`<tr><td>${i+1}</td><td>${formatDate(r.date)}</td><td><b>${escapeHtml(getEquipment(r.equipmentId)?.name||r.equipmentId)}</b><span class="sub">${r.equipmentId}</span></td><td><span class="tag tag-${r.type}">${escapeHtml(r.type)}</span></td><td>${escapeHtml(r.condition)}<span class="sub">${escapeHtml(r.cause||"")}</span></td><td>${escapeHtml(r.cause||"—")}</td><td>${escapeHtml(r.action)}</td><td>${escapeHtml(r.parts||"—")}</td><td>${formatNumber(r.responseHours)} jam</td><td>${formatNumber(r.downtimeHours)} jam</td><td>${formatMoney(r.cost)}</td><td>${escapeHtml(r.person||"—")}</td><td><span class="tag tag-${r.verification||"Normal"}">${escapeHtml(r.verification||"Normal")}</span></td><td>${formatDate(r.nextDate)}</td><td class="actions-cell"><button class="table-action" data-edit="${r.id}">Edit</button><button class="table-action delete" data-delete="${r.id}">Hapus</button></td></tr>`).join("")||'<tr><td colspan="15" class="empty">Tidak ada data ditemukan.</td></tr>';
 tbody.dispatchEvent(new CustomEvent("table-rendered",{detail:{filtered}}));
 return filtered;
}
export function exportCsv(records){
 const header=["Tanggal","ID Peralatan","Peralatan","Jenis","Gangguan","Penyebab","Tindakan","Suku Cadang","Respons (jam)","Downtime (jam)","Biaya","Pelaksana","Verifikasi","Pemeriksaan Berikutnya"];
 const rows=records.map(r=>[r.date,r.equipmentId,getEquipment(r.equipmentId)?.name||"",r.type,r.condition,r.cause,r.action,r.parts,r.responseHours,r.downtimeHours,r.cost,r.person,r.verification,r.nextDate]);
 const csv=[header,...rows].map(row=>row.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(",")).join("\\n");
 const blob=new Blob(["\\ufeff"+csv],{type:"text/csv;charset=utf-8"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="gardena-maintenance-records.csv";a.click();URL.revokeObjectURL(a.href);
}
