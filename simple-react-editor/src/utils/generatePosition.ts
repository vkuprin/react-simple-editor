import { Element } from "../components/Editor/Editor";

const generatePosition = (existingElements: Element[]): { x: number, y: number } => {
    let newX: number, newY: number;
    do {
        newX = Math.floor(Math.random() * 100);
        newY = Math.floor(Math.random() * 100);
    } while (existingElements.some(element => element.x === newX && element.y === newY));
    return { x: newX, y: newY };
};

export default generatePosition;