type DataItem = {
    age: number;
    [key: string]: number;
};
type AgeValue = -1 | 5 | 10 | 15 | 20 | 25 | 28;
type UniqueAgeTuple<T extends AgeValue[]> = T extends [
    infer A1,
    infer A2,
    infer A3,
    infer A4,
    infer A5,
    infer A6,
    infer A7
]
    ? A1 extends AgeValue
    ? A2 extends Exclude<AgeValue, A1>
    ? A3 extends Exclude<AgeValue, A1 | A2>
    ? A4 extends Exclude<AgeValue, A1 | A2 | A3>
    ? A5 extends Exclude<AgeValue, A1 | A2 | A3 | A4>
    ? A6 extends Exclude<AgeValue, A1 | A2 | A3 | A4 | A5>
    ? A7 extends Exclude<AgeValue, A1 | A2 | A3 | A4 | A5 | A6>
    ? [DataItem & { age: A1 }, DataItem & { age: A2 }, DataItem & { age: A3 }, DataItem & { age: A4 }, DataItem & { age: A5 }, DataItem & { age: A6 }, DataItem & { age: A7 }]
    : never
    : never
    : never
    : never
    : never
    : never
    : never
    : never;
type svgData = UniqueAgeTuple<[-1, 5, 10, 15, 20, 25, 28]>
type ConsistentData<T extends Record<string, any>[]> =
    T extends [infer First extends Record<string, any>, ...infer Rest extends Record<string, any>[]]
    ? Rest extends { [K in keyof First]: any }[] // 确保其他项的字段不能少
    ? First extends { [K in keyof Rest[number]]: any } // 确保字段不能多
    ? T // ✅ 确保返回 T
    : never
    : never
    : T;
