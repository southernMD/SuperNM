export interface Book{
    image: string
    title: string
    link?: string | undefined
    position?: 'left' | 'right'
    size?: number | undefined
    width?: number | undefined
    height?: number | undefined
    author: string
}