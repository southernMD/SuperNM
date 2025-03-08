import type { VNode } from "vue";

type CardRotateElement = {
    scale?: number
    value:string | HTMLImageElement
}

type CardRotateElementStringValue = {
    [K in keyof CardRotateElement]: K extends 'value' ? string : CardRotateElement[K];
};

type NameListOption = {
    name:string
}
type NameListSplictOption = {
    [K in keyof NameListOption]: K extends 'name' 
        ? VNode
        : NameListOption[K]; 
};