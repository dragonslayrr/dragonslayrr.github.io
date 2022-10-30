document.getElementById("Foot").addEventListener("mouseover",(Data) =>{
    document.getElementById("FootIMG").style.opacity = "1"
})
document.getElementById("Foot").addEventListener("mouseout",(Data) =>{
    document.getElementById("FootIMG").style.opacity = "0"
})


document.getElementById("Button1").addEventListener("mouseover",(Data) =>{
    document.getElementsByClassName("Email")[0].style.color = "rgb(230, 250, 0)"
})
document.getElementById("Button1").addEventListener("mouseout",(Data) =>{
    document.getElementsByClassName("Email")[0].style.color = "rgb(75, 35, 0)"
})


document.getElementById("Button2").addEventListener("mouseover",(Data) =>{
    
    document.getElementsByClassName("Phone")[0].style.color = "rgb(230, 250, 0)"
})
document.getElementById("Button2").addEventListener("mouseout",(Data) =>{
    document.getElementsByClassName("Phone")[0].style.color = "rgb(75, 35, 0)"
})