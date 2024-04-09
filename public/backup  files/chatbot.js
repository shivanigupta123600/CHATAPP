let ApiKey: string = "paste your chatbot js token";

document.getElementById("input").addEventListener('click', () : void => {
    if (document.getElementById('input').value != ''){
        document.getElementsByClassName('search')[0].computedStyleMap.boxShadow  =`5px 5px 10px rgb(0,0,0.5),
    inset 5px 5px 10px rgb(0, 0, 0.5);`
        
    } else {
        document.getElementsByClassName('search')[0].computedStyleMap.boxShadow  =`5px 5px 10px rgb(0,0,0.5),
    inset 5px 5px 10px rgb(255, 0, 0.5);`
    }
})
