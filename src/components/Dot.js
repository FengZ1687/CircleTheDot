
import React, { Component } from 'react'

export default function Dot(props){

    return (
        <i className={props.value===0?"dot white":props.value===1?"dot yellow":"dot block"} ></i>
    )
}
