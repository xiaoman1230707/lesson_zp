import{
    useParams 
}  from 'react-router-dom';

export default function ProductDetail() {
    const {productId} = useParams();
  return (
   <>
        <h2>产品详情</h2>
        <p>产品ID：{productId}</p>
   </>
  );
}