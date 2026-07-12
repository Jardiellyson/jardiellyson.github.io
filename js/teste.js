import data from "../json/aulas.json" with { type: 'json'};

const container = document.getElementById("container");

//console.log(data);

Object.entries(data).forEach(([key, value]) => {


    let aula_button_div = document.createElement('div')
    aula_button_div.className = 'aula-button';
    let button_image_div = document.createElement('div');
    button_image_div.className = 'button_image';
    let button_content = document.createElement('div');
    let link = document.createElement('a');
    button_content.className = 'button_content';

    link.textContent = "Ir para " + value.titulo + " ";
    link.setAttribute('href', './matematica/' + key + '/index.html');

    button_content.append(link);
    aula_button_div.append(button_image_div);
    aula_button_div.append(button_content);
    container.append(aula_button_div);
    //console.log(key);
    //console.log(value);
});