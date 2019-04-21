var cameraPosition;

AFRAME.registerComponent("listener", {
  init() {
    this.cameraMatrix4 = new AFRAME.THREE.Matrix4();
  },
  tick: function() {
    this.cameraMatrix4 = this.el.object3D.matrixWorld;
    if (defaultScene)  {
      defaultScene.setListenerFromMatrix(
        new THREE.Matrix4().multiplyMatrices(
          new THREE.Matrix4().getInverse(this.el.object3D.matrixWorld),
          this.el.sceneEl.camera.el.object3D.matrixWorld
        )
      );
    }
  }
});

AFRAME.registerComponent("sound-source", {
  init: function() {
    this.wpVector = new THREE.Vector3();
    var isPlaying = false;
    
    this.el.addEventListener("click", function() {
      
      if (defaultAudioContext) defaultAudioContext.resume();

      if (isPlaying == false && defaultSound) {
        this.setAttribute("color", "green");
        defaultSound.play();
        isPlaying = true;
      } else if (isPlaying == true && defaultSound) {
        this.setAttribute("color", "purple");
        defaultSound.pause();
        isPlaying = false;
      }
    });
  },

  tick: function() {
    if (defaultSource) {
      var cameraEl = this.el.sceneEl.camera.el;
      defaultSource.setFromMatrix(new THREE.Matrix4().getInverse(new THREE.Matrix4().multiplyMatrices(
          new THREE.Matrix4().getInverse(this.el.object3D.matrixWorld),
          cameraEl.object3D.matrixWorld)
      ));
    }
  }
});

AFRAME.registerComponent("animate-menu-on-hover", {
  init: function() {
    this.el.addEventListener("mouseover", function(evt) {
      this.object3D.scale.set(0.7, 0.7, 0.7);
    });
    this.el.addEventListener("mouseout", function(evt) {
      this.object3D.scale.set(1, 1, 1);
    });
  }
});

AFRAME.registerComponent("animate-default-menu-item-on-hover", {
  init: function() {
    this.el.addEventListener("mouseover", function(evt) {
      this.object3D.scale.set(0.9, 0.9, 0.05);
    });
    this.el.addEventListener("mouseout", function(evt) {
      this.object3D.scale.set(0.7, 0.7, 0.03);
    });
  }
});

AFRAME.registerComponent("animate-menu-item-on-hover", {
  init: function() {
    this.el.addEventListener("mouseover", function(evt) {
      this.object3D.scale.set(0.3, 0.3, 0.05);
    });
    this.el.addEventListener("mouseout", function(evt) {
      this.object3D.scale.set(0.27, 0.27, 0.03);
    });
  }
});