// backend/server.js or a separate controller
app.post('/api/analyze-gameplay', (req, res) => {
    const { userId, choicesTaken } = req.body;
    
    let victimScore = 0;
    let suspectScore = 0;

    choicesTaken.forEach(choice => {
        if (choice.behavior_label === 'Victim') victimScore += choice.ai_weight;
        if (choice.behavior_label === 'Suspect') suspectScore += choice.ai_weight;
    });

    // Predictive Logic
    let prediction = "Healthy/Informed";
    if (victimScore > suspectScore && victimScore > 2) {
        prediction = "High Risk: Victim Indicators";
    } else if (suspectScore > victimScore && suspectScore > 2) {
        prediction = "Warning: Suspect Indicators";
    }

    res.json({
        userId,
        prediction,
        confidence: (Math.max(victimScore, suspectScore) / choicesTaken.length).toFixed(2)
    });
});