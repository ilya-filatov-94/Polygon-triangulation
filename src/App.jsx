import React, {useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Form from './components/Form';
import {
    getPolygonVertexCoordinates, 
    paintPoligon, 
    getSumAreaTriangleFromPolygon, 
    paintTriangleInPolygon
} from './paint_polygon';


function App(props) {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;
        drawFigures(props.initialData);
    }, []);

    function drawFigures(obj) {
        let canvasWidth = canvasRef.current.getBoundingClientRect().width;  
        let canvasHeight = canvasRef.current.getBoundingClientRect().height;
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;
        let offsetX = canvasWidth/2;
        let offsetY = canvasHeight/2;

        contextRef.current.strokeStyle = obj.color_line_polygon;
        contextRef.current.lineWidth = obj.width_lines;
        let PolygonXY = getPolygonVertexCoordinates(offsetY, offsetX, obj.radius, obj.n);
        paintPoligon(contextRef.current, PolygonXY);
        const stackVertexTriangles = [];
        getSumAreaTriangleFromPolygon(stackVertexTriangles, obj.n, obj.radius, offsetX, offsetY);

        contextRef.current.fillStyle = obj.color_fill_triangles;
        paintTriangleInPolygon(contextRef.current, PolygonXY, stackVertexTriangles);
    }

    return (
        <main>
            <Header title={props.title} />

            <Form initialData={props.initialData} updateObjData={drawFigures} />

            <canvas className='canvas-container' ref={canvasRef}></canvas>

        </main>
    );
}

App.propTypes = {
    title: PropTypes.string,
    initialData: PropTypes.shape({
        n: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        width_lines: PropTypes.number.isRequired,
        color_fill_triangles: PropTypes.string.isRequired,
        color_line_polygon: PropTypes.string.isRequired
    }),
};

App.defaultProps = {
    title: 'Разбиение N-угольника на треугольники',
};

export default App;
