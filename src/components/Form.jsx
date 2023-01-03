import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Input from './Input';


function Form(props) {
    const [angles, setNumberAngles] = useState('');
    const [radius, setRadiusCircle] = useState('');
    const [widthLines, setWidthLines] = useState('');
    const [colorFillTriangles, setColorFillTriangles] = useState('');
    const [colorLinePolygon, setcolorLinePolygon] = useState('');

    function changeNumberAngles(event) {
        if (!isNaN(parseInt(event.target.value))
            && event.target.value !== ''
            && event.target.value >= 3 && event.target.value <= 500) {
            setNumberAngles(event.target.angles);
            props.initialData.n = parseInt(event.target.value);
            props.updateObjData(props.initialData);
        }
        else {
            event.target.value = props.initialData.n;
        }
    }

    function changeValueRadius(event) {
        if (!isNaN(parseInt(event.target.value))
            && event.target.value !== ''
            && event.target.value >= 20 && event.target.value <= 300) {
            setRadiusCircle(event.target.radius);
            props.initialData.radius = parseInt(event.target.value);
            props.updateObjData(props.initialData);
        }
        else {
            event.target.value = props.initialData.radius;
        }
    }
    
    function changeWidthLines(event) {
        if (!isNaN(parseInt(event.target.value))
            && event.target.value !== ''
            && event.target.value >= 1 && event.target.value <= 10) {
            setWidthLines(event.target.widthLines);
            props.initialData.width_lines = parseInt(event.target.value);
            props.updateObjData(props.initialData);
        }
        else {
            event.target.value = props.initialData.width_lines;
        }
    }

    function changeColorFillTriangles(event) {
        setColorFillTriangles(event.target.colorFillTriangles);
        props.initialData.color_fill_triangles = event.target.value;
        props.updateObjData(props.initialData);
    }

    function changeColorLinePolygon(event) {
        setcolorLinePolygon(event.target.colorLinePolygon);
        props.initialData.color_line_polygon = event.target.value;
        props.updateObjData(props.initialData);
    }

    return (
        <form className="drawing-Data-form">

            <Input
                typeInput="number"
                textInput="Введите кол-во углов n-угольника n: "
                defaultValue={props.initialData.n}
                setDrawingProperties={changeNumberAngles}
            />

            <Input
                typeInput="number"
                textInput="Введите радиус описанной окружности R: "
                defaultValue={props.initialData.radius}
                setDrawingProperties={changeValueRadius}
            />

            <Input
                typeInput="number"
                textInput="Введите толщину линий: "
                defaultValue={props.initialData.width_lines}
                setDrawingProperties={changeWidthLines}
            />

            <Input
                typeInput="color"
                textInput="Задайте цвет заливки треугольников: "
                defaultValue={props.initialData.color_fill_triangles}
                setDrawingProperties={changeColorFillTriangles}
            />

            <Input
                typeInput="color"
                textInput="Задайте цвет линий: "
                defaultValue={props.initialData.color_line_polygon}
                setDrawingProperties={changeColorLinePolygon}
            />

        </form>
    );
}


Form.propTypes = {
    initial: PropTypes.shape({
        n: PropTypes.number.isRequired,
        radius: PropTypes.number.isRequired,
        width_lines: PropTypes.number.isRequired,
        color_fill_triangles: PropTypes.string.isRequired,
        color_line_polygon: PropTypes.string.isRequired
    }),
    updateObjData: PropTypes.func.isRequired
}


export default Form;
