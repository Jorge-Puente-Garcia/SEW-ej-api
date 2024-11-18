class Semafro{
  levels = [0.2,0.5,0.8];
  lights = 4;
  unload_moment = null;
  clic_moment = null;
  
  constructor(){
    this.dificulty = Math.random(0,3);
    this.createStructure();
  } 
  
  createStructure(){  
  var main=document.querySelector('main');
  var h3= document.createElement("h3");
  h3.innerText = "Semáfro";
  
  for(let i=0;i<this.lights;i++){
    var light = document.createElement("div");
    main.appendChild(light);
  }

  var boton1 = document.createElement("button");
  var contextoActual = this;
  boton1.onclick = function(){
  contextoActual.initSequence();
  }
  var boton2 = document.createElement("button");
  boton2.onclick = function(){
    contextoActual.stopReaction();
    boton2.disabled = true;
    boton1.disabled = false;
    }
  boton1.innerText = "Iniciar";
  boton2.innerText = "Reacción";
  main.appendChild(boton1);
  main.appendChild(boton2);
}

initSequence() {
  document.querySelector('button').disabled = true;
  document.querySelector('main').classList.add('load');
  setTimeout(() => {
    this.endSecuence();
  },(this.dificulty*100)+2000);
  
}
endSecuence(){
  document.querySelector('main').classList.add('unload');
  document.querySelector('button').disabled = false;
  this.unload_moment = new Date();
}

stopReaction(){
  this.clic_moment = new Date();
  var reactionTime = this.clic_moment - this.unload_moment;
  var parrafo = document.createElement("p");
  parrafo.innerText = "Tu tiempo de reacción ha sido de: "+reactionTime+"ms";
  document.querySelector('main').appendChild(parrafo);
  document.querySelector('main').classList.remove('unload');
  document.querySelector('main').classList.remove('load');
}

}
