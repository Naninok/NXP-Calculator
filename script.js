const PRICE_IC = 32.38;
const PRICE_AP = 134.34;

const inDosIC = document.getElementById("dos_ic");
const inDosAP = document.getElementById("dos_ap");
const inPumpAP = document.getElementById("pump_ap");
const inFlow = document.getElementById("flow");

const out_usage_ic = document.getElementById("usage_ic");
const out_price_ic = document.getElementById("price_ic");
const out_usage_ap = document.getElementById("usage_ap");
const out_price_ap = document.getElementById("price_ap");
const out_flow = document.getElementById("disp_flow");
const out_total = document.getElementById("total_price");
const out_update = document.getElementById("last_update");

const out_mix_ap = document.getElementById("mix_ap");

function fnum(x, dec = 2) {
  return isFinite(x)
    ? Number(x).toLocaleString(undefined, {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      })
    : "-";
}

function calculate() {
  const d_ic = parseFloat(inDosIC.value) || 0;
  const d_ap = parseFloat(inDosAP.value) || 0;
  const pump_ap = parseFloat(inPumpAP.value);
  const f = parseFloat(inFlow.value) || 0;

  out_flow.textContent = fnum(f) + " m³/h";

  // Usage
  const usage_ic = (d_ic * f) / 1000;
  const usage_ap = (d_ap * f) / 1000;

  // Price
  const price_ic = usage_ic * PRICE_IC * 24;
  const price_ap = usage_ap * PRICE_AP * 24;

  out_usage_ic.textContent = fnum(usage_ic) + " kg/hr";
  out_price_ic.textContent = fnum(price_ic) + " Baht/day";

  out_usage_ap.textContent = fnum(usage_ap) + " kg/hr";
  out_price_ap.textContent = fnum(price_ap) + " Baht/day";

  out_total.textContent = fnum(price_ic + price_ap) + " Baht/day";

  out_update.textContent = new Date().toLocaleString();

  // Mixing AP1715
  if (isFinite(pump_ap) && pump_ap > 0 && usage_ap > 0) {
    const g_per_1000L = (usage_ap / pump_ap) * 1_000_000;
    out_mix_ap.style.display = "block";
    out_mix_ap.textContent =
      "ต้องใช้ AP1715: " + fnum(g_per_1000L, 0) + " g ต่อ 1000 L Solution";
  } else {
    out_mix_ap.style.display = "none";
  }
}

[inDosIC, inDosAP, inPumpAP, inFlow].forEach((el) => {
  el.addEventListener("input", calculate);
});

calculate();
