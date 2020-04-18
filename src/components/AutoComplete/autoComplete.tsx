import React, { FC, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebouncee'
import useClickOutSide from '../../hooks/useClickOutside'

interface DataSourceObject {
    value: string;
    number: number;
  }
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}



export const AutoComplete:FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props 

    const [ inputValue, setInputValue ] = useState(value as string)
    const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
    const [ loading, setLoading ] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const debouncedValue = useDebounce(inputValue, 500)
    const triggerSerach = useRef(false)
    const componentRef = useRef<HTMLInputElement>(null)
    useClickOutSide(componentRef, () => {
        setSuggestions([])
    })
    useEffect(() => {
        if(debouncedValue && triggerSerach.current) {
            const results = fetchSuggestions(debouncedValue)
            if(results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debouncedValue])
    const highlight = (index:number) => {
        if(index < 0) index = 0
        if(index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
        console.log('执行了键盘事件 highlightIndex', highlightIndex)
        console.log('执行了键盘事件 e.keyCode', e.keyCode)
        switch(e.keyCode) {
            case 13:
                if(suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
             
                break
            case 38:
                highlight(highlightIndex - 1)
                break 
            case 40:
                highlight(highlightIndex + 1)
                break
            case 27:
                setSuggestions([])
                break 
            default:
                break
        }
    }
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSerach.current = true
    }
    const handleSelect = (item:DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if(onSelect) {
            onSelect(item)
        }
        triggerSerach.current = false
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item 
    }
    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item',{
                        'item-highlighted': index === highlightIndex
                    })
                    return (
                        <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }
    return(
        <div className="viking-auto-complete" ref={componentRef}>
           <Input 
               value={inputValue}
               onChange={handleChange}
               onKeyDown={handleKeyDown}
               {...restProps} 
           /> 
           {loading && <ul><Icon icon="spinner" spin /></ul>}
           {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}

export default AutoComplete




   