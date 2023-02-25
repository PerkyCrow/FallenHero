export default class Hero {

    constructor () {
        this.x      = 0
        this.y      = 2.5
        this.width  = 1
        this.height = 1

        this.frames     = ['hero1', 'hero2', 'hero3', 'hero4']
        this.frameIndex = 0
        this.frameTime  = 0
        this.frameSpeed = 0.2

        this.gravity   = 35
        this.jumpForce = -9
        this.velocityY = 0
        this.groundY   = 2.5
    }

    get sprite () {
        return this.frames[this.frameIndex]
    }

    get hitBox () {
        const semiWidth  = this.width / 2
        const semiHeight = this.height / 2

        return {
            x:      this.x + semiWidth,
            y:      this.y + semiHeight * 0.75,
            radius: semiWidth * 0.5
        }
    }

    jump () {
        if (this.y === this.groundY) {
            this.velocityY = this.jumpForce
        }
    }

    update (deltaTime, camera) {
        this.x = camera.x + 0.5
        this.frameTime += deltaTime

        const nextFrameTime = this.frameSpeed / camera.speed

        if (this.frameTime > nextFrameTime) {
            this.frameTime = 0
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
        }

        this.y += this.velocityY * deltaTime
        this.velocityY += this.gravity * deltaTime

        if (this.y > this.groundY) {
            this.y = this.groundY
            this.velocityY = 0
        }
    }

}
