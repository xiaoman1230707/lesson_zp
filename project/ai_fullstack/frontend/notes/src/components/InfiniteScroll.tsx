interface InfiniteScrollProps{
    hasMore:boolean;// 是否所有数据都加载了 分页到最后一页变为false
    isLoading?:boolean;// 滚动到底部开始加载更多，避免重复触发
    onLoadMore:()=>void;// 加载更多数据的回调函数 /api/posts?page=2&limit=10
    children?:React.ReactNode; // InfiniteScroll 通用的滚动功能，滚动的内容可接受定制的传递的
}

const InfiniteScroll:React.FC<InfiniteScrollProps> = ({
    hasMore,
    isLoading,
    onLoadMore = false,
    children,
})=> {
  return (
    <div>
      {children}
    </div>
  )
}

export default InfiniteScroll;