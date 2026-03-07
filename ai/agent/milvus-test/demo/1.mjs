import { 
    MilvusClient,
    IndexType, 
    MetricType,
    DataType,
} from "@zilliz/milvus2-sdk-node";
import 'dotenv/config'
import {
    OpenAIEmbeddings
} from "@langchain/openai";

const VECTOR_DIMENSION = 1024;
const COLLECTION_NAME = 'ai_diary';

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL,
    },
    dimensions: VECTOR_DIMENSION,
})

const client = new MilvusClient({
    address: process.env.MILVUS_ADDRESS,
    token: process.env.MILVUS_TOKEN,
  });
// 向量嵌入模型 将文本转换为向量的函数封装
async function getEmbeddings(text) {
    const res = await embeddings.embedQuery(text)
    return res
}

async function main() {
    console.log('正在连接Milvus...');
    const checkHealth = await client.checkHealth();
    if (!checkHealth.isHealthy) {
        console.error('Milvus连接失败:', checkHealth.reasons);
        return;
    }
    console.log('连接成功， 集群状态正常...');

    // await client.createCollection({
    //     collection_name: COLLECTION_NAME,
    //     fields: [
    //         { name: 'id', data_type: DataType.VarChar, max_length: 50, is_primary_key: true },
    //         { name: 'vector', data_type: DataType.FloatVector, dim: VECTOR_DIMENSION },
    //         { name: 'content', data_type: DataType.VarChar, max_length: 5000 },
    //         { name: 'date', data_type: DataType.VarChar, max_length: 50 },
    //         { name: 'mood', data_type: DataType.VarChar, max_length: 50 },
    //         { name: 'tags',  data_type: DataType.Array, element_type: DataType.VarChar,
    //              max_capacity: 10, max_length: 50}
    //     ]
    // })

    // await client.createIndex({
    //     collection_name: COLLECTION_NAME,
    //     field_name: 'vector', // 常用的查询字段
    //     index_type: IndexType.IVF_FLAT, 
    //     metric_type: MetricType.COSINE,
    //     params: {
    //         nlist: VECTOR_DIMENSION,
    //     }
    // })
    await client.loadCollection({
        collection_name: COLLECTION_NAME,
    })
    // console.log('\nInserting diary entries...');
    // const diaryContents = [
    //           {
    //             id: 'diary_001',
    //             content: '今天天气很好，去公园散步了，心情愉快。看到了很多花开了，春天真美好。',
    //             date: '2026-01-10',
    //             mood: 'happy',
    //             tags: ['生活', '散步']
    //           },
    //           {
    //             id: 'diary_002',
    //             content: '今天工作很忙，完成了一个重要的项目里程碑。团队合作很愉快，感觉很有成就感。',
    //             date: '2026-01-11',
    //             mood: 'excited',
    //             tags: ['工作', '成就']
    //           },
    //           {
    //             id: 'diary_003',
    //             content: '周末和朋友去爬山，天气很好，心情也很放松。享受大自然的感觉真好。',
    //             date: '2026-01-12',
    //             mood: 'relaxed',
    //             tags: ['户外', '朋友']
    //           },
    //           {
    //             id: 'diary_004',
    //             content: '今天学习了 Milvus 向量数据库，感觉很有意思。向量搜索技术真的很强大。',
    //             date: '2026-01-12',
    //             mood: 'curious',
    //             tags: ['学习', '技术']
    //           },
    //           {
    //             id: 'diary_005',
    //             content: '晚上做了一顿丰盛的晚餐，尝试了新菜谱。家人都说很好吃，很有成就感。',
    //             date: '2026-01-13',
    //             mood: 'proud',
    //             tags: ['美食', '家庭']
    //           }
    //         ];
    // console.log('Generating embeddings...');

    // const diaryData = await Promise.all(
    //     diaryContents.map(async (diary)=>({
    //         ...diary,
    //         vector: await getEmbeddings(diary.content),
    //     }))
    // );
    // const insertRes = await client.insert({
    //     collection_name: COLLECTION_NAME,
    //     data: diaryData,
    // })
    // console.log(`数据插入成功${insertRes.insert_cnt}`)
    const query = '我想看看关于户外活动的日记';
    const queryVector = await getEmbeddings(query);
    const searchResult = await client.search({
        collection_name: COLLECTION_NAME,
        vector: queryVector,
        limit: 3,
        metric_type: MetricType.COSINE,
        output_fields: ['id', 'content', 'date', 'mood', 'tags'],
    })
    searchResult.results.forEach(result => {
        console.log(`\n 日记ID: ${result.id}`);
        console.log(`内容: ${result.content}`);
        console.log(`日期: ${result.date}`);
        console.log(`心情: ${result.mood}`);
        console.log(`标签: ${result.tags}`);
    })
    console.log('\n 搜索结果:');
    console.log(`共找到 ${searchResult.results.length} 条相关日记`);
}
// async function main() {
//   const client = new MilvusClient({
//     address: process.env.MILVUS_ADDRESS,
//     token: process.env.MILVUS_TOKEN,
//   });
//   console.log('正在连接Milvus')
//   const checkHealth = await client.checkHealth();
//   if(!checkHealth.isHealthy) {
//     console.log('Milvus 连接失败',checkHealth.message)
//     return
//   }
//   console.log('Milvus 连接成功,集群状态正常...')
// // table collection 数据的集合
//   const COLLECTION_NAME = 'test_collection'
//   const DIMENSION = 4; // 维度

// //   try{
// //     await client.createCollection({
// //       collection_name: COLLECTION_NAME,
// //       dimension: DIMENSION,
// //       auto_id: true,
// //     })
// //     console.log(`集合${COLLECTION_NAME}创建成功`)
// //     await client.createIndex({
// //       collection_name: COLLECTION_NAME,
// //       field_name: 'vector',
// //       index_type: IndexType.AUTOINDEX,
// //       metric_type: MetricType.COSINE,
// //     })
// //     console.log(`索引${COLLECTION_NAME}创建成功`)
// //   }catch(err){
// //     console.log('集合或索引创建失败',err)
// //   }

// //   const data = [
// //     {
// //         vector: [0.1, 0.2, 0.3, 0.4],
// //         content: '这是第一条测试数据'
// //     },
// //     {
// //         vector: [0.5, 0.6, 0.7, 0.8],
// //         content: '这是第二条测试数据'
// //     },
// //   ];
// //   const inserRes = await client.insert({
// //     collection_name: COLLECTION_NAME,
// //     data,
// //   })
// //   console.log('数据插入成功',inserRes.IDs.length)

//   const srarchRes = await client.search({
//     collection_name: COLLECTION_NAME,
//     data: [
//       [0.1, 0.2, 0.3, 0.4],
//     ],
//     limit: 1,
//     output_fields: ['content'],
//   })
//     const srarchRes2 = await client.search({
//     collection_name: COLLECTION_NAME,
//     data: [
//       [0.5, 0.3, 0.3, 0.4],
//     ],
//     limit: 1,
//     output_fields: ['content'],
//   })


//   console.log(`搜索结果${JSON.stringify(srarchRes2)}`)
// }

main();