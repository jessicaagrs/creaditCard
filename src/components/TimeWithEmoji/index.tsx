import { useEffect, useState } from 'react';

function getEmojiAndGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return { emoji: '🌅', greeting: 'Bom dia' };
  if (hour >= 12 && hour < 18) return { emoji: '🌞', greeting: 'Boa tarde' };
  return { emoji: '🌙', greeting: 'Boa noite' };
}

export function TimeWithEmoji() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes().toString().padStart(2, '0');
  const second = time.getSeconds().toString().padStart(2, '0');
  const { emoji, greeting } = getEmojiAndGreeting(hour);

  return (
    <span>
      {emoji} {greeting} - {hour}:{minute}:{second}
    </span>
  );
}
