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

    const generateUniquePosition = (existingElements: Element[]): { x: number, y: number } => {
        let newX: number, newY: number;
        do {
            newX = Math.floor(Math.random() * 100); // Adjust range as needed
            newY = Math.floor(Math.random() * 100); // Adjust range as needed
        } while (existingElements.some(element => element.x === newX && element.y === newY));
        return { x: newX, y: newY };
    };

    const addElement = useCallback(() => {
        const { x, y } = generateUniquePosition(elements);
        setElements(prevElements => [
            ...prevElements,
            { id: prevElements.length + 1, x, y }
        ]);
    }, [elements]);

    const removeLastElement = useCallback(() => {
        setElements(prevElements => prevElements.slice(0, -1));
    }, []);

    return (
        <div className={styles.editor}>
            <button className={styles.editor__button} onClick={addElement}>
                Add Element
            </button>
            <button className={styles.editor__button} onClick={removeLastElement}>
                Remove Element
            </button>
            {elements.map((element, index) => (
                <MemoizedDraggableElement key={element.id} x={element.x} y={element.y} number={index}/>
            ))}
        </div>
    );
};

export default Editor;
