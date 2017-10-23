const calculateFight = function(attackingTroop, defendingTroop, losses) {
    const defenders = [];
    const attackers = [];

    for (let d = 0; d < defendingTroop.count; d++) {
        defenders.push({
            type: defendingTroop.type,
            x: 1,
            y: d - defendingTroop.count / 2
        })
    }

    for (let a = 0; a < attackingTroop.count; a++) {
        attackers.push({
            type: attackingTroop.type,
            x: -1,
            y: a - attackingTroop.count / 2
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

    const primaryTargets = [];
    const secondaryTargets = [];

    defenders.forEach(function(defender, index) {
        if (defender.dead) {
            primaryTargets.push(index);
            console.log(defender);
        }
        else if ((defenders[index - 1] && defenders[index - 1].dead) || (defenders[index + 1] && defenders[index + 1].dead)) {
            secondaryTargets.push(index);
        }
    });

    primaryTargets.forEach(function(primaryTarget) {
        let selectedAttacker = -1;
        let selectedAttackerDistance = 0;
        attackers.forEach(function(attacker, attackerIndex) {
            const distance = Math.abs(defenders[primaryTarget].y - attacker.y);
            if (!attacker.target) {
                if (selectedAttacker < 0 || distance < selectedAttackerDistance) {
                    selectedAttacker = attackerIndex;
                    selectedAttackerDistance = distance;
                }
            }
        });

        attackers[selectedAttacker].target = primaryTarget;
    });

    secondaryTargets.forEach(function(secondaryTarget) {
        let selectedAttacker = -1;
        let selectedAttackerDistance = 0;
        attackers.forEach(function(attacker, attackerIndex) {
            const distance = Math.abs(defenders[secondaryTarget].y - attacker.y);
            if (!attacker.target) {
                if (selectedAttacker < 0 || distance < selectedAttackerDistance) {
                    selectedAttacker = attackerIndex;
                    selectedAttackerDistance = distance;
                }
            }
        });

        if (selectedAttacker > 0) {
            attackers[selectedAttacker].target = secondaryTarget;
            console.log('selected secondary', selectedAttacker, secondaryTarget);
        }
    });

    console.log(attackers, defenders);
}

calculateFight({ type: 'swordsmen', count: 10 }, { type: 'peasant', count: 20 }, 5);
