import 'dotenv/config';
import {
    MilvusClient,
    DataType,
    MetricType,
    IndexType,
} from '@zilliz/milvus2-sdk-node'
import {
    OpenAIEmbeddings
} from '@langchain/openai'


const ADDRESS = process.env.MILVUS_ADDRESS;
const TOKEN = process.env.MILVUS_TOKEN;
const COLLECTION_NAME = 'TianLong';
const VECTION_DIM = 1024;

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration:{
        baseURL: process.env.OPENAI_API_BASE_URL,
    },
    dimensions: VECTION_DIM,
})

const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
})

async function getEmbedding(text) {
    const result = await embeddings.embedQuery(text);
    return result;
}

async function main(){
    try {
        console.log('Connection to Milvus....');
        await client.connectPromise;
        try {
            await client.loadCollection({
                collection_name: COLLECTION_NAME,
            })
        } catch (error) {
            console.log('Collection already loaded');
            
        }
        const query = '段誉会什么武功？';
        const queryVector = await getEmbedding(query);
        const searchResult =await client.search({
            collection_name: COLLECTION_NAME,
            vector: queryVector,
            limit:3,
            metric_type: MetricType.COSINE,
            output_fields: ['id', 'content','book_id', 'chapter_num','index'],
        })
        searchResult.results.forEach((item,index)=>{
            console.log(`第${index+1}个结果：Score:${item.score.toFixed(2)}`);
            console.log(`ID:${item.id}`);
            console.log(`Book ID:${item.book_id}`);
            console.log(`Chapter Num:${item.chapter_num}`);
            console.log(`Index:${item.index}`);
            console.log(`Content:${item.content}`);
            
            
        })
    } catch (error) {
        console.error('Connection to Milvus failed:', error.message);
    }
}
main();