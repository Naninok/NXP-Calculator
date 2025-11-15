const DENSITY_IC1178 = 1.1; // Assumed density (kg/L) for IC1178 product

const inDosIC = document.getElementById("dos_ic");
const inDosAP = document.getElementById("dos_ap");
const inPumpAP = document.getElementById("pump_ap");
const inFlow = document.getElementById("flow");

const out_fr_ic_l = document.getElementById("fr_ic_l");
const out_fr_ic_kg = document.getElementById("fr_ic_kg");
const out_usage_ap = document.getElementById("usage_ap");
const out_flow = document.getElementById("disp_flow");
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

  // IC1178 Feed Rate
  const fr_ic_kg = (d_ic * f) / 1000; // kg/hr (assuming ppm = g/m3, which is 1000 * kg/m3)
  const fr_ic_l = fr_ic_kg / DENSITY_IC1178; // L/hr

  out_fr_ic_l.textContent = fnum(fr_ic_l) + " l/h";
  out_fr_ic_kg.textContent = fnum(fr_ic_kg) + " kg/h";

  // AP1789 Usage
  const usage_ap = (d_ap * f) / 1000; // kg/hr

  out_usage_ap.textContent = fnum(usage_ap) + " kg/hr";

  out_update.textContent = new Date().toLocaleString();

  // Mixing AP1789
  if (isFinite(pump_ap) && pump_ap > 0 && usage_ap > 0) {
    // Calculate grams per 1000L of solution based on feed rate and pump capacity
    // usage_ap is kg/hr, pump_ap is L/hr
    const g_per_1000L = (usage_ap / pump_ap) * 1_000_000; // (kg/hr) / (L/hr) * 1,000,000 g/kg
    out_mix_ap.style.display = "block";
    out_mix_ap.textContent =
      "ต้องใช้ AP1789: " + fnum(g_per_1000L, 0) + " g ต่อ 1000 L Solution";
  } else {
    out_mix_ap.style.display = "none";
  }
}

[inDosIC, inDosAP, inPumpAP, inFlow].forEach((el) => {
  el.addEventListener("input", calculate);
});

calculate();