import Header from '@/components/Header';
import { Card, CardHeader, CardTitle,CardContent } from '@/components/ui/card';
import SlideShow,{type SlideData} from '@/components/SildeShow';
import { useHomeStore } from '@/store/home';
import {
  useEffect
} from 'react';

export default function Home() {
  const {banners,posts,loadMore} = useHomeStore();

  useEffect(()=>{
    loadMore();
    },[]);
  return (
    <>
     <Header title='首页' showBackBtn={true} /> 

     <div className='p-4 space-y-4'>
      <SlideShow slides={banners} />
      <Card>
        <CardHeader>
          <CardTitle>
            欢迎来到React Mobile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>这是内容区域</p>
        </CardContent>
      </Card>
        <div className="grid grid-cols-2 gap-4">
          {
            [1,2,3,4,5,6,7,8,9,10,11,12].map((i,index)=>(
              <div key={index} 
              className='h-32 bg-white rounded-lg shadow-sm 
              flex items-center justify-center border'>
               Item{i}
              </div>
            ))
          }
        </div>
     </div>
    </>
  )
}