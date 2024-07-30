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
                        // TODO: change styles to css file
                        style={{ width: "100%", display: 'block', padding: '5px' , backgroundColor: this.state.selected.has(item.id) ? 'red' : 'yellow'}}
                        key={item.id}
                        onClick={() => {
                            if (selected.size > 3) {
                                return
                            }

                            if (this.state.selected.has(item.id)) {
                                selected.delete(item.id)
                            } else if (selected.size < 3) {
                                selected.add(item.id)
                            } else {
                                return
                            }
                            this.setState({selected: new Set(selected)}) 
                        }}
                    >
                        {item.word}
                    </button>
                )
            })}
        </div>
        )
    }
}

