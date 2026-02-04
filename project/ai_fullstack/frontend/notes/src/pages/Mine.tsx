// import { useMineStore } from '@/store/mine'
import { useUserStore } from '@/store/useUserStore'
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Mine() {
  const {
    user
  } = useUserStore();
  
  return (
    <div className="min-h-screen bg-gray-500">
      <div className="bg-white p-6 pb-10 mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex 
          items-center justify-center text-primary text-xl font-bold">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
              {user?.name?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-500">ID: {user?.id}</p>
          </div>
        </div>
      </div>
      <div className="mt-4.space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>我的订单</span>
            <span className="text-gray-400 text-sm">&gt;</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>AI git 工具</span>
            <span className="text-gray-400 text-sm">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  )
}