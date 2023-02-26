export function loadImage (path) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = path
        image.onload = () => resolve(image)
        image.onerror = reject
    })
}


export async function loadImages (collection) {
    const images = {}

    for (let name in collection) {
        images[name] = await loadImage(collection[name])
    }

    return images
}


export function clearCanvas (ctx, {width, height}) {
    ctx.clearRect(0, 0, width, height)
}


export function setScale (ctx, scale) {
    ctx.scale(scale, scale)
}


export function drawRectangle (ctx, {x, y, width, height, color}) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}


export function drawCircle (ctx, {x, y, radius, color}) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
}


export function drawHitBox (ctx, scene, element) {
    const {hitBox} = element

    if (scene.debug && hitBox) {
        const color = element.collided ? 'red' : 'black'

        drawCircle(ctx, {
            x:      hitBox.x - scene.camera.x,
            y:      hitBox.y - scene.camera.y,
            radius: hitBox.radius,
            color
        })
    }
}


export function drawImage (ctx, {x, y, width, height, image}) {
    ctx.drawImage(image, x, y, width, height)
}


export function drawGrid (ctx, {width, height}) {
    const cellSize = 1

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.lineWidth = 0.01

    for (let x = 0; x < width; x += cellSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
    }
    for (let y = 0; y < height; y += cellSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
    }
}


export function drawScene (ctx, scene, images) {
    drawFloor(ctx, scene)
    drawWorld(ctx, scene, images)
    drawHero(ctx, scene, images)
}


function drawWorld (ctx, scene, images) {
    for (let category in scene.world) {
        scene.world[category].forEach(element => {
            drawSceneElement(ctx, scene, images, element)
        })
    }
}


function drawSceneElement (ctx, scene, images, element) {
    const drawParams = Object.assign({}, element)

    drawParams.image = images[drawParams.sprite]
    drawParams.x -= scene.camera.x
    drawParams.y -= scene.camera.y

    drawImage(ctx, drawParams)
    drawHitBox(ctx, scene, element)
}


function drawHero (ctx, scene, images) {
    const {hero} = scene

    const drawParams = {
        x:      hero.x - scene.camera.x,
        y:      hero.y - scene.camera.y,
        width:  hero.width,
        height: hero.height,
        image:  images[hero.sprite]
    }

    drawImage(ctx, drawParams)
    drawHitBox(ctx, scene, hero)
}


function drawFloor (ctx, scene) {
    drawRectangle(ctx, {
        x:      0,
        y:      3.5,
        width:  scene.camera.width,
        height: 0.5,
        color: 'black'
    })
}


export function startAnimationLoop (callback) {
    let lastTime = 0

    function animationFrame (time) {
        const deltaTime = time - lastTime
        lastTime = time

        callback(deltaTime / 1000)

        requestAnimationFrame(animationFrame)
    }

    requestAnimationFrame(animationFrame)
}


export function randomPick (choices) {
    if (!Array.isArray(choices)) {
        return choices
    }

    return choices[Math.floor(Math.random() * choices.length)]
}


export function floatBetween (range) {
    if (!Array.isArray(range)) {
        return range
    }
    const [min, max] = range

    return Math.random() * (max - min) + min
}


export function circleVsCircle (circleA, circleB) {
    const distanceX = circleA.x - circleB.x
    const distanceY = circleA.y - circleB.y
    const distance  = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    return distance < circleA.radius + circleB.radius
}