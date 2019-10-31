import React, { Component } from 'react';

class AutocompleteInput extends Component {

    state = {
        value: '',
        options: ['test', 'test2', 'test', 'test3', 'test66', 'te', 'te'],
        inputClassName: 'search',
        clickedOnSuggestion: false,
        shouldRenderAutoComplete: false,
        listenToKeyEvents: false,
        selectedIndex: -1,
        maxOptionsVisible: 5,
    }

    renderItem = (name, index) => {
        const selected = this.state.selectedIndex === index;
        console.log('selected', selected);
        return (
            <div key={index} className='autocomplete-label' style={{ backgroundColor: selected ? '#B1F3FB' : 'white' }} onMouseDown={() => {
                console.log('clicked');
                this.selectValue(name);
            }} >
                <span>{name}</span>
            </div>
        )
    }

    selectValue = (value) => {
        this.props.onValueSelect(value);
        this.setValue(value);
        this.setShouldRenderAutoComplete(false);
    }

    setClickedOnSuggestion = (bool) => {
        this.setState({
            clickedOnSuggestion: bool
        });
    }
    setShouldRenderAutoComplete = (bool) => {
        this.setState({
            shouldRenderAutoComplete: bool,
        });
    }

    getAmountOfOptionsVisible = () => {
        const filteredOptions = this.getFilteredOptions();
        const filteredOptionsAmount = filteredOptions.length;
        const { maxOptionsVisible } = this.state;
        if (filteredOptionsAmount < maxOptionsVisible)
            return filteredOptionsAmount;
        return maxOptionsVisible;
    }

    handleKeyDown = (event) => {
        const { shouldRenderAutoComplete } = this.state;
        if (!shouldRenderAutoComplete)
            return;

        const amountOfOptionsVisible = this.getAmountOfOptionsVisible();
        const filteredOptions = this.getFilteredOptions();
        const { selectedIndex } = this.state;
        switch (event.keyCode) {
            case 13:
                this.selectValue(filteredOptions[selectedIndex]);
                break;
            case 38: {
                let indexToSet = selectedIndex - 1;
                if (indexToSet < 0) {
                    indexToSet = amountOfOptionsVisible - 1;
                }
                this.setState({ selectedIndex: indexToSet });
            }
                break;
            case 40: {
                const indexToSet = (selectedIndex + 1) % amountOfOptionsVisible;
                this.setState({ selectedIndex: indexToSet });
            }
                break;
            default: return;
        }
        console.log('selectedIndex', this.state.selectedIndex);
    }

    setListenToKeyEvents = (bool) => {
        this.setState({
            listenToKeyEvents: bool
        });
        if (bool) {
            document.addEventListener('keydown', this.handleKeyDown);
        } else {
            document.removeEventListener('keydown', this.handleKeyDown);
        }
    }

    setValue = (value) => {
        this.props.onValueChange(value);
        this.setState({
            value,
        });
    }

    getFilteredOptions = () => {
        const { value, options } = this.state;
        const filteredOptions = options.filter((option) => option.includes(value));
        return filteredOptions;

    }

    renderAutoComplete = () => {
        const { shouldRenderAutoComplete, maxOptionsVisible } = this.state;
        if (!shouldRenderAutoComplete)
            return null;

        const items = [];
        const filteredOptions = this.getFilteredOptions();
        for (let i = 0; i < filteredOptions.length; i++) {
            const option = filteredOptions[i];
            const item = this.renderItem(option, i);
            items.push(item);
            //not allowing the AutoComplete div to display more than {maxOptionsVisible} items
            if (items.length >= maxOptionsVisible)
                break;
        }
        return (
            <div style={{ width: '100%', position: 'absolute', top: 40 }}>
                {items}
            </div>
        )
    }

    onInputChange = (e) => {
        this.setValue(e.target.value);
        const filteredOptions = this.getFilteredOptions();
        const shouldRenderAutoComplete = filteredOptions.length > 0;
        this.setShouldRenderAutoComplete(shouldRenderAutoComplete);
    }

    onInputBlur = () => {
        this.setShouldRenderAutoComplete(false);
        this.setListenToKeyEvents(false);
    }

    onInputFocus = () => {
        this.setListenToKeyEvents(true);
    }

    render() {
        const { shouldRenderAutoComplete } = this.state;
        const inputClassName = shouldRenderAutoComplete ? 'search open' : 'search';
        return (
            <div style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <input
                    value={this.state.value}
                    className={inputClassName}
                    placeholder='City Name'
                    onChange={(e) => { this.onInputChange(e) }}
                    onBlur={this.onInputBlur}
                    onFocus={this.onInputFocus}
                />
                {this.renderAutoComplete()}
            </div>
        );
    }
}

export default AutocompleteInput;