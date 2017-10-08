const calculateFight = function(attackingTroop, defendingTroop, losses) {
    const defenders = [];
    const attackers = [];

    for (let d = 0; d < defendingTroop.count; d++) {
        defenders.push({
            type: defendingTroop.type,
            x: 1,
            y: d
        })
    }

    for (let a = 0; a < attackingTroop.count; a++) {
        attackers.push({
            type: attackingTroop.type,
            x: -1,
            y: a
        })
    }

    let killedDefenders = 0;

    while (killedDefenders <= losses) {
        const randomDefenderId = Math.floor(Math.random() * defenders.length);
        if (!defenders[randomDefenderId].dead) {
            defenders[randomDefenderId].dead = true;
            killedDefenders++;
        }
    }

    console.log(defenders[Math.floor(Math.random() * defenders.length)]);

    console.log(defenders, attackers);
}

calculateFight({ type: 'swordsmen', count: 10 }, { type: 'peasant', count: 20 }, 5);
