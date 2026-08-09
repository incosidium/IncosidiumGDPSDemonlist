fetch('data/demons.json')
  .then(res => res.json())
  .then(demons => {
    const listEl = document.getElementById('demon-list');
    const leaderboardEl = document.getElementById('leaderboard');
    const playerScores = {};

    demons.forEach((demon, index) => {
      // 1. Create Demon Entry Card
      const card = document.createElement('div');
      card.className = 'demon-card';

      const victorsListHtml = demon.victors.length > 0
        ? demon.victors.map(v => `<li>${v.name} — <a href="${v.video}" target="_blank">&lt;proof&gt;</a></li>`).join('')
        : '<li>None yet</li>';

      card.innerHTML = `
        <div class="demon-header">
          <span class="demon-rank">#${index + 1}</span>
          <span class="demon-title">${demon.name}</span>
          <span class="demon-verifier">by ${demon.verifier}</span>
          <a href="${demon.video}" target="_blank" class="video-btn">&lt;video&gt;</a>
        </div>
        <div class="demon-details">
          <p><strong>Level ID:</strong> ${demon.levelId || 'N/A'} | <strong>Requirement:</strong> ${demon.requirement || '100%'}</p>
          <h4>Victors</h4>
          <ul>${victorsListHtml}</ul>
        </div>
      `;

      // Toggle details on click
      card.querySelector('.demon-header').addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          card.classList.toggle('active');
        }
      });

      listEl.appendChild(card);

      // 2. Calculate Leaderboard Points
      playerScores[demon.verifier] = (playerScores[demon.verifier] || 0) + demon.points;
      demon.victors.forEach(victor => {
        playerScores[victor.name] = (playerScores[victor.name] || 0) + demon.points;
      });
    });

    // Render Leaderboard
    const sortedPlayers = Object.entries(playerScores).sort((a, b) => b[1] - a[1]);
    sortedPlayers.forEach(([player, score]) => {
      const li = document.createElement('li');
      li.textContent = `${player} — ${score} pts`;
      leaderboardEl.appendChild(li);
    });
  });
