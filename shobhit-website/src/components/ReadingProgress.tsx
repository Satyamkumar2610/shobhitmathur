import { useScrollProgress } from '../hooks/useScroll';
import './ReadingProgress.css';

export default function ReadingProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div className="reading-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
