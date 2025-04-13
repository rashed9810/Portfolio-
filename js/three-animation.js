document.addEventListener("DOMContentLoaded", function () {
  // Basic Three.js setup
  const canvas = document.getElementById("three-canvas");

  function getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  let scene, camera, renderer, cube, particleSystem;
  const clock = new THREE.Clock();
  const sizes = getWindowSize();

  // Make sure Three.js canvas stays visible in mobile menu
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenu && canvas) {
    // Adjust canvas when mobile menu opens/closes
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "class") {
          if (mobileMenu.classList.contains("active")) {
            canvas.style.filter = "blur(5px)";
          } else {
            canvas.style.filter = "none";
          }
        }
      });
    });

    observer.observe(mobileMenu, { attributes: true });

    // Close menu when clicking on the menu background
    mobileMenu.addEventListener("click", function (e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
        canvas.style.filter = "none";
      }
    });
  }

  function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    createHeroCube();
    createParticles();

    window.addEventListener("resize", onWindowResize);
    animate();
  }

  function createHeroCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.6, 0.5, 0.5),
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    updateCubePosition();
  }

  function updateCubePosition() {
    if (window.innerWidth > 992) {
      const cubeContainer = document
        .querySelector(".floating-cube")
        .getBoundingClientRect();
      const targetX =
        ((cubeContainer.left + cubeContainer.width / 2) / window.innerWidth) *
          4 -
        2;
      const targetY =
        (-(cubeContainer.top + cubeContainer.height / 2) / window.innerHeight) *
          4 +
        2;

      cube.position.set(targetX, targetY, 0);
      cube.scale.set(1.2, 1.2, 1.2);
    } else {
      cube.position.set(0, -1, 0);
      cube.scale.set(1, 1, 1);
    }
  }

  function createParticles() {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color = new THREE.Color();
    const colorOptions = [
      "#3a86ff", // blue
      "#8338ec", // purple
      "#ff006e", // pink
      "#fb5607", // orange
      "#ffbe0b", // yellow
      "#06d6a0", // teal
    ];

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles more widely
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Use predefined colors for more vibrant particles
      const randomColor =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];
      color.set(randomColor);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Vary the sizes more for visual interest
      sizes[i] = Math.random() * 0.3 + 0.1;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
  }

  function onWindowResize() {
    const newSizes = getWindowSize();

    camera.aspect = newSizes.width / newSizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(newSizes.width, newSizes.height);
    updateCubePosition();
  }

  // Performance optimization variables
  let isScrolling = false;
  let scrollTimeout;
  let animationQuality = 1; // 1 = full quality, 0.5 = half quality, etc.
  let skipFrames = 0;
  let frameCount = 0;

  // Detect scrolling to reduce animation quality
  window.addEventListener("scroll", () => {
    isScrolling = true;
    animationQuality = 0.3; // Reduce quality while scrolling
    skipFrames = 2; // Skip frames during scrolling

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      animationQuality = 1; // Restore full quality
      skipFrames = 0;
    }, 200);
  });

  function animate() {
    requestAnimationFrame(animate);

    // Skip frames during scrolling for better performance
    frameCount++;
    if (skipFrames > 0 && frameCount % (skipFrames + 1) !== 0) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();

    if (cube) {
      cube.rotation.x = elapsedTime * 0.2;
      cube.rotation.y = elapsedTime * 0.3;
      cube.rotation.z = elapsedTime * 0.1;
    }

    if (particleSystem) {
      // Slower rotation for more subtle movement
      particleSystem.rotation.x = elapsedTime * 0.03;
      particleSystem.rotation.y = elapsedTime * 0.01;

      // Only update particle positions at full quality
      if (animationQuality === 1) {
        // Make particles move in a more interesting pattern
        const positions = particleSystem.geometry.attributes.position.array;

        // Optimize by updating fewer particles
        const updateStep = isScrolling ? 9 : 3; // Update every 3rd or 9th particle

        for (let i = 0; i < positions.length; i += 3 * updateStep) {
          // Add subtle wave motion
          positions[i] += Math.sin(elapsedTime * 0.2 + i * 0.001) * 0.001;
          positions[i + 1] += Math.cos(elapsedTime * 0.15 + i * 0.001) * 0.001;

          // Reset particles that go too far
          const distance = Math.sqrt(
            positions[i] * positions[i] +
              positions[i + 1] * positions[i + 1] +
              positions[i + 2] * positions[i + 2]
          );

          if (distance > 10) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
          }
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      }
    }

    renderer.render(scene, camera);
  }

  // Initialize Three.js
  init();
});
