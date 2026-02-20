let speechEnabled = true;

export function setSpeechEnabled(enabled: boolean): void {
  speechEnabled = enabled;
}

export function speak(text: string): void {
  if (!speechEnabled || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.1;
  utterance.pitch = 1.0;
  utterance.volume = 0.9;

  window.speechSynthesis.speak(utterance);
}

export function cancelSpeech(): void {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
