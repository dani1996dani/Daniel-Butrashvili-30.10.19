import React, { Component } from 'react';

class AutocompleteInput extends Component {

    state = {
        value: '',
        inputClassName: 'search',
        clickedOnSuggestion: false,
        shouldRenderAutoComplete: false,
        listenToKeyEvents: false,
        selectedIndex: -1,
        maxOptionsVisible: 5,
    }

    renderItem = (value, index) => {
        const selected = this.state.selectedIndex === index;
        return this.props.renderItem(value, selected, index);
    }

    selectValue = (value) => {
        this.props.onValueSelect(value);
        // this.setValue(value, false);
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
                // this.props.onValueSelect(filteredOptions[selectedIndex]);
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

    setValue = (value, allowParentCallback = true) => {
        if (allowParentCallback){
            this.props.onValueChange(value);
        }
        this.setState({
            value,
        });
    }

    getFilteredOptions = () => {
        const { value } = this.state;
        const { options } = this.props;
        const filteredOptions = this.props.filterSearch(options, value);
        // const filteredOptions = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
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
            <div style={{ width: '100%', position: 'absolute', top: 40, zIndex: 999 }}>
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
    
    componentDidUpdate(oldProps) {
        if (oldProps.options !== this.props.options){
            const filteredOptions = this.getFilteredOptions();
            const shouldRenderAutoComplete = filteredOptions.length > 0;
            this.setShouldRenderAutoComplete(shouldRenderAutoComplete);
        }
    }

    render() {
        const { shouldRenderAutoComplete } = this.state;
        const inputClassName = shouldRenderAutoComplete ? 'search open' : 'search';
        return (
            <div style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <input
                    value={this.props.value}
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