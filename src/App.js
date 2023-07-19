import "./styles.css";
import React, { useState } from "react";

function elementsOverlap(newC, oldC) {
  let dx = newC.clientX - oldC.clientX;
  let dy = newC.clientY - oldC.clientY;

  let distanceBtnCircles = Math.sqrt(dx * dx + dy * dy);

  let sumOfRadii = 100 + 100;
  if (distanceBtnCircles < sumOfRadii) return true;

  return false;
}
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function App() {
  const [circles, setCircles] = useState([]);

  function handleclick(e) {
    const { clientX, clientY } = e;
    let newCircle = { clientX, clientY, backgroundColor: "red" };

    for (let oldCircle of circles) {
      // if the current circle is colliding with any existing update the background color of the current
      if (elementsOverlap(newCircle, oldCircle)) {
        newCircle["backgroundColor"] = getRandomColor();
        break;
      }
    }

    setCircles([...circles, newCircle]);
  }

  return (
    <div className="container" onClick={(e) => handleclick(e)}>
      {/* <h1>Detect overlapping circles in React</h1>
      https://learnersbucket.com/examples/interview/detect-overlapping-circles-in-react/ */}
      {circles.map((c, index) => {
        const { clientX, clientY, backgroundColor } = c;
        console.log({ clientX, clientY });
        return (
          <span
            key={index}
            className="circle"
            style={{ top: clientY, left: clientX, backgroundColor }}
          ></span>
        );
      })}
    </div>
  );
}
