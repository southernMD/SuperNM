import type { Book } from "@/types/Book"
import type { CardRotateElementStringValue, NameListOption } from "@/types/Card"
import type { Languages } from "@/types/Language"
import type { Topic, Video } from "@/types/Video"
import type { MaskCard, WorkCard } from "@/types/Work"

export const data: {
    topBarLink: any
    card: {
        labels: CardRotateElementStringValue[]
        nameList: NameListOption[]
    }
    carousel: {
        followersNNumber: number
        topCards: scrollingCard[]
        bottomCards: scrollingCard[]
    }
    workCard: WorkCard[]
    programmingLanguages: Languages[]
    game: {
        cloumn: (MaskCard & { minHeight?: string })[]
        row: (MaskCard & { minHeight?: string })[]
    }
    video:{
        videos: Video[]
        topics:Topic[]
    }
    chart:{
        timeChart:ConsistentData<svgData>
        colorList: string[]
    }
    book:Book[]
} = {
    topBarLink: {
        github: "#",
        x: "#",
        bilibili: "#",
        twitch: "#"
    },
    card: {
        labels: [
            { value: '超', scale: 5 },
            { value: '级', scale: 5 },
            { value: '大', scale: 2 }, // 文本
            { value: '牛' },
            { value: '马' },
            // 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 图片链接
            // 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgc3R5bGU9ImZpbGw6cmVkOyIvPgo8L3N2Zz4K', // Base64 SVG
            { value: '/vite.svg', scale: 1.5 }
        ],
        nameList: [
            { name: '南山有壶酒' },
            { name: 'southernMD' },
            { name: "超级牛马人" }
        ]
    },
    carousel: {
        followersNNumber: 789222,
        topCards: [
            {
                platform: 'Bilibili',
                followers: 14392,
                description: 'I\'m not only playing games. I treat video games as an experiment. Through games, I study behavioral psychology, product design, decision making, and aesthetics.',
                gradient: 'linear-gradient(45deg, #FB7299, #FC9DB6)',
                link: "#"
            },
        ],
        bottomCards: [
            {
                platform: 'YouTube',
                followers: 17000,
                description: 'Gaming and tech tutorials with in-depth analysis and guides.',
                gradient: 'linear-gradient(45deg, #FF0000, #282828)',
                link: "#"
            },
            {
                platform: 'Discord',
                followers: 5000,
                description: 'Join our community of tech enthusiasts and gamers.',
                gradient: 'linear-gradient(45deg, #7289DA, #424549)',
                link: "#"
            },
            {
                platform: 'Instagram',
                followers: 8500,
                description: 'Daily tech insights and behind-the-scenes moments.',
                gradient: 'linear-gradient(45deg, #833AB4, #FD1D1D)',
                link: "#"
            }
        ]
    },
    workCard: [
        {
            title: 'Microsoft',
            background: '#2b3647',
            description: 'I have worked at Microsoft for 4 years, developed multiple products.',
            descriptionOrder: -1,
            icon: `<i class="iconfont icon-bilibili"></i>`,
            descriptionColor: 'white',
            FDirection: 'column',
            maskCard: [
                {
                    overlayDes: "Lorem ipsum dolor sit amet consectetu",
                    msg: {
                        title: 'helloWorld',
                        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
                    }
                },
            ],
            children: [
                {
                    title: 'Microsoft WebView2',
                    background: 'white',
                    description: 'A WebView control based on Chromium for Windows and Mac. The Mac version isn\'t released yet.',
                    descriptionOrder: 1,
                    icon: `<i class="iconfont icon-bilibili"></i>`,
                    descriptionColor: 'black',
                    children: [],
                    maskCard: [
                        {
                            overlayDes: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
                            msg: {
                                title: 'helloWorld',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
                            }
                        },
                        {
                            overlayDes: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
                            msg: {
                                title: 'helloWorld',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
                            }
                        },
                    ],
                },
            ],
        }
    ],
    programmingLanguages: [
        {
            name: "Python",
            sentence: "吾乃万法之王，简洁如风，却掌控万物之脉络，数据与算法皆为我所驱使！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "JavaScript",
            sentence: "我是网页的守护者，前端与后端的双生之魂，浏览器皆为我之领域，万物皆可异步！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "Java",
            sentence: "跨平台之霸主，虚拟机为我之铠甲，一次编写，随处运行，众生皆需臣服！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "C++",
            sentence: "我是速度与力量的化身，内存为我之战场，指针如剑，直指核心，无人能敌！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "C#",
            sentence: "微软之刃，Unity之魂，游戏与企业的双生王者，.NET之力为我所用！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "PHP",
            sentence: "我是Web的古老守护者，虽被世人轻视，却依然屹立不倒，服务器为我之领域！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "Ruby",
            sentence: "优雅如诗，简洁如画，Rails为我之翼，开发者皆为我之信徒！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "Go",
            sentence: "我是并发之王者，轻量如羽，却迅捷如雷，云原生世界为我所掌控！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "Swift",
            sentence: "苹果之刃，iOS与macOS的守护者，简洁与安全并存，未来由我书写！",
            percentage: Math.floor(Math.random() * 101)
        },
        {
            name: "Kotlin",
            sentence: "我是Java的继承者，Android的新王，简洁与强大并存，旧时代的终结者！",
            percentage: Math.floor(Math.random() * 101)
        }
    ],
    game: {
        cloumn: [
            {
                msg: '/10.jpg',
                overlayDes: 'Miku',
                minHeight: '200px'
            },
            {
                msg: '/12.jpg',
                overlayDes: '古明地恋',
                minHeight: '200px'
            },
            {
                msg: '/16.jpg',
                overlayDes: '魔理沙 & 辉针城',
                minHeight: '200px'
            }
        ],
        row: [
            {
                msg: '/436.jpg',
                overlayDes: '物部布都 & 苏我屠自古',
                minHeight: '300px'
            },
            {
                msg: '/541.jpg',
                overlayDes: '洩矢诹访子',
                minHeight: 'auto'
            }
        ]
    },
    video: {
        videos: [
            {
                cover: '/10.jpg',
                title: '真实抽象',
                overlayDes: " elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium invento"
            },
            {
                cover: '/10.jpg',
                title: '伪随机',
                overlayDes: " elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium invento"
            },
            {
                cover: '/10.jpg',
                title: '神拉上级',
                overlayDes: " elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium invento"
            },
            {
                cover: '/10.jpg',
                title: '全网最全',
                overlayDes: " elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium invento"
            },
        ],
        topics: [
            { txt: 'Skinner Box', link: "#" },
            { txt: 'MDA Framework', link: "#" },
            { txt: 'Risk & Return', link: "#" },
            { txt: 'Game Balance', link: "#" },
            { txt: 'Dynamic Adjustment', link: "#" },
            { txt: 'Emergent', link: "#" },
            { txt: 'Motivation Crowding', link: "#" }
        ]
    },
    chart:{
        timeChart:[
            { age: -1, study: 0, game: 0, coding: 0, social: 100 },
            { age: 5, study: 50, game: 20, coding: 0, social: 30 },
            { age: 10, study: 40, game: 30, coding: 0, social: 30 },
            { age: 15, study: 35, game: 25, coding: 0, social: 40 },
            { age: 20, study: 30, game: 20, coding: 30, social: 20 },
            { age: 25, study: 20, game: 10, coding: 50, social: 20 },
            { age: 28, study: 20, game: 10, coding: 50, social: 20 },
        ],
        colorList: ["#66CCFF", "#39C5BB", "#FF6600", "#9999ff"]
    },
    book:[
        { link: "void(0)", author: "miku", title: "miku", image: "/10.jpg", width: 150, height: 200, size: 20,position:"right" },
        { link: "void(0)", author: "miku", title: "miku", image: "/10.jpg" },
        { link: "void(0)", author: "miku", title: "miku", image: "/10.jpg" },
        { link: "void(0)", author: "miku", title: "miku", image: "/10.jpg" },
        { link: "void(0)", author: "miku", title: "miku", image: "/10.jpg" },
    ]
}