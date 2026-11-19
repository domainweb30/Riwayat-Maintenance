import { formatMoney,formatNumber } from "./utils.js";
export function renderKpis(records){
 const count=records.length,totalDown=records.reduce((s,r)=>s+Number(r.downtimeHours||0),0),totalResp=records.reduce((s,r)=>s+Number(r.responseHours||0),0),totalCost=records.reduce((s,r)=>s+Number(r.cost||0),0);
 const items=[[count,"Total catatan gangguan"],[`${formatNumber(totalDown)} jam`,"Total downtime"],[`${formatNumber(totalResp/Math.max(1,count))} jam`,"Rata-rata respons"],[formatMoney(totalCost),"Total biaya perbaikan"]];
 document.querySelector("#kpiGrid").innerHTML=items.map(([v,l])=>`<article class="kpi-card"><div class="kpi-label">${l}</div><div class="kpi-value">${v}</div></article>`).join("");
}
