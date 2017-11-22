const MoveTo = function(x, y) {
    return {
        x: x,
        y: y,
        type: 'moveTo'
    };
};

const MoveBy = function(x, y) {
    return {
        x: x,
        y: y,
        type: 'moveBy'
    };
};

const ChangeTimeBy = function(time) {
    return {
        time: time,
        type: 'changeTimeBy'
    };
};

const ChangeTimeTo = function(time) {
    return {
        time: time,
        type: 'changeTimeTo'
    };
};

const MoveTowards = function(actor) {
    return {
        x: actor.position.x,
        y: actor.position.y,
        type: 'moveTo'
    };
};

const RandomTime = function(base, randomized) {
    return base + Math.round(randomized * Math.random());
};

const syncActors = function(actors) {
    let maxTime = 0;
    actors.forEach(function(actor) {
        if (actor.time > maxTime) {
            maxTime = actor.time
        }
    });

    actors.forEach(function(actor) {
        actor.idle(ChangeTimeTo(maxTime + 10));
    });
};

const createActions = function() {
    const actions = [];

    const defenders = [];
    for (var d = 0; d < 10; d++) {
        const defender = new Actor(actions, 'def'+d, 'point.png', 0, 300, 20 + (d * 20), 'idle');
        if (Math.random() > 0.5) {
            defender.data.attacked = true;
        }
        defenders.push(defender);
    }

    const attackers = [];
    for (var a = 0; a < 10; a++) {
        const defender = new Actor(actions, 'at'+a, 'point.png', 0, -20, 20 + (a * 20), 'idle');
        attackers.push(defender);
    }

    attackers.forEach(function(attacker, a) {
        attacker.walking(MoveTo(100, 20 + (a * 20)), ChangeTimeBy(200));
    });

    syncActors(attackers);

    attackers.forEach(function(attacker, a) {
        attacker.walking(MoveBy(50, 0), ChangeTimeBy(RandomTime(50, 150)));
    });

    syncActors(attackers);

    attackers.forEach(function(attacker, a) {
        const target = defenders
            .filter(function(defender) {
                return defender.data.attacked;
            })
            .sort(function() {
                return Math.random() - 0.5;
            })[0];

        attacker.attacking(MoveTowards(target), ChangeTimeBy(RandomTime(100, 50)));
    });

    return actions;
};
