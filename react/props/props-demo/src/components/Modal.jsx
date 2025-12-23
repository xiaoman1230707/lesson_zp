export default function Modal(props){
    // console.log(props)
    const{ HeaderComponent,
        FooterComponent,
        children} = props
    return(
        <div>
            <div style={style.overlay}> 
                <div style={style.modal}>
            <HeaderComponent/>
            <div style={style.content}>
            {
            //组件的中间部分 提升组件的定制的
            //如果要提供定制能力
            children
            }
            </div>
            <FooterComponent/>
            </div>
        </div>
        </div>
    )
}

const style ={
    overlay:{
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    modal:{
        backgroundColor:'white',
        padding:'1rem',
        borderRadius:'8px',
        width:'400px'
    },
    content:{
        padding:'1rem'
    }
}