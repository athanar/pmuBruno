function calculateBets() {
    const desiredProfit = parseFloat(document.getElementById('desired-profit').value);
    const odds = [];
    
    for (let i = 1; i <= 6; i++) {
        const oddsValue = parseFloat(document.getElementById(`odds${i}`).value);
        if (!isNaN(oddsValue) && oddsValue > 0) {
            odds.push(oddsValue);
        }
    }

    if (odds.length === 0) {
        alert("Veuillez entrer des cotes valides pour au moins un cheval.");
        return;
    }

    const inverseSum = odds.reduce((sum, odd) => sum + (1 / odd), 0);

    if (inverseSum >= 1) {
        alert("La somme des inverses des cotes doit être inférieure à 1 pour garantir un bénéfice.");
        return;
    }

    const totalStake = desiredProfit / (1 - inverseSum);

    const stakes = odds.map(odd => totalStake / (odd * inverseSum));

    let resultsHTML = `<h3>Montants à parier pour garantir un bénéfice de ${desiredProfit}€ :</h3>`;
    stakes.forEach((stake, index) => {
        resultsHTML += `Cheval ${index + 1} : ${stake.toFixed(2)}€<br>`;
    });
    resultsHTML += `<br>Total des mises : ${stakes.reduce((sum, stake) => sum + stake, 0).toFixed(2)}€`;

    document.getElementById('results').innerHTML = resultsHTML;
}
