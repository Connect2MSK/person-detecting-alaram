import { throttle } from "lodash";

export const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const font = "2.5rem sans-serif";
  ctx.font = font;
  ctx.textBaseLine = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const isPerson = prediction.class === "person";

    //bounding Box
    ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = `rgba(255,0,0 ${isPerson ? 0.2 : 0})`;
    ctx.fillRect(x, y, width, height);

    //draw the label background
    ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10);
    ctx.fillRect(x, y, textWidth, textHeight);

    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
    if (isPerson) {
      // playAudio();
    }
  });
};

const playAudio = throttle(() => {
  const audio = new Audio("/preview.mp3");
  audio.play();
}, 2000);
