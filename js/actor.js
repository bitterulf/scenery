const Actor = function(actions, id, image, time, x, y, status) {

    this.id = id;
    this.image = image;
    this.position = {x: x, y: y};
    this.status = status;
    this.time = time;
    this.actions = actions;
    this.data = {};

    this.addAction();
};

Actor.prototype.applyPositionChange = function(positionChange) {
    if (positionChange) {
        if (positionChange.type == 'moveBy') {
            this.position.x += positionChange.x;
            this.position.y += positionChange.y;
        }
        else if (positionChange.type == 'moveTo') {
            this.position.x = positionChange.x;
            this.position.y = positionChange.y;
        }
    }
};

Actor.prototype.applyTimeChange = function(timeChange) {
    if (timeChange) {
        if (timeChange.type == 'changeTimeBy') {
            this.time += timeChange.time;
        }
        else if (timeChange.type == 'changeTimeTo') {
            this.time = timeChange.time;
        }
    }
};

Actor.prototype.addAction = function() {
    this.actions.push({
        id: this.id,
        image: this.image,
        time: this.time,
        x: this.position.x,
        y: this.position.y,
        status: this.status
    });
};

Actor.prototype.position = function() {
    this.x = x;
    this.y = y;

    return this;
};

Actor.prototype.attacking = function(positionChange, timeChange) {
    this.applyPositionChange(positionChange);
    this.applyTimeChange(timeChange);
    this.status = 'attacking';
    this.addAction();

    return this;
};

Actor.prototype.walking = function(positionChange, timeChange) {
    this.applyPositionChange(positionChange);
    this.applyTimeChange(timeChange);
    this.status = 'walking';
    this.addAction();

    return this;
};

Actor.prototype.idle = function(timeChange) {
    this.applyTimeChange(timeChange);
    this.status = 'idle';
    this.addAction();

    return this;
};

Actor.prototype.hurt = function(positionChange, timeChange) {
    this.applyPositionChange(positionChange);
    this.applyTimeChange(timeChange);
    this.status = 'hurt';
    this.addAction();

    return this;
};

Actor.prototype.dead = function(positionChange, timeChange) {
    this.applyPositionChange(positionChange);
    this.applyTimeChange(timeChange);
    this.status = 'dead';
    this.addAction();

    return this;
};
