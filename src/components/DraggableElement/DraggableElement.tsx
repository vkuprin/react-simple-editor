import React, {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  CSSProperties,
} from "react";
import styles from "./Draggable.module.scss";

interface DraggableElementProps {
  x: number;
  y: number;
  number: number;
  onSelect: () => void;
  style?: CSSProperties;
}

const DraggableElement = ({
  x,
  y,
  number,
  onSelect,
  style,
}: DraggableElementProps): ReactElement => {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position.x, position.y],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    },
    [isDragging, offset.x, offset.y],
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = onMouseMove as EventListener;
    const handleMouseUp = onMouseUp as EventListener;

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  return (
    <div
      className={styles.draggable__element}
      style={{ left: position.x, top: position.y, ...style }}
      onMouseDown={onMouseDown}
      onClick={onSelect}
    >
      {number}
    </div>
  );
};

export default DraggableElement;
