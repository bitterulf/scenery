const timelineSprite = function(sprite, keyframes) {
    this.sprite = sprite;
    this.keyframes = keyframes;
};

timelineSprite.prototype.getInterpolationIndexes = function(keyframes, key) {
    let firstIndex = 0;
    keyframes.forEach(function(keyframe, index) {
        if (keyframe.key <= key) {
            firstIndex = index;
        }
    });

    if (firstIndex == keyframes.length - 1) {
        return [firstIndex, firstIndex];
    }
    else {
        return [firstIndex, firstIndex + 1];
    }
};

timelineSprite.prototype.updateTime = function(time) {
    const state = this.getInterpolationState(this.keyframes, time);

    this.sprite.x = state.x;
    this.sprite.y = state.y;
    this.sprite.tint = PIXI.utils.rgb2hex(state.color);
    this.sprite.alpha = state.alpha;
};

timelineSprite.prototype.getInterpolationState = function(keyframes, key) {
    const indexes = this.getInterpolationIndexes(keyframes, key);
    const startFrame = keyframes[indexes[0]];
    const goalFrame = keyframes[indexes[1]];
    const totalTime = goalFrame.key - startFrame.key;
    if (totalTime == 0) {
        return {
            x: startFrame.x,
            y: startFrame.y,
            color: startFrame.color,
            alpha: startFrame.alpha
        }
    }

    const currentTime = key - startFrame.key;
    const percent = currentTime / totalTime;

    const factor = EasingFunctions.easeInOutQuint(percent);

    const color = [
        (goalFrame.color[0] - startFrame.color[0]) * factor + startFrame.color[0],
        (goalFrame.color[1] - startFrame.color[1]) * factor + startFrame.color[1],
        (goalFrame.color[2] - startFrame.color[2]) * factor + startFrame.color[2]
    ];

    return {
        x: (goalFrame.x - startFrame.x) * factor + startFrame.x,
        y: (goalFrame.y - startFrame.y) * factor + startFrame.y,
        color: color,
        alpha: (goalFrame.alpha - startFrame.alpha) * factor + startFrame.alpha,
    }
};
