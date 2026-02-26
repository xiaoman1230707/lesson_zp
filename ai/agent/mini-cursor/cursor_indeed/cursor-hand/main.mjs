import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import {
    HumanMessage,
    SystemMessage,
    ToolMessage
} from '@langchain/core/messages';
import {
    readFileTool,
    writeFileTool,
    executeCommanTool,
    listDirectoryTool
} from './all_tools.mjs'
import  chalk  from 'chalk';// 彩色输出

const model = new ChatOpenAI({
    modelName: process.env.OPENAI_MODEL_NAME,// 比qwen coder turbo更强大
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE,
    },
    temperature: 0,
});

const tools = [
    readFileTool,
    writeFileTool,
    executeCommanTool,
    listDirectoryTool
];
// modelWithTools 绑定工具
const modelWithTools = model.bindTools(tools);
// web 4.0 AI earn Money
async function runAgentWithTools(query,maxIterations = 30){
    // 检测任务完成情况
    // 不用tool
    // 在用tool llm还在自动进行中
    const messages = [
            new SystemMessage(`
            你是一个项目管理助手，使用工具完成任务。
            当前工具目录：${process.cwd()}

            工具：
            1. read_file 读取文件内容
            2. write_file 写入文件内容
            3. execute_command 执行命令(支持working directory 参数)
            4. list_directory 列出目录内容

            重要规则 - execute_command:
            - workingDirectory 参数会自动切换到指定目录
            - 当使用workingDirectory 参数时，不要在command中使用cd 命令 
            - 错误示例: { command: "cd react-todo-app && pnpm install", workingDirectory: "react-todo-app" }
                这是错误的！因为 workingDirectory 已经在 react-todo-app 目录了，再 cd react-todo-app 会找不到目录
            - 正确示例: { command: "pnpm install", workingDirectory: "react-todo-app" }
                这样就对了！workingDirectory 已经切换到 react-todo-app，直接执行命令即可

            回复要简洁，只说做了什么
            `),
            new HumanMessage(query)
        ];
        // 循环 agent核心 llm思考 规划 不断迭代 直到任务完成 更加智能化
        for(let i = 0; i < maxIterations; i++){
            console.log(chalk.bgGreen('⏳正在等待AI思考...'));
            const response = await modelWithTools.invoke(messages);
            // console.log(response);
            messages.push(response);
            if(!response.tool_calls || response.tool_calls.length === 0){
                console.log(`\n AI 最终回答：\n ${response.content}\n`);
                return response.content;
            };
        for(const toolCall of response.tool_calls){
            const tool = tools.find(t => t.name === toolCall.name);
            if(tool){
                const toolResult = await tool.invoke(toolCall.args);
                messages.push(new ToolMessage({
                    content: toolResult,
                    tool_call_id: toolCall.id,
                }));
            }
        }
    }

    return messages[messages.length - 1].content;
};

const casel = `
创建一个功能丰富的 React TodoList 应用：

1. 创建项目：echo -e "n\nn" | pnpm create vite react-todo-app --template react-ts
2. 修改 src/App.tsx，实现完整功能的 TodoList：
 - 添加、删除、编辑、标记完成
 - 分类筛选（全部/进行中/已完成）
 - 统计信息显示
 - localStorage 数据持久化
3. 添加复杂样式：
 - 渐变背景（蓝到紫）
 - 卡片阴影、圆角
 - 悬停效果
4. 添加动画：
 - 添加/删除时的过渡动画
 - 使用 CSS transitions
5. 列出目录确认

注意：使用 pnpm，功能要完整，样式要美观，要有动画效果

之后在 react-todo-app 项目中：
1. 使用 pnpm install 安装依赖
2. 使用 pnpm run dev 启动服务器
`;
try{
    await runAgentWithTools(casel);
}catch(err){
    console.log(chalk.bgRed(err.message));
}
