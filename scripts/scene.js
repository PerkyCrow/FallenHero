import Hero from './hero.js'
import Obstacle from './obstacle.js'
import {floatBetween, randomPick, circleVsCircle} from './utils.js'


export default class Scene {

    constructor ({debug, onGameOver}) {
        this.world = {
            mountains:  [],
            props:      [],
            trees:      [],
            floorTiles: [],
            obstacles:  []
        }

        this.camera = {
            x:        0,
            y:        0,
            width:    7,
            height:   4,
            speed:    3,
            maxSpeed: 10
        }

        this.hero = new Hero()

        this.elapsedTime = 0
        this.ended       = false
        this.debug       = debug
        this.onGameOver  = onGameOver
    }

    get score () {
        return Math.floor(this.elapsedTime * this.camera.speed)
    }

    add (type, object) {
        this.world[type].push(object)
    }

    generate (category, {spacing, y, width, height, sprite, count}) {
        const lastPosition = this.lastPositionFor(category)

        let x = lastPosition

        if (this.world[category].length > 0) {
            x += floatBetween(spacing)
        }

        while (!this.isOffCamera(x)) {
            this.world[category].push({
                x,
                y:      floatBetween(y),
                width:  floatBetween(width),
                height: floatBetween(height),
                sprite: randomPick(sprite)
            })

            x += floatBetween(spacing)
        }

        this.cleanCategory(category, count)
    }

    cleanCategory (category, count) {
        while (this.world[category].length > count) {
            this.world[category].shift()
        }
    }

    generateWorld () {
        this.generate('floorTiles', {
            spacing: 1,
            y:       3,
            width:   1,
            height:  0.5,
            sprite:  ['floor1', 'floor2', 'floor3', 'floor4', 'floor5', 'floor6'],
            count:   8
        })

        this.generate('trees', {
            spacing: [1, 2],
            y:       1,
            width:   [1.8, 2.2],
            height:  [1.8, 2.2],
            sprite:  ['tree1', 'tree2', 'tree3', 'tree4', 'tree5'],
            count:   12
        })

        this.generate('props', {
            spacing: [0.8, 2.4],
            y:       2,
            width:   [0.8, 1.2],
            height:  [0.8, 1.2],
            sprite:  ['grass1', 'grass2', 'grass3', 'rocks1'],
            count:   14
        })

        this.generate('mountains', {
            spacing: [1.5, 2],
            y:       0.85,
            width:   [1.9, 2.1],
            height:  [1.9, 2.1],
            sprite:  ['mountain1', 'mountain2', 'mountain3', 'mountain4', 'mountain5', 'mountain6'],
            count:   8
        })

        this.generateObstacles()
    }

    generateObstacles () {
        const {camera} = this

        if (this.elapsedTime < this.nextObstacleAt) {
            return
        }

        const scale = floatBetween([0.4, 0.8])

        const obstacle = new Obstacle({
            x:      camera.x + camera.width + 1,
            y:      floatBetween([2.5, 2.9]),
            width:  scale,
            height: scale,
            sprite: randomPick(['tech1', 'tech2', 'tech3', 'tech4', 'tech5', 'tech6', 'tech7'])
        })

        this.add('obstacles', obstacle)

        const nextObstacleDelay = (1 / this.camera.speed) * floatBetween(2.5, 4.5)
        this.nextObstacleAt = this.elapsedTime + nextObstacleDelay
    }


    lastElementFor (category) {
        const collection = this.world[category]

        return collection[collection.length - 1]
    }

    lastPositionFor (category) {
        const {camera} = this
        const lastElement = this.lastElementFor(category)

        return lastElement ? lastElement.x : camera.x
    }

    isOffCamera (x) {
        const {camera} = this

        return x > camera.x + camera.width
    }

    gameOver () {
        if (!this.ended) {
            this.ended = true
            this.onGameOver()
        }
    }

    update (deltaTime) {
        if (this.ended) {
            return
        }

        this.checkCollisions()

        this.elapsedTime += deltaTime

        const {camera} = this
        camera.x      += camera.speed * deltaTime
        camera.speed  += 0.05 * deltaTime
        camera.speed   = Math.min(camera.speed, camera.maxSpeed)

        this.hero.update(deltaTime, this.camera)

        this.world.obstacles.forEach(obstacle => {
            obstacle.update(deltaTime, this.camera)
        })

        this.generateWorld()
    }

    checkCollisions () {
        const {world, hero} = this

        const collided = world.obstacles.some(obstacle => {
            obstacle.collided = circleVsCircle(hero.hitBox, obstacle.hitBox)

            return obstacle.collided
        })

        hero.collided = collided

        if (collided) {
            this.gameOver()
        }
    }

}
