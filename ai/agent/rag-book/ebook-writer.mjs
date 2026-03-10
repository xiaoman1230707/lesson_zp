import 'dotenv/config';
import { parse } from 'path';
import {
    MilvusClient,
    DataType,
    IndexType,
    MetricType,
} from "@zilliz/milvus2-sdk-node";
import {
    OpenAIEmbeddings
} from "@langchain/openai";
import {
    EPubLoader
} from '@langchain/community/document_loaders/fs/epub'
import {
    RecursiveCharacterTextSplitter
} from "@langchain/textsplitters";

const COLLECTION_NAME = 'TianLong';
const VECTOR_DIM = 1024;
const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 100;
const EPUB_FILE = './天龙八部.epub';
const ADDRESS = process.env.MILVUS_ADDRESS;
const TOKEN = process.env.MILVUS_TOKEN;
const BOOK_NAME = parse(EPUB_FILE).name;
console.log(BOOK_NAME);

const embedding = new OpenAIEmbeddings({
    modelName: process.env.EMBEDDING_MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL,
    },
    dimension: VECTOR_DIM,
});

const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN
});

async function getEmbedding(text){
    const result = await embedding.embedQuery(text);
    return result;
}

async function ensureBookCollection(bookId){
    try{
        const hasCollection = await client.hasCollection({
            collection_name: COLLECTION_NAME
        });
        if(!hasCollection.value){
            console.log(` 集合${COLLECTION_NAME}不存在`);
            await client.createCollection({
                collection_name: COLLECTION_NAME,
                fields: [
                    {
                        name: "id",
                        data_type: DataType.VarChar,
                        max_length: 100,
                        is_primary_key: true,
                    },
                    {
                        name: "book_id",
                        data_type: DataType.VarChar,
                        max_length: 100,
                    },
                    {
                        name: "book_name",
                        data_type: DataType.VarChar,
                        max_length: 100,
                    },
                    {
                        name: "chapter_num",
                        data_type: DataType.Int32,
                    },
                    {
                        name: "index",
                        data_type: DataType.Int32,
                    },
                    {
                        name: "content",
                        data_type: DataType.VarChar,
                        max_length: 10000,
                    },
                    {
                        name: "vector",
                        data_type: DataType.FloatVector,
                        dim: VECTOR_DIM,
                    }
                ],
            });
            console.log(`集合${COLLECTION_NAME}创建成功`);
            await client.createIndex({
                collection_name: COLLECTION_NAME,
                field_name: "vector",
                index_type: IndexType.IVF_FLAT,
                metric_type: MetricType.COSINE,
                params: {
                    nlist: 1024,
                },
            });
            console.log(`索引创建成功`);
        }

        try{
            await client.loadCollection({
                collection_name: COLLECTION_NAME,
            })
            console.log(`集合加载成功`);
        }catch(err){
            console.log(`集合已处于加载中`);
        }

    }catch(err){
        console.error(`集合${COLLECTION_NAME}创建失败`, err.message);
        throw err;
    }
}

async function loadAndProcessEPubStreaming(bookId){
    try{
        console.log(`开始处理电子书${EPUB_FILE}文件`);
        const loader = new EPubLoader(
            EPUB_FILE,
            {
                splitChapters: true,
                //是否将EPUB文件按“章节”拆分成多个独立的文档片段。
            }
        );
        const documents = await loader.load();
        // console.log(documents);
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: CHUNK_SIZE,
            chunkOverlap: CHUNK_OVERLAP,
            // 默认 \n\n 段落换行 \n 换行 。 ，
        });
        let totalInserted = 0;
        for(let chapterIndex = 0; chapterIndex < documents.length; chapterIndex++){
            const chapter = documents[chapterIndex];
            const chapterContent = chapter.pageContent;
            console.log(`处理章节${chapterIndex}`);
            const chunks = await textSplitter.splitText(chapterContent);
            console.log(`章节${chapterIndex}拆分成${chunks.length}个片段`);
            if(chunks.length === 0){
                console.log(`跳过空章节\n`);
                continue;
            }
            console.log(`生成向量并插入中...`);
            // const insertedCount = await insertChunksBatch(chunks, bookId, chapterIndex + 1);
            console.log(`章节序号${chapterIndex}插入${chunks}`);
        }
    }catch(err){
        console.error(`电子书处理失败`, err.message);
        throw err;
    }
}

async function insertChunksBatch(chunks, bookId, chapterNum){
    try{
        if(chunks.length === 0){
            return 0;
        }
        // 性能优化  embedding 并发
        // 返回的是 schema 的数据
        const insertData = await Promise.all(
            chunks.map(async (chunk,index)=>{
                const vector = await getEmbedding(chunk);
                return {
                    id: `${bookId}-${chapterNum}-${index}`,
                    book_id: bookId,
                    book_name: BOOK_NAME,
                    chapter_num: chapterNum,
                    index: index,
                    content: chunk,
                    vector,
                }
            })
        );
        const insertResult = await client.insert({
            collection_name: COLLECTION_NAME,
            data: insertData,
        });
        return Number(insertResult.insert_cnt || 0);
    }catch(err){
        console.error(`插入向量失败`, err.message);
        throw err;
    }
}

async function main(){
    try{
        console.log(`电子书处理`);
        console.log(`连接Milvus`);
        await client.connectPromise;
        console.log(`连接成功`);

        const bookId = 1;
        await ensureBookCollection(bookId);
        await loadAndProcessEPubStreaming(bookId);
    }catch(err){
        console.error(err);
    }
}

main();