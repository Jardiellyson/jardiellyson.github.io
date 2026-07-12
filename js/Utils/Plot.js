import { Colors } from "./Colors.js";

export class Plot { 
    

    

    #ctx;
    #altura;
    #largura;
    
    #escala = 50;

    #dominioX = {x: 2, y: 10};
    #dominioY = {x: 2, y: 10};

    #centroX;
    #centroY;

    #pressed = false;

    #lines = [];
    #dots = [];

    canvas;

    
    constructor(canvas) {

        this.canvas = canvas;
        
        
        this.#init();
    }


    

    #init() {

        this.#ctx = this.canvas.getContext("2d");
        this.#altura = this.canvas.height;
        this.#largura = this.canvas.width;
        this.#escala = ((this.#altura + this.#largura)/2) / 10;

        this.#centroX = this.#largura/2;
        this.#centroY = this.#altura/2;
        this.#draw();
        //this.#initEvents();

        let func = new Function('x', 'return ' + this.canvas.dataset.function);
        this.plotar(func, Colors.blue);
    }

    #draw() {
        this.#eixos();
        this.#grid();
    }

    #initEvents() {
                
        this.canvas.addEventListener('wheel', (event) => {
            event.preventDefault(); // Prevents page from natively scrolling
            
            // Check scroll direction
            if (event.deltaY > 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        });

        this.canvas.addEventListener('mousedown', (event) => {

            if(event.button != 0) return;

            this.#pressed = true;

        });

        this.canvas.addEventListener('mouseup', (event) => {

            if(event.button != 0) return;

            this.#pressed = false;
        });

        this.canvas.addEventListener('mousemove', (event) => {
            event.preventDefault(); // Prevents page from natively scrolling
            
            if(!this.#pressed) return;

            if (event.movementX >= 1) {
                this.setCentroX = this.getCentroX + event.movementX;
                this.update();
            }

            if (event.movementX <= -1) {
                this.setCentroX = this.getCentroX + event.movementX;
                this.update();
            }


            if (event.movementY >= 1) {
                this.setCentroY = this.getCentroY + event.movementY;
                this.update();
            }

            if (event.movementY <= -1) {
                this.setCentroY = this.getCentroY + event.movementY;
                this.update();
            }
        });
    }

    #eixos() {
        this.#ctx.beginPath();
        this.#ctx.strokeStyle = "#ccc";
        this.#ctx.lineWidth = ((this.#largura + this.#altura)/2)/100;
        this.#ctx.moveTo(0, this.#centroY);
        this.#ctx.lineTo(this.#largura, this.#centroY);

        this.#ctx.moveTo(this.#centroX, 0);
        this.#ctx.lineTo(this.#centroX, this.#altura);

        this.#ctx.stroke();
    }

    #grid() {

        this.#ctx.beginPath();
        this.#ctx.strokeStyle = "#C6D0F5";
        this.#ctx.lineWidth = ((this.#largura + this.#altura)/2)/500;

        for(let x = this.#centroX; x < this.#largura; x += this.#escala) {
            this.#ctx.moveTo(x, 0);
            this.#ctx.lineTo(x, this.#altura);
        }

        for(let x = this.#centroX; x > 0; x -= this.#escala) {
            this.#ctx.moveTo(x, 0);
            this.#ctx.lineTo(x, this.#altura);
        }

        for(let y = this.#centroY; y < this.#altura; y += this.#escala) {
            this.#ctx.moveTo(0, y);
            this.#ctx.lineTo(this.#largura, y);
        }

        for(let y = this.#centroY; y > 0; y -= this.#escala) {
            this.#ctx.moveTo(0, y);
            this.#ctx.lineTo(this.#largura, y);
        }

        this.#ctx.stroke();
    }

    plotar(func, cor = Colors.white, save = true) {
        this.#ctx.beginPath();
        this.#ctx.strokeStyle = cor;
        this.#ctx.lineWidth = ((this.#largura + this.#altura)/2)/100;

        if(save) this.#lines.push([func, cor]);


        for(let x_mat = -20; x_mat <= 20; x_mat += 0.01) {

            let y_mat = func(x_mat);

            let x_canvas = this.#centroX + (x_mat * this.#escala)
            let y_canvas = this.#centroY - (y_mat * this.#escala)

            if(x_mat === -20) {
                this.#ctx.moveTo(x_canvas, y_canvas);
            } else {
                this.#ctx.lineTo(x_canvas, y_canvas);
            }
        }
        this.#ctx.stroke();
    }

    update() {
        this.#ctx.clearRect(0, 0, this.#largura, this.#altura);
        //this.#init();
        this.#draw();
        this.#lines.forEach(line => {
            this.plotar(line[0], line[1], false);
        })

        this.#dots.forEach(dot => {
            this.pontuar(dot[0], dot[1], dot[2], false);
        })
    }

    pontuar(x, y, cor = Colors.white, save = true) {

        if(save) this.#dots.push([x, y, cor]);

        const x_canvas = this.#centroX + (x * this.#escala);
        const y_canvas = this.#centroY - (y * this.#escala);

        this.#ctx.beginPath();
        this.#ctx.arc(x_canvas, y_canvas, 7, 0, 2 * Math.PI); //raio 5px
        this.#ctx.fillStyle = cor;
        this.#ctx.fill();
        this.#ctx.strokeStyle = "#ffffff";
        this.#ctx.lineWidth = 2;
        this.#ctx.stroke();
    }

    clear() {
        this.#ctx.clearRect(0, 0, this.#largura, this.#altura);
        //this.#init();
        this.#draw();
    }

    zoomIn(zoom = 1) {
        this.setEscala = this.getEscala + 1;
        this.update();
    }

    zoomOut(zoom = 1) {
        if(this.getEscala > 1) this.setEscala = this.getEscala - 1;
        this.update();
    }


    get getAltura() {
        return this.#altura;
    }

    get getLargura() {
        return this.#largura;
    }

    get getCentroX() {
        return this.#centroX;
    }

    get getCentroY() {
        return this.#centroY;
    }

    get getEscala() {
        return this.#escala;
    }

    set setAltura(altura) {
        this.#altura = altura;
    }

    set setLargura(largura) {
        this.#largura = largura;
    }

    set setCentroX(centroX) {
        this.#centroX = centroX;
    }

    set setCentroY(centroY) {
        this.#centroY = centroY;
    }
    
    set setEscala(escala) {
        this.#escala = escala;
    }

    set setHeight(height) {
        this.canvas.style = `height: ${height}px;`
    }

}