import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (cameraOffset: { x: number; y: number }) => {
    const dpr = window.devicePixelRatio;
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = document.body.clientWidth * dpr;
    canvas.height = document.body.clientHeight * dpr;

    if (!ctx) return;

    const centerX = document.body.clientWidth / 2;
    const centerY = document.body.clientHeight / 2;
    ctx.scale(dpr / 2, dpr / 2);
    ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    // ctx.translate(centerX, centerY);
    ctx.translate(-centerX / 2 + cameraOffset.x * 1.5 - 50, -centerY / 2 + cameraOffset.y * 1.5 - 50);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1000, 1000);

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'lightgreen';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        ctx.rect(100 * j, 100 * i, 100, 100);
      }
    }
    ctx.fill();
    ctx.stroke();

    console.log('move1');
  };

  useEffect(() => {
    const dpr = window.devicePixelRatio;
    const canvas = canvasRef.current;

    let cameraZoom = dpr;
    let MAX_ZOOM = 5;
    let MIN_ZOOM = 0.1;

    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let cameraOffset = {
      x: document.body.clientWidth / 2,
      y: document.body.clientHeight / 2,
    };
    if (!canvas) return;

    // const ctx = canvas.getContext('2d');

    // canvas.width = document.body.clientWidth * dpr;
    // canvas.height = document.body.clientHeight * dpr;

    // if (!ctx) return;

    const pointDown = (e: MouseEvent) => {
      isDragging = true;
      // setDragStart({
      //   x: e.clientX / cameraZoom - cameraOffset.x,
      //   y: e.clientY / cameraZoom - cameraOffset.y,
      // });
      // const {x,y} = pointDownn(e,isDragging,cameraZoom);
      dragStart.x = e.clientX / cameraZoom - cameraOffset.x;
      dragStart.y = e.clientY / cameraZoom - cameraOffset.y;
    };

    const pointUp = () => {
      isDragging = false;
    };

    const pointMove = (e: MouseEvent) => {
      if (isDragging) {
        // setCameraOffset({
        //   x: e.clientX / cameraZoom - dragStart.x,
        //   y: e.clientY / cameraZoom - dragStart.y,
        // });
        cameraOffset.x = e.clientX / cameraZoom - dragStart.x;
        cameraOffset.y = e.clientY / cameraZoom - dragStart.y;
        draw(cameraOffset);
      }
    };

    draw(cameraOffset);
    canvas.addEventListener('mousedown', pointDown);
    canvas.addEventListener('mouseup', pointUp);
    canvas.addEventListener('mousemove', pointMove);

    canvas.addEventListener('click', e => {
      console.log(e.clientX, e.clientY);
    });

    return () => {
      canvas.removeEventListener('mousedown', pointDown);
      canvas.removeEventListener('mouseup', pointUp);
      canvas.removeEventListener('mousemove', pointMove);
    };
  }, []);

  // useEffect(() => {
  //   draw();
  // }, [cameraOffset, draw]);

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
