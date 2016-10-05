var BinaryBayes = require("./lib/binary_bayes")

// construct the model
net = new BinaryBayes()

net.addNode("Winter")
net.setProbabilities("Winter", [.6, .4])

net.addNode("Sprinkler")
net.addArc("Winter", "Sprinkler")
net.setProbabilities("Sprinkler", [.2, .8, .75, .25])

net.addNode("Rain")
net.addArc("Winter", "Rain")
net.setProbabilities("Rain", [.8, .2, .1, .9])

net.addNode("WetGrass")
net.addArc("Sprinkler", "WetGrass")
net.addArc("Rain", "WetGrass")
net.setProbabilities("WetGrass", [.95, .05, .9, .1, .8, .2, 0, 1])

net.addNode("SlipperyRoad")
net.addArc("Rain", "SlipperyRoad")
net.setProbabilities("SlipperyRoad", [.7, .3, 0, 1])

// answer the questions
let i_y = {Sprinkler: true}
let i_x = {Winter: false, Rain: false, SlipperyRoad: true}
console.log(`P(B=T|A=F,C=F,E=T) = ${net.infer(i_y, i_x)}`)

let ii_y = {Rain: true}
let ii_x = {WetGrass: true, Winter: false}
console.log(`P(C=T|D=T,A=F) = ${net.infer(ii_y, ii_x)}`)

let iii_y = {Winter: true}
let iii_x = {WetGrass: true, Rain: false}
console.log(`P(A=T|D=T,C=F) = ${net.infer(iii_y, iii_x)}`)

let iv_y = {Winter: true}
let iv_x = {SlipperyRoad: false}
console.log(`P(A=T|E=T) = ${net.infer(iv_y, iv_x)}`)

let v_y = {SlipperyRoad: true}
let v_x = {Winter: true}
console.log(`P(E=T|A=T) = ${net.infer(v_y, v_x)}`)

let vi_y = {Winter: true}
let vi_x = {WetGrass: true}
console.log(`P(A=T|D=T) = ${net.infer(vi_y, vi_x)}`)

let vii_y = {WetGrass: true}
let vii_x = {Winter: true}
console.log(`P(D=T|A=T) = ${net.infer(vii_y, vii_x)}`)

let viii_y = {Sprinkler: true}
let viii_x = {SlipperyRoad: true}
console.log(`P(B=T|E=T) = ${net.infer(viii_y, viii_x)}`)

let ix_y = {Sprinkler: true}
let ix_x = {SlipperyRoad: true, Winter: true}
console.log(`P(B=T|E=T,A=T) = ${net.infer(ix_y, ix_x)}`)

let x_y = {SlipperyRoad: true, Winter: true, WetGrass: true}
let x_x = {Sprinkler: true}
console.log(`P(E=T,A=T,D=T|B=T) = ${net.infer(x_y, x_x)}`)
