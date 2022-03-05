import React, { useEffect, useRef } from 'react';
import './App.css';
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let container = document.getElementById('map');

    let options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.978656),
      level: 6,
    };

    let map = new window.kakao.maps.Map(container, options);

    // const defs = document.getElementsByTagName('defs');
    // const pattern = document.createElement('pattern');
    // const img = document.createElement('image');
    // img.setAttribute('xlink:href', 'http://www.w3bai.com/css/img_lights.jpg');
    // img.setAttribute('x', '0');
    // img.setAttribute('y', '0');
    // pattern.appendChild(img);

    // pattern.id = 'test';
    // pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    // defs[0].appendChild(pattern);

    // for (let i = 0; i <= 1; i++) {
    //   let sw = new window.kakao.maps.LatLng(37.566826, 126.978656 + 0.01 * i);
    //   let nw = new window.kakao.maps.LatLng(37.567825, 126.988757 + 0.01 * i);

    //   const rectangleBounds = new window.kakao.maps.LatLngBounds(sw, nw);

    //   const rectangle = new window.kakao.maps.Rectangle({
    //     bounds: rectangleBounds, // 그려질 사각형의 영역정보입니다
    //     strokeWeight: 1, // 선의 두께입니다
    //     strokeColor: '#FF3DE5', // 선의 색깔입니다
    //     strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    //     strokeStyle: 'solid', // 선의 스타일입니다
    //     // fillColor: 'url(#test)', // 채우기 색깔입니다
    //     // fill: 'url(http://www.w3bai.com/css/img_lights.jpg)',
    //     fillOpacity: 0.8, // 채우기 불투명도 입니다
    //   });

    //   rectangle.setMap(map);

    //   var clickOption = {
    //     fillColor: '#A2FF99', // 채우기 색깔입니다
    //     fillOpacity: 0.7, // 채우기 불투명도 입니다
    //   };

    //   window.kakao.maps.event.addListener(rectangle, 'click', () => {
    //     rectangle.setOptions(clickOption);
    //   });
    // }

    console.log('loading kakaomap');
  }, []);

  const draw = (cameraOffset: { x: number; y: number }) => {
    const dpr = window.devicePixelRatio;
    const canvas = canvasRef.current;

    let arr: any = [];

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
    for (let i = 0; i < 10; i++) {
      arr.push([]);
      ctx.fillStyle = 'lightgreen';
      for (let j = 0; j < 10; j++) {
        arr[i].push({
          x: i,
          y: j,
          fill: 'lightgreen',
        });
        ctx.rect(100 * j, 100 * i, 100, 100);
      }
    }
    ctx.fill();
    ctx.stroke();

    console.log(arr);
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
        const a = document.getElementById('map');
        a?.addEventListener('click', () => {
          console.log('click');
        });
        a?.click();
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
      {/* <div className="App">
        <div id="map" style={{ width: '100%', height: '100vh' }} />
      </div> */}
      <canvas
        id="map"
        ref={canvasRef}
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          // zIndex: 1000,
          cursor: "url('http://t1.daumcdn.net/mapjsapi/images/2x/cursor/openhand.cur.ico') 7 5, url('http://t1.daumcdn.net/mapjsapi/images/2x/cursor/openhand.cur.ico'), move",
        }}></canvas>
    </div>
  );
}

export default App;
