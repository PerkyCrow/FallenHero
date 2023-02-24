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
    for (let category in scene.world) {
        scene.world[category].forEach(element => {
            const drawParams = Object.assign({}, element)

            drawParams.image = images[drawParams.sprite]
            drawParams.x -= scene.camera.x
            drawParams.y -= scene.camera.y

            drawImage(ctx, drawParams)
        })
    }
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