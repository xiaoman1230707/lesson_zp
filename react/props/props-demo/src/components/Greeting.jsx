import PropTypes from 'prop-types';//prop 类型约定 校验

//给谁打招呼？
 function Greeting(props){
    const {name,message} = props
    // console.log(name,message,props)
    return(
        <div>
            <h1>Hello {name}</h1>
            <p>{message}</p>
        </div>
    )
}
    Greeting.propTypes = {
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }
export default Greeting


