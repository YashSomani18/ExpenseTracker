import React  , {useState ,useEffect}from "react";
import { Button, Form, Input, message } from "antd";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";


const Login = () => {
    const navigate = useNavigate();
    const[loading , setLoading] = useState(false);



    const submitHandler = async(values) => {
    try {
        setLoading(true);
        const {data} = await axios.post('/api/v1/users/login',values);
        console.log(data);
        setLoading(false); 
        message.success("Login Succesfully!");
        navigate('/');
        localStorage.setItem('user',JSON.stringify({...data.user,password:''}));
    } catch (error) {
        setLoading(false);
        message.error("Invalid email or password");
    }
  };



  useEffect(()=>{
    if(localStorage.getItem('user')){
        navigate('/');
    }
  },[navigate]);


  return (
    <>
      <div className="register-page">
        {loading && <Spinner/>}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Page</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register"> Not a User? Click here to Register!</Link>
            <Button htmlType="submit" type="primary">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;

