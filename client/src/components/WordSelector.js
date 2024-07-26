import { useState } from 'react'
import React,  { Component} from 'react';


export default class WordSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: new Set()};
    }

    isFull() {
        return this.state.selected.size === 3
    }

    reset(){
        this.setState({ selected: new Set()});
    }

    render () {
        const { exp } = this.props
        const list = exp.words
        return (
        <div>
            {list.map((item) => {
                let selected = this.state.selected
                console.log(selected)
                return (
                    <button
                        style={{ display: 'block', padding: '5px' }}
                        key={item.id}
                        onClick={() => {
                            if (selected.size > 3) {
                                return
                            }

                            if (this.state.selected.has(item.id)) {
                                console.log("borro")
                                selected.delete(item.id)
                                console.log(selected)
                            } else if (selected.size < 3) {
                                selected.add(item.id)
                            } else {
                                return
                            }
                            this.setState({selected: new Set(selected)}) 
                        }}
                    >
                        {this.state.selected.has(item.id) ? '(x) ' : '( ) '}
                        {item.word}
                    </button>
                )
            })}
        </div>
        )
    }
}

