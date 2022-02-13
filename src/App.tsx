import { useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dpr = window.devicePixelRatio;
    const canvas = canvasRef.current;

    let cameraZoom = dpr;
    let MAX_ZOOM = 5;
    let MIN_ZOOM = 0.1;

    const centerX = document.body.clientWidth / 2;
    const centerY = document.body.clientHeight / 2;

    if (!canvas) return;
    canvas.addEventListener('mousedown', e => {
      console.log('mouse down');
      console.log(e.clientX, e.clientY);
    });
    canvas.addEventListener('mouseup', () => {
      console.log('mouse up');
    });
    canvas.addEventListener('mousemove', () => {
      console.log('mouse move');
    });

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = document.body.clientWidth * dpr;
    canvas.height = document.body.clientHeight * dpr;

    ctx.scale(cameraZoom, cameraZoom);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.rect(centerX - 50, centerY - 50, 100, 100);
    // ctx.closePath();
    ctx.stroke();
    console.log('asasa');
  }, []);

  return (
    <div
      className="App"
      style={{
        width: '100%',
        height: '100vh',
      }}>
      <div>Map</div>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}

export default App;
