import Mock from 'mockjs'
const tags = ["前端", "后端", "AI", "职场", "副业", "面经", "算法"]
const posts = Mock.mock({
    'list|45': [// list 45条 
        {
            title: '@ctitle(8,20)',
            brief: '@ctitle(20,100)',
            totalCommtents: '@integer(1,30)',
            totalLikes: '@integer(0,300)',
            publishedAt: '@datetime("yyyy-MM-dd HH:mm")',
            user: {
                id: '@integer(1,1000)',
                name: '@cname()',
                avatar: '@image(300x200)'
            },
            tags: () => Mock.Random.pick(tags, 2),
            thumbnail: '@image(300x200)',
            pics: [
                '@image(300x200)',
                '@image(300x200)',
                '@image(300x200)',
            ],
            id: '@increment(1)'
        }
    ]
}).list // 只要数据数组，就能做分页功能了
export default [
    {
        url: '/api/posts',
        method: 'get',
        response: ({ query }) => {
            // console.log(query,'????')
            const { page = '1', limit = '10' } = query
            const currentPage = parseInt(page, 10);
            const size = parseInt(limit, 10);

            if (isNaN(currentPage) || isNaN(size) || currentPage <= 0 || size <= 0) {
                return {
                    code: 400,
                    msg: 'Invalid page or pageSize',
                    data: null
                }
            }

            const total = posts.length;// count 
            const start = (currentPage - 1) * size;// 开始
            const end = start + size;// 结束
            const paginatedData = posts.slice(start, end);// 分页数据

            return {
                code: 200,
                msg: 'success',
                items: paginatedData,
                pagination: {
                    total,
                    current: currentPage,
                    limit: size,
                    totalPages: Math.ceil(total / size)
                }
            }
        }
    }
]