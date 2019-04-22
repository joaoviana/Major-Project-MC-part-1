let defaultAudioContext;
let defaultScene;
let defaultSound;
let defaultSoundSource;
let defaultSource;
let introSound;
let introSoundSource;
let introSource;
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

  //can add this into another function no?
  // Create an audio element. Feed into audio graph.
  introSound = document.createElement("audio");
  introSound.src = "./intro.m4a";
  introSound.crossOrigin = "anonymous";
  
  introSound.load();

  introSoundSource = defaultAudioContext.createMediaElementSource(introSound);

  // Create a Source, connect desired audio input to it.
  introSource = defaultScene.createSource();
  introSource.setGain(0.9);
  introSoundSource.connect(introSource.input);
  setTimeout(() => {
    introSound.play();
  }, 5000);

  setTimeout(() => {
    introSound.play();
    defaultScene.setRoomProperties(
      setAllRoomDimensions(20),
      setAllRoomProperties('marble')
    );
  }, 50000);

  setTimeout(() => {
    defaultScene.setRoomProperties(
      setAllRoomDimensions(20),
      setAllRoomProperties('fiber-glass-insulation')
    );
  }, 61000);

  setTimeout(() => {
    defaultScene.setRoomProperties(
      setAllRoomDimensions(20),
      setAllRoomProperties('transparent')
    );
  }, 88000);


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

AFRAME.registerComponent("default-menu-info", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let infoMenu = sceneEl.querySelector("#info-menu");
      infoMenu.setAttribute('visible', 'true');
    });
  }
});

AFRAME.registerComponent("default-menu-info-close", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let infoMenu = sceneEl.querySelector("#info-menu");
      infoMenu.setAttribute('visible', 'false');
    });
  }
});