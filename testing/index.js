const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('../index')

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'pathfind'
})

bot.loadPlugin(pathfinder)

bot.once('inject_allowed', () => {
  const movements = new Movements(bot)

  movements.climbables = new Set()
  movements.maxDropDown = 30
  movements.canOpenDoors = false
  movements.canDig = false
  movements.scafoldingBlocks = []
  movements.placeCost = 999
  movements.allowParkour = false
  movements.allowFreeMotion = true
  movements.allowSprinting = true
  movements.blocksToAvoid.add(22)
  bot.pathfinder.setMovements(movements)
  bot.pathfinder.thinkTimeout = 10000
  bot.pathfinder.tickTimeout = 40
})

bot.on('kicked', console.log)

bot.on('spawn', () => {
  bot.chat('/tp -2.5 70 -70.5')
  bot.pathfinder.setGoal(new goals.GoalBlock(-183, 74, -84))
})
