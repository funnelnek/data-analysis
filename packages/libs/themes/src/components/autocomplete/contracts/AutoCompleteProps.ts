import { HTMLAttributes, ReactNode } from "react";


export interface AutoCompleteProps<T> extends HTMLAttributes<HTMLElement> {
    /**
     * Array of options.
     */
    options: T[];   
    /**
     * If true, the portion of the selected suggestion that has not been typed by the user, known as the completion string, appears inline after the input cursor in the textbox.
     * The inline completion string is visually highlighted and has a selected state.
     */
    autocomplete?: boolean;
    /**
     * If true, the first option is automatically highlighted.
     */
    autoHighlight?: boolean;
    /**
     * If true, the selected option becomes the value of the input when the Autocomplete loses focus unless the user chooses a different option or changes the character string in the input.
     * When using freeSolo mode, the typed value will be the input value if the Autocomplete loses focus without highlighting an option.
     */
    autoSelect?: boolean;
    /**
     * Control if the input should be blurred when an option is selected:
     * false the input is not blurred. - true the input is always blurred. - touch the input is blurred after a touch event. - mouse the input is blurred after a mouse event.
     */
    blurOnSelect?: 'mouse' | 'touch' | boolean;
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue?: any;    
    /**
     * If true, hide the selected options from the list box.
     */
    filterSelectedOptions?: boolean;
    /**
     * If provided, the options will be grouped under the returned string. 
     * The groupBy value is also used as the text for group headings when renderGroup is not provided.
     */
    groupBy?: (options: T) => string;
    /**
     * Render the input.
     * @param params Render the input.
     * @returns 
     */
    renderInput: (params: object) => ReactNode;
    /**
     * Render the option, use getOptionLabel by default.
     * @param props - The props to apply on the li element.
     * @param option - The option to render. 
     * @param state - The state of each option.
     * @param owner - The state of the Autocomplete component.
     * @returns {ReactNode}
     */
    renderOption?: (props: object, option: T, state: object, owner: object) => ReactNode;
    /**
     * Render the group.
     * @param params - The group to render.
     * @returns 
     */
    renderGroup?: (params: object) => ReactNode;
    /**
     * A function that determines the filtered options to be rendered on search.
     * @param options - The options to render.
     * @param state - The state of the component.
     * @returns {Array<T>}
     */    
    filterOptions?: <T>(options: T[], state: object) => T[];
    /**
     * Render the selected value.
     * @param value - The value provided to the component.
     * @param getTagProps - A tag props getter.
     * @param ownerState - The state of the Autocomplete component.
     * @returns {ReactNode}
     */
    renderTags?: (value: Array<T>, getTagProps: Function, ownerState: object) => ReactNode;
}