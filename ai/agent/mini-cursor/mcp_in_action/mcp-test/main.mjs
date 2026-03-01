import { 
    HumanMessage,
    ToolMessage,
    SystemMessage
 } from '@langchain/core/messages';

async function funAgentWithTools(query, maxIterations = 30) {
    const messages = [
        new HumanMessage(query)
    ];
    for (let i = 0; i < maxIterations; i++) {
        console.log(chalk.bgGreen('⏳正在等待AI思考...'));
        const response = await modelWithTools.invoke(messages);
        messages.push(response);

        if (!response.tool_calls || response.tool_calls.length === 0) {
            console.log(`\n AI 最终回复：\n ${response.content}\n`);
            return response.content;
        }

        console.log(chalk.bgBlue(`🔍 检测到 ${response.tool_calls.length} 个工具调用`));
        console.log(chalk.bgBlue(`🔍 工具调用: ${response.tool_calls.map(t => t.name).join(', ')}`));

        for (const toolCall of response.tool_calls) {
            const foundTool = tools.find(t => t.name === toolCall.name);
            if (foundTool) {
                const toolResult = await foundTool.invoke(toolCall.args);
                let contentStr;
                if (typeof toolResult === 'string') {
                    contentStr = toolResult;
                } else {
                    contentStr = JSON.stringify(toolResult);
                }
                messages.push(new ToolMessage({
                    content: contentStr,
                    tool_call_id: toolCall.id
                }));
            }
        }
    }
    return messages[messages.length - 1].content;
}

await runAgentWithTools("距离上海米哈游公司最近的地铁");
// await runAgentWithTools(`北京南站附近的2个酒店，以及去哪里的路线，
//     路线规划生成文档保存到 c:\\Users\\liuxiaoman\\Desktop 的一个md文档中
//     `);
// await runAgentWithTools(`北京南站附近的2个酒店，
//     附近的3个酒店拿到酒店图片展开浏览器展示每个酒店的图片，
//     每个tab一个url展示，并且把那个页面标题改为酒店名`);