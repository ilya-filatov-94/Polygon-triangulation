
function getPolygonVertexCoordinates(offsetX, offsetY, size, n) {
    if (n < 3) return;  //Если число сторон многоугольника <3 - ничего не рисуем, выходим
    let angle = 2 * Math.PI / n;
    let coordinates = [];
    let x, y;
    for (let i = 0; i < n; i++) {
        x = offsetX + size * Math.sin(i * angle);
        coordinates.push(x.toFixed(3));
        y = offsetY + size * Math.cos(i * angle);
        coordinates.push(y.toFixed(3));
    }
    return coordinates;
}

function paintPoligon(canvas, coordinates) {
    if (coordinates.length < 2) return;
    canvas.beginPath();
    canvas.moveTo(coordinates[1], coordinates[0]);
    for (let i = 2; i <= (coordinates.length - 1); i += 2) {
        canvas.lineTo(coordinates[i + 1], coordinates[i]);
    }
    canvas.closePath();
    canvas.stroke();
}

function getSumAreaTriangleFromPolygon(stackNodes, n, R, ofsetX, ofsetY) {

    if (n < 3) return;
    let vertexPolygonXY;
    vertexPolygonXY = createRightPoligon(ofsetX, ofsetY, R, n);
    let summArea = 0; 
    summArea = getAreaBigTriangle(n, stackNodes);

    getAreaSmallTriangle(stackNodes[0] + 1, stackNodes[1] - 1);
    getAreaSmallTriangle(stackNodes[1] + 1, stackNodes[2] - 1);
    getAreaSmallTriangle(stackNodes[2] + 1, n);

    function getAreaBigTriangle(n, arrStack) {
        let neighbourNodes = []; 
        let dataBigTriangle = [];
        let startNode = 1;
        let S = 0;

        for (let i = startNode + 1; i <= Math.ceil(n / 2); i++) {
            neighbourNodes.push([i, n - i + 2]);
        }

        for (let i = 0; i < neighbourNodes.length; i++) {
            let [n2, n3] = neighbourNodes[i];
            S = getAreaTriangleFromNumberVertex(startNode, n2, n3);
            dataBigTriangle.push({ n1: startNode, n2: n2, n3: n3, area: S });
        }
        let biggerArea = dataBigTriangle[0].area;
        let indexVertex = 0;
        for (let i = 0; i < dataBigTriangle.length; i++) {
            if (dataBigTriangle[i].area > biggerArea) {
                biggerArea = dataBigTriangle[i].area;
                indexVertex = i;
            }
        }
        arrStack.push(dataBigTriangle[indexVertex].n1);
        arrStack.push(dataBigTriangle[indexVertex].n2);
        arrStack.push(dataBigTriangle[indexVertex].n3);
        return biggerArea;
    }

    function getAreaSmallTriangle(n1, n2) {
        if ((n2 - n1) < 2) return;
        let S = 0;
        let dataSmallTriangle = [];
        for (let i = (n1 + 1); i <= (n2 - 1); i++) {
            S = getAreaTriangleFromNumberVertex(n1, i, n2);
            dataSmallTriangle.push({ n1: n1, n2: i, n3: n2, area: S });
        }

        let biggerArea = dataSmallTriangle[0].area;
        let indexVertex = 0;
        //Наибольшая площадь треугольника
        for (let i = 0; i < dataSmallTriangle.length; i++) {
            if (dataSmallTriangle[i].area > biggerArea) {
                biggerArea = dataSmallTriangle[i].area;
                indexVertex = i;
            }
        }
        stackNodes.push(dataSmallTriangle[indexVertex].n1);
        stackNodes.push(dataSmallTriangle[indexVertex].n2);
        stackNodes.push(dataSmallTriangle[indexVertex].n3);
        summArea += dataSmallTriangle[indexVertex].area;
        let apex = dataSmallTriangle[indexVertex].n2;

        if ((apex - n1 - 2) < 2) return;
        else {
            getAreaSmallTriangle(n1 + 1, apex - 1);
        }
        if ((n2 - apex - 2) < 2) return;
        else {
            getAreaSmallTriangle(apex + 1, n2 - 1);
        }
    }

    function createRightPoligon(ofsetX, ofsetY, R, n) {
        let angle = 2*Math.PI/n;
        let coordinates = [];
        let x, y;
        for (let i = 0; i < n; i++) {
            x = ofsetX + R * Math.sin(i * angle);
            y = ofsetY + R * Math.cos(i * angle);
            coordinates.push([x, y]);
        }
        return coordinates;
    }

    function getAreaTriangleFromNumberVertex(n1, n2, n3) {
        let distance1 = distance(vertexPolygonXY[n1 - 1], vertexPolygonXY[n2 - 1]);
        let distance2 = distance(vertexPolygonXY[n2 - 1], vertexPolygonXY[n3 - 1]);
        let distance3 = distance(vertexPolygonXY[n1 - 1], vertexPolygonXY[n3 - 1]);
        return getAreaTriangle(distance1, distance2, distance3);
    }

    function distance(p1, p2) {
        let [x1, y1] = p1;
        let [x2, y2] = p2;
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    function getAreaTriangle(side1, side2, side3) {
        side1 = parseFloat(side1);
        side2 = parseFloat(side2);
        side3 = parseFloat(side3);
        let halfPerimeter = 0.5 * (side1 + side2 + side3);
        return Math.sqrt(halfPerimeter * (halfPerimeter - side1) * (halfPerimeter - side2) * (halfPerimeter - side3));
    }

    return summArea.toFixed(6);
}

function paintTriangleInPolygon(canvas, coordinates, stackNodes) {
    let arrayYXPoligon = [];
    for (let i = 0; i < coordinates.length; i+=2) {
        arrayYXPoligon.push([coordinates[i+1], coordinates[i]]); 
    }
    let count = 0;
    for (let i = 0; i < stackNodes.length; i++) {
        ++count;
        if (count === 3) {
            paintTriangle([...arrayYXPoligon[stackNodes[i-2]-1], ...arrayYXPoligon[stackNodes[i-1]-1], ...arrayYXPoligon[stackNodes[i]-1]]);
            count = 0;
        }
    }

    function paintTriangle(coordinates) {
        let [x1, y1, x2, y2, x3, y3] = coordinates;
        canvas.beginPath();
        canvas.moveTo(x1, y1);
        canvas.lineTo(x2, y2);
        canvas.lineTo(x3, y3);
        canvas.closePath();
        canvas.fill();
    }
}

export {
    getPolygonVertexCoordinates, 
    paintPoligon, 
    getSumAreaTriangleFromPolygon, 
    paintTriangleInPolygon
};




