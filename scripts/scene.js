export default class Scene {

    constructor () {
        this.elements = []
        this.camera = {
            x: 0,
            y: 0,
            width: 7,
            height: 4,
            speed: 3
        }
    }

    add (object) {
        this.elements.push(object)
    }

    update (deltaTime) {
        this.camera.x += this.camera.speed * deltaTime
    }

}
