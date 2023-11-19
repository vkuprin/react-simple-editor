import React, { useState, useCallback, ReactElement } from "react";
import DraggableElement from "../DraggableElement/DraggableElement";
import styles from "./Editor.module.scss";

interface Element {
  id: number;
  x: number;
  y: number;
}

const MemoizedDraggableElement = React.memo(DraggableElement);

const Editor = (): ReactElement => {
  const [elements, setElements] = useState<Element[]>([]);

  const addElement = useCallback(() => {
    setElements(prevElements => [
      ...prevElements,
      { id: prevElements.length + 1, x: 50, y: 50 }
    ]);
  }, []);

  return (
      <div className={styles.editor}>
        <button className={styles.editor__button} onClick={addElement}>
          Add Element
        </button>
        {elements.map((element) => (
            <MemoizedDraggableElement key={element.id} x={element.x} y={element.y} />
        ))}
      </div>
  );
};

export default Editor;
