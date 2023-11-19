import React, { useState, ReactElement } from "react";
import DraggableElement from "../DraggableElement/DraggableElement";
import styles from "./Editor.module.scss";

interface Element {
  id: number;
  x: number;
  y: number;
}

const Editor = (): ReactElement => {
  const [elements, setElements] = useState<Element[]>([]);

  const addElement = () => {
    const newElement: Element = {
      id: elements.length + 1,
      x: 50,
      y: 50,
    };
    setElements([...elements, newElement]);
  };

  return (
    <div className={styles.editor}>
      <button className={styles.editor__button} onClick={addElement}>
        Add Element
      </button>
      {elements.map((element) => (
        <DraggableElement key={element.id} />
      ))}
    </div>
  );
};

export default Editor;
