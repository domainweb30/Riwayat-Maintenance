import { getEquipment,pmSchedule } from "./config.js";
import { formatNumber,escapeHtml } from "./utils.js";
function aggregate(records,key,metric){const m=new Map();records.forEach(r=>{const label=key(r);if(label)m.set(label,(m.get(label)||0)+metric(r))});return [...m.entries()].sort((a,b)=>b[1]-a[1])}
function drawChart(selector,items){
 const el=document.querySelector(selector);if(!items.length){el.innerHTML='<div class="empty">Belum ada data</div>';return}
 const max=Math.max(1,...items.map(i=>i[1]));
 el.innerHTML=items.map(([label,value])=>`<div class="chart-row"><span class="chart-label" title="${escapeHtml(label)}">${escapeHtml(label)}</span><div class="chart-track"><div class="chart-bar" style="width:${Math.max(2,value/max*100)}%"></div></div><span class="chart-value">${formatNumber(value)}</span></div>`).join("");
}
export function renderCharts(records){
 drawChart("#chartFailures",aggregate(records,r=>getEquipment(r.equipmentId)?.name||r.equipmentId,()=>1));
 drawChart("#chartDowntime",aggregate(records,r=>getEquipment(r.equipmentId)?.name||r.equipmentId,r=>Number(r.downtimeHours||0)));
 drawChart("#chartParts",aggregate(records,r=>r.parts?.trim(),()=>1));
 const groups={};pmSchedule.forEach(e=>(groups[e.frequency]??=[]).push(e.name));
 document.querySelector("#pmSchedule").innerHTML=Object.entries(groups).map(([freq,names])=>`<div class="schedule-row"><span class="schedule-chip">${freq} · ${names.length}</span><span class="schedule-equipment">${escapeHtml(names.join(", "))}</span></div>`).join("");
}
