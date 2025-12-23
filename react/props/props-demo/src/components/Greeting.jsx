import PropTypes from 'prop-types';//prop 类型约定 校验


//给谁打招呼？
 function Greeting(props){
    const {name,message,showIcon} = props
    // console.log(name,message,props)
    return(
        <div>
            {showIcon && <span>👋</span>}
            <h1>Hello {name}</h1>
            <p>{message}</p>
        </div>
    )
}
    Greeting.propTypes = {
        name: PropTypes.string.isRequired,
        message: PropTypes.string,
        showIcon: PropTypes.bool 
    }
    Greeting.defaultProps = {
        message: '欢迎加入mihoyo!!'
    }
export default Greeting


