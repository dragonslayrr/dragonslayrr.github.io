const idArr = ["hwkRmd", "physSim", "TDRL", "PDC"];

idArr.forEach((ael) => {
    document.getElementById(ael).style.display = "none";
});

function showImg(id) {
    if (document.getElementById(id).style.display == "none") {
        idArr.forEach((ael) => {
            document.getElementById(ael).style.display = "none";
        });
        document.getElementById(id).style.display = "flex";
    } else {
        document.getElementById(id).style.display = "none";
    }
}
