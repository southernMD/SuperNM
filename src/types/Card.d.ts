type CardRotateElement = {
    scale?: number
    value:string | HTMLImageElement
}

type CardRotateElementStringValue = {
    [K in keyof CardRotateElement]: K extends 'value' ? string : CardRotateElement[K];
};

