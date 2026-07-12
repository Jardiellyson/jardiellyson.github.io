//import { Parser } from "../../Parser.js";
import { Plot } from "./Utils/Plot.js";
import { Colors } from "./Utils/Colors.js";

const container = document.getElementById("container");

const canvas = Array.from(document.getElementsByClassName('canvas'));

canvas.forEach(element => {
    //console.log(element.dataset.function);
    let fun = new Function('x', 'return ' + element.dataset.function);
    let color = element.dataset.functionColor;

    let graph = new Plot(element);
    //graph.setHeight = 350;
    //graph.plotar(fun, Colors.orange);
});





let prevScrollPos = 0;
window.onscroll = function() {
    const header = this.document.getElementById("header");

    let currentScrollPos = window.pageYOffset;

    if(prevScrollPos > currentScrollPos) {
        header.style.top = "0";
    } else {
        header.style.top = "-100%";
    }
    prevScrollPos = currentScrollPos;
};