const doc  = document
const canv = doc.getElementById("canv")
const ctx  = canv.getContext("2d")


const config = {

  OZF: doc.getElementsByClassName("OZF")  [0],
  OOF: doc.getElementsByClassName("OOF")  [0],
  VAL: doc.getElementsByClassName("form") [0],
  INF: doc.getElementsByClassName("info") [0],
  CLS: doc.getElementsByClassName("clear")[0]

}

let c1 = c2 = c3 = 0

const OZF = () => {
    ++c1
    if( c1%2 )
    {
	let table = doc.createElement("div")
	table.innerHTML = "<input class=\"OZF_val\" placeholder=\"Область значения функции\">"
	table.classList.add("OZF_table")
	doc.getElementsByClassName("OZF_")[0].append( table )
    } else {
	doc.getElementsByClassName("OZF_table")[0].remove()
    }
}
const OOF = () => {
    ++c2
    if( c2%2 )
    {
	let table = doc.createElement("div")
	table.innerHTML = "<input class=\"OZF_val\" placeholder=\"Область определения функции\">"
        table.classList.add("OOF_table")
        doc.getElementsByClassName("OOF_")[0].append( table )
    } else {
        doc.getElementsByClassName("OOF_table")[0].remove()
    }
}
const INF = () => {
  ++c3
    if( c3%2 )
    {
        let table = doc.createElement("div")
        table.innerHTML = "<b>Область определения функции</b> - это область заданых значений с которых начнется и в которых закончится функция по координате X.<br><b>Область значений функции</b> - это область заданых значений с которых начинается и в которых закончится функция по координате Y.<br><span style=\"color: #e00;\">Две временные проблемы - используется <b>eval</b> и <b>X</b> необходимо записывать в скоубках.</span>"
        table.classList.add("INF_table")
        doc.getElementsByClassName("INF_")[0].append( table )
    } else {
        doc.getElementsByClassName("INF_table")[0].remove()
    }
}
const CLS = () => {
    for(let i=-450;i<=450; i++)
    {
	let y = eval(config.VAL.value.replace("x",i))
	console.log(y)
	if( y <= 450 )
	{
	    ctx.beginPath()
	    ctx.moveTo((i+449)*2, canv.height*.5-eval(config.VAL.value.replace("x",i-1)))
	    ctx.lineTo((i+450)*2, canv.height*.5-y)
	    ctx.stroke()
	}
    }
}

ctx.strokeStyle = "#000"
ctx.beginPath()

ctx.moveTo(canv.width*.5, canv.height)
ctx.lineTo(canv.width*.5, 0)
ctx.lineTo(canv.width*.5-10, 10)
ctx.moveTo(canv.width*.5+10, 10)
ctx.lineTo(canv.width*.5, 0)

ctx.moveTo(0, canv.height*.5)
ctx.lineTo(canv.width, canv.height*.5)
ctx.lineTo(canv.width-10, canv.height*.5-10)
ctx.lineTo(canv.width, canv.height*.5)
ctx.lineTo(canv.width-10, canv.height*.5+10)

ctx.stroke()

const lines = (coor,val) => {
    if( coor == "x" )
    {
	if( val >= canv.width-10 ) return
	ctx.beginPath()
	ctx.strokeStyle = "#000"
	ctx.moveTo(val+=10, canv.height*.5-5)
	ctx.lineTo(val, canv.height*.5+5)
	ctx.stroke()
	setTimeout( () => {lines("x", val)}, 10)
    } else if( coor == "y" )
    {
	if( val <= 10 ) return
        ctx.beginPath()
        ctx.moveTo(canv.width*.5-5, val-=10)
        ctx.lineTo(canv.width*.5+5, val)
        ctx.stroke()
        setTimeout( () => {lines("y", val)}, 20)
    }
}

lines("x",0)
lines("y",canv.height)
