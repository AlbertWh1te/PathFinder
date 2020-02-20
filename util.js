const info = console.log.bind(console)
const e = selector => document.querySelector(selector)

const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}