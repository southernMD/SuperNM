export interface WorkCard{
    title:string
    background:string
    description:string
    descriptionColor:string
    descriptionOrder:-1 | 1
    icon:string
    maskCard?:MaskCard[]
    children?:WorkCard[]
    FDirection?:'row' | 'column'
}
export interface MaskCard{
    overlayDes:string
    msg:normalText | imgDiv
}

export interface normalText{
    title:string
    description:string
}

export interface imgDiv{
    imgHTML:string
}