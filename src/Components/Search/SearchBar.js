import React, { Component } from 'react';

class SearchBar extends Component {

    state = {
        value: '',
        shouldRenderAutoComplete: false,
        listenToKeyEvents: false,
        selectedIndex: -1,
        maxOptionsVisible: 5,
        isPatternValid: true,
    }

    renderItem = (value, index) => {
        const selected = this.state.selectedIndex === index;
        return this.props.renderItem(value, selected, index);
    }

    selectValue = (value) => {
        this.props.onValueSelect(value);
        this.setShouldRenderAutoComplete(false);
    }

    resetSelectedIndex = () => {
        this.setState({
            selectedIndex: -1
        })
    }

    setShouldRenderAutoComplete = (bool) => {
        if (!bool){
            this.resetSelectedIndex();
        }
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
                if (selectedIndex < 0 || selectedIndex >= amountOfOptionsVisible)
                    return;
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
        //allowing only English letters and whitespace, without any numbers, as was asked in the PDF
        const regex = new RegExp(this.props.pattern);
        const { value } = e.target;
        const isPatternValid = value.length === 0 ? true : regex.test(value);
        this.setState({
            isPatternValid
        });
        if (value.length !== 0 && !isPatternValid){
            return;
        }
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

    getErrorText = () => {
        const { isPatternValid } = this.state;
        if (isPatternValid)
            return;
        return (
            <p style={{textAlign: 'left', color: 'red', fontSize: 14}}>{this.props.patternError}</p>
            );
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
                {this.getErrorText()}
                {this.renderAutoComplete()}
            </div>
        );
    }
}

export default SearchBar;