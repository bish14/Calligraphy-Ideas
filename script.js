// ── State ──
let selectedMood  = "happy";
let selectedStyle = "copperplate";
let selectedLength = 5;

// ── Chip selection ──
function setupChips(groupId, onSelect) {
  const group = document.getElementById(groupId);
  group.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      group.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      onSelect(chip.dataset.value);
    });
  });
}

setupChips("mood-chips",  v => selectedMood  = v);
setupChips("style-chips", v => selectedStyle = v);

// ── Slider ──
const slider  = document.getElementById("length-slider");
const display = document.getElementById("length-display");
slider.addEventListener("input", () => {
  selectedLength = parseInt(slider.value);
  display.textContent = selectedLength;
});

// ── Generate ──
async function generate() {
  const btn     = document.getElementById("inspire-btn");
  const btnText = document.getElementById("btn-text");
  const spinner = document.getElementById("btn-spinner");
  const result  = document.getElementById("result-card");
  const empty   = document.getElementById("empty-state");

  // Loading state
  btn.disabled = true;
  btnText.textContent = "Generating…";
  spinner.classList.remove("hidden");
  result.classList.add("hidden");
  empty.classList.add("hidden");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mood:   selectedMood,
        style:  selectedStyle,
        length: selectedLength
      })
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error + (data.detail ? "\n\n" + data.detail : ""));
      empty.classList.remove("hidden");
      return;
    }

    renderResult(data);

  } catch (err) {
    alert("Something went wrong. Please try again.\n\n" + err.message);
    empty.classList.remove("hidden");
  } finally {
    btn.disabled = false;
    btnText.textContent = "Inspire Me";
    spinner.classList.add("hidden");
  }
}

// ── Render ──
function renderResult(d) {
  // Quote
  document.getElementById("result-quote").textContent = `"${d.quote}"`;
  const attr = document.getElementById("result-attribution");
  attr.textContent = d.attribution ? `— ${d.attribution}` : "";

  // Tags
  const tagsEl = document.getElementById("result-tags");
  tagsEl.innerHTML = "";
  if (d.flourish_worthy) {
    tagsEl.innerHTML += `<span class="tag tag-flourish">✦ Flourish-worthy</span>`;
  }
  const styleLabel = { copperplate: "Copperplate", modern: "Modern", brush: "Brush Lettering" }[selectedStyle] || selectedStyle;
  tagsEl.innerHTML += `<span class="tag tag-style">${styleLabel}</span>`;

  // Style note
  document.getElementById("result-style-note").textContent = d.style_note || "";

  // Devanagari
  const devBlock = document.getElementById("devanagari-block");
  if (d.devanagari) {
    document.getElementById("devanagari-text").textContent  = d.devanagari;
    document.getElementById("devanagari-roman").textContent = d.devanagari_transliteration || "";
    devBlock.classList.remove("hidden");
  } else {
    devBlock.classList.add("hidden");
  }

  // Practice words
  const wordsEl = document.getElementById("practice-words");
  wordsEl.innerHTML = (d.practice_words || [])
    .map(w => `<span class="word-pill">${w}</span>`)
    .join("");

  // Instagram caption
  document.getElementById("caption-text").textContent = d.instagram_caption || "";

  // Show result
  document.getElementById("result-card").classList.remove("hidden");
  document.getElementById("empty-state").classList.add("hidden");

  // Scroll into view smoothly
  document.getElementById("result-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Copy caption ──
function copyCaption() {
  const text = document.getElementById("caption-text").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.textContent = "Copied ✓";
    setTimeout(() => btn.textContent = "Copy", 2000);
  });
}
