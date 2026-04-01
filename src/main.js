// Basic navigation and placeholder rendering for Open Voter
(function(){
  const yearSelect = document.getElementById('election-year');
  const content = document.getElementById('content-area');
  function renderForYear(year){
    content.innerHTML = `
      <section>
        <h2>${year} Taiwan Election Information</h2>
        <p>此區塊將顯示該年度的政見、候選人與 KPI 追蹤狀態的概覽（占位中）。</p>
        <div class="cards-grid">
          <div class="card">範例卡片：候選人 A</div>
          <div class="card">範例卡片：政見 B</div>
        </div>
      </section>
    `;
  }
  yearSelect.addEventListener('change', (e)=>{ renderForYear(e.target.value); });
  // 初始化顯示
  renderForYear(yearSelect.value);
})();
