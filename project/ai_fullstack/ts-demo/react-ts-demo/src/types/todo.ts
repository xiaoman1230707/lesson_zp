//数据状态是应用的核心，ts保护他不被随意修改
export interface Todo{
    id:number;
    title:string;
    completed:boolean;
}