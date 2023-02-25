export default class Obstacle {

    constructor ({x, y, width, height, sprite}) {
        this.x      = x
        this.y      = y
        this.width  = width
        this.height = height
        this.sprite = sprite
        this.speed  = 0.5
    }

    update (deltaTime, camera) {
        this.x -= camera.speed * this.speed * deltaTime
    }

    get hitBox () {
        const semiWidth  = this.width  / 2
        const semiHeight = this.height / 2

        return {
            x:      this.x + semiWidth,
            y:      this.y + semiHeight,
            radius: semiWidth
        }
    }

}
