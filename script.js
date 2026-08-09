fetch('data/demons.json')
  .then(res => res.json())
  .then(demons => {
    const listEl = document.getElementById('demon-list');
    const leaderboardEl = document.getElementById('leaderboard');
    const playerScores = {};

    demons.forEach((demon, index) => {
      // 1. Render Demon List Item
      const li = document.createElement('li');
      li.innerHTML = `<strong>${demon.name}</strong> — verified by: ${demon.verifier} <a href="${demon.video}" target="_blank">&lt;view verification video&gt;</a>`;
      listEl.appendChild(li);

      // 2. Calculate Leaderboard Points
      const winners = [demon.verifier, ...demon.victors];
      winners.forEach(player => {
        playerScores[player] = (playerScores[player] || 0) + demon.points;
      });
    });

    // Sort and render Leaderboard
    const sortedPlayers = Object.entries(playerScores).sort((a, b) => b[1] - a[1]);
    sortedPlayers.forEach(([player, score]) => {
      const li = document.createElement('li');
      li.textContent = `${player} — ${score} pts`;
      leaderboardEl.appendChild(li);
    });
  });
