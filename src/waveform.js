const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');

const audioContext = new AudioContext();
const audioSource = audioContext.createMediaElementSource(audioElement);
const analyser = audioContext.createAnalyser();

audioSource.connect(analyser);
analyser.connect(audioContext.destination);

function renderWaveform() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    analyser.getByteTimeDomainData(dataArray);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.beginPath();
    const sliceWidth = canvas.width / bufferLength;
    let x = 0;
  
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;
  
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
  
      x += sliceWidth;
    }
  
    ctx.stroke();
  
    requestAnimationFrame(renderWaveform);
  }
  
  renderWaveform();