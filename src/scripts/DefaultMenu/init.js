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

  console.log('default source: ', defaultSource);
  console.log('default scene: ', defaultScene);
  console.log('default audio context: ', defaultAudioContext);
}

initAudioDefault();

// a-frame components relating to the Resonance Audio SDK and audio context
AFRAME.registerComponent("register-room-property", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let dimensions = 20;
      let material = this.getAttribute("src").replace("#", "");
      defaultScene.setRoomProperties(
        setAllRoomDimensions(dimensions),
        setAllRoomProperties(material)
      );
    });
  }
});