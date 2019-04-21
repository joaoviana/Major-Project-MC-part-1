let defaultAudioContext;
let defaultScene;
let defaultSound;
let defaultSoundSource;
let defaultSource;
let audioReady = false;

function initAudioDefault() {
  // Set room acoustics properties.
  let defaultDimensions = {
    width: 20,
    height: 20,
    depth: 20
  };

  let defaultMaterial = setAllRoomProperties("transparent");

  defaultAudioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create a (1st-order Ambisonic) ResonanceAudio scene.
  defaultScene = new ResonanceAudio(defaultAudioContext);

  // Send scene's rendered binaural output to stereo out.
  defaultScene.output.connect(defaultAudioContext.destination);

  defaultScene.setRoomProperties(defaultDimensions, defaultMaterial);

  //can add this into another function no?
  // Create an audio element. Feed into audio graph.
  defaultSound = document.createElement("audio");
  defaultSound.src = "./def.m4a";
  defaultSound.crossOrigin = "anonymous";
  
  defaultSound.load();

  defaultSoundSource = defaultAudioContext.createMediaElementSource(defaultSound);

  // Create a Source, connect desired audio input to it.
  defaultSource = defaultScene.createSource();
  defaultSource.setGain(0.9);
  defaultSoundSource.connect(defaultSource.input);
  audioReady = true;
}

initAudioDefault();

// a-frame components relating to the Resonance Audio SDK and audio context
AFRAME.registerComponent("register-room-property", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let front = sceneEl.querySelector("#front");
      let ground = sceneEl.querySelector("#ground-box");
      let left = sceneEl.querySelector("#left");
      let right = sceneEl.querySelector("#right");
      let back = sceneEl.querySelector("#back");
      let ceiling = sceneEl.querySelector("#ceiling");
      if(this.getAttribute('src') == '#transparent') {
        ground.setAttribute('visible', 'false');
        ground.setAttribute('material', 'color:white');
        ground.setAttribute('material', {src: ''});
        front.setAttribute('material', 'wireframe: true');
        front.setAttribute('material', {src: ''});
        left.setAttribute('material', 'wireframe: true');
        left.setAttribute('material', {src: ''});
        right.setAttribute('material', 'wireframe: true');
        right.setAttribute('material', {src: ''});
        back.setAttribute('material', 'wireframe: true');
        back.setAttribute('material', {src: ''});
        ceiling.setAttribute('material', 'wireframe: true');
        ceiling.setAttribute('material', {src: ''});
      } else {
        // height=0.001 
        ground.setAttribute('visible', 'true');
        ground.setAttribute('material', 'color:white');
        ground.setAttribute('material', {src: this.getAttribute('src')});
        front.setAttribute('material', 'wireframe: false');
        front.setAttribute('material', 'color:white');
        front.setAttribute('material', {src: this.getAttribute('src')});
        left.setAttribute('material', 'wireframe: false');
        left.setAttribute('material', 'color:white');
        left.setAttribute('material', {src: this.getAttribute('src')});
        right.setAttribute('material', 'wireframe: false');
        right.setAttribute('material', 'color:white');
        right.setAttribute('material', {src: this.getAttribute('src')});
        back.setAttribute('material', 'wireframe: false');
        back.setAttribute('material', 'color:white');
        back.setAttribute('material', {src: this.getAttribute('src')});
        ceiling.setAttribute('material', 'wireframe: false');
        ceiling.setAttribute('material', 'color:white');
        ceiling.setAttribute('material', {src: this.getAttribute('src')});
      }
      let dimensions = 20;
      let material = this.getAttribute("src").replace("#", "");
      defaultScene.setRoomProperties(
        setAllRoomDimensions(dimensions),
        setAllRoomProperties(material)
      );

    });
  }
});


// // high absorption, low reflection (Descending order)
// 'transparent' -   'fiber-glass-insulation' - 'acoustic-ceiling-tiles' - 'curtain-heavy' -   'grass'
// // almost no absorption, high reflection (Descending order)
// 'water-or-ice-surface' - 'polished-concrete-or-tile' - 'marble' - 'metal' -   'wood-ceiling'

// 'grass': absorbs well high frequency components, however it reflects most of low frequency components of a sound file


AFRAME.registerComponent("default-menu-info", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      // make a menu visible 
      // make two arrows visible
        // low-reflection materials
        // low-absorption materials
      // simulate how this object would sound like in different scenarios. 
      // The top row consists of high absorption/low reflection materials. Compare it with the bottom row!
      // Try 'marble' and then 'curtain-heavy'. When the whole room is made of a curtain-like fabric material, doesn't the sound
      // get a lot more attenuated than if the whole room was made of marble? The latter almost feels like these reflected sounds
      // are sharply firing back at you in all directions right? 
      // Materials in each row are in descending order.

      //another menu on top: curious fact! 

      // another one: try to leave the room, and come back ;) 
    });
  }
});